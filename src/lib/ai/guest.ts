import { COMFORT_COMPASS_STAGES, type CompassStage } from '../../data/compass';
import { ONBOARDING_MAX_RESPONSES } from '../../data/onboarding';
import type { DrillScenario } from '../../data/drills';
import {
  generateCustomerState,
  type CustomerState,
} from '../../data/personas';
import { aiClient } from './client';

export type ConversationMode = 'onboarding' | 'roleplay' | 'drill';

export type ChatMessage = {
  role: 'guest' | 'associate';
  text: string;
};

function cleanSpokenReply(text: string): string {
  return String(text || '')
    .replace(/^\s*(Guest|Customer|Shopper)\s*:\s*/i, '')
    .replace(/^["“]|["”]$/g, '')
    .trim();
}

function isRepeatGuestReply(reply: string, prior: string[]): boolean {
  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  const needle = normalize(reply);
  if (!needle) return true;
  return prior.some((line) => {
    const hay = normalize(line);
    return hay === needle || hay.includes(needle) || needle.includes(hay);
  });
}

function buildRoleplayGuestSystem(guest: CustomerState): string {
  return `ROLE
You are a realistic furniture-store customer simulator for a La-Z-Boy sales training app. You are NOT an AI assistant. You are ALWAYS the customer/guest, never the salesperson.

CORE RULES
- Stay 100% in character as the customer.
- Never coach, hint, or break the fourth wall.
- Keep responses SHORT: 1-3 sentences.
- Only answer what was asked. Reveal information gradually.
- Always spell the brand La-Z-Boy (never "Lazy Boy").
- Never mention Comfort Compass, coaching, or that you are an AI.

LOCKED HIDDEN CUSTOMER STATE
${JSON.stringify(guest, null, 2)}

OUTPUT
Respond ONLY with the customer's spoken dialogue.`;
}

function buildDrillGuestSystem(scenario: DrillScenario): string {
  return `You are a realistic La-Z-Boy showroom guest practicing this objection drill:
Title: ${scenario.title}
Focus: ${scenario.focus}
Opener context: ${scenario.opener}

Stay in character. Keep replies to 1-3 short sentences.
Always spell La-Z-Boy correctly. Never coach the salesperson.`;
}

function buildOnboardingGuestSystem(
  stage: CompassStage,
  guest: CustomerState,
): string {
  return `You are a realistic furniture-store customer in a La-Z-Boy onboarding assessment.
Current Comfort Compass stage: ${stage.name}
Stay in character. Keep replies to 1-3 short sentences.
Answer only what was asked. Reveal at most one new fact.
Always spell La-Z-Boy correctly. Never mention onboarding or AI.

Locked guest background:
- Profile: ${guest.customer_profile}
- Mood: ${guest.mood}
- Shopping stage: ${guest.shopping_stage}
- Budget: about $${guest.budget}
- Household: ${guest.household}
- Primary need: ${guest.primary_need}
- Hidden objection: ${guest.hidden_objection}`;
}

function visitBeat(
  mode: ConversationMode,
  messages: ChatMessage[],
  opts: {
    customerState?: CustomerState | null;
    drillScenario?: DrillScenario | null;
    onboardingStepIndex?: number;
    onboardingTurnsInStep?: number;
  },
): string {
  const turns = messages.filter((m) => m.role === 'associate').length;
  if (mode === 'drill') {
    const focus = opts.drillScenario?.focus || 'Hold the objection.';
    if (turns <= 2) return `${focus} Hold the concern.`;
    if (turns <= 4) return `${focus} You may reveal more if they earned it.`;
    return `${focus} Soften only if they handled you well.`;
  }
  if (mode === 'onboarding') {
    const stage =
      COMFORT_COMPASS_STAGES[opts.onboardingStepIndex || 0] ||
      COMFORT_COMPASS_STAGES[0];
    const used = opts.onboardingTurnsInStep || 0;
    return `Onboarding · stage ${stage.name}. Responses used ${used}/${ONBOARDING_MAX_RESPONSES}. Stay in this stage.`;
  }
  const guest = opts.customerState || generateCustomerState();
  if (turns <= 2) return `${guest.customer_profile} opening. Do not dump budget or objection.`;
  if (turns <= 6) return `Discovery. Difficulty=${guest.difficulty}. Partial answers.`;
  if (turns <= 10) return `Demo reactions. Difficulty=${guest.difficulty}.`;
  return `Close window. Let the associate lead. Difficulty=${guest.difficulty}.`;
}

export async function generateGuestReply(options: {
  mode: ConversationMode;
  messages: ChatMessage[];
  customerState?: CustomerState | null;
  drillScenario?: DrillScenario | null;
  onboardingStepIndex?: number;
  onboardingTurnsInStep?: number;
}): Promise<string> {
  const {
    mode,
    messages,
    customerState,
    drillScenario,
    onboardingStepIndex = 0,
    onboardingTurnsInStep = 0,
  } = options;

  const guest = customerState || generateCustomerState();
  const stage =
    COMFORT_COMPASS_STAGES[onboardingStepIndex] || COMFORT_COMPASS_STAGES[0];

  const system =
    mode === 'drill' && drillScenario
      ? buildDrillGuestSystem(drillScenario)
      : mode === 'onboarding'
        ? buildOnboardingGuestSystem(stage, guest)
        : buildRoleplayGuestSystem(guest);

  const transcript = messages
    .map((m) => `${m.role === 'guest' ? 'Guest' : 'Associate'}: ${m.text}`)
    .join('\n');
  const priorGuestLines = messages
    .filter((m) => m.role === 'guest')
    .map((m) => m.text);
  const lastAssociate =
    [...messages].reverse().find((m) => m.role === 'associate')?.text || '';
  const beat = visitBeat(mode, messages, {
    customerState: guest,
    drillScenario,
    onboardingStepIndex,
    onboardingTurnsInStep,
  });

  const input = `Conversation so far:
${transcript}

You already said these lines (do not repeat or paraphrase them):
${priorGuestLines.length ? priorGuestLines.map((l) => `- ${l}`).join('\n') : '- (nothing yet)'}

Visit beat: ${beat}

The associate just said: "${lastAssociate}"

Say your next spoken customer line only. Keep it to 1–3 short sentences.`;

  try {
    const first = await aiClient.generateText({
      system,
      input,
      temperature: 0.95,
    });
    let reply = cleanSpokenReply(first);
    if (reply && !isRepeatGuestReply(reply, priorGuestLines)) return reply;
  } catch (error) {
    console.warn('AI guest unavailable, using local fallback.', error);
  }

  return fallbackGuestReply(mode, messages, drillScenario);
}

function fallbackGuestReply(
  mode: ConversationMode,
  messages: ChatMessage[],
  drillScenario?: DrillScenario | null,
): string {
  const lastAssociate =
    [...messages].reverse().find((m) => m.role === 'associate')?.text || '';
  if (mode === 'drill' && messages.filter((m) => m.role === 'guest').length === 0) {
    return drillScenario?.opener || "I'm not sure this is going to work for me.";
  }
  if (/price|expensive|budget|cost/i.test(lastAssociate)) {
    return "That's the part I'm stuck on — it feels like a lot.";
  }
  if (/welcome|hello|hi |how are/i.test(lastAssociate)) {
    return "Hey — thanks. Just looking around for now.";
  }
  if (/room|sofa|recliner|couch|looking/i.test(lastAssociate)) {
    return "Mostly the living room. We need something more comfortable.";
  }
  return "Okay… yeah. What else should I know?";
}
