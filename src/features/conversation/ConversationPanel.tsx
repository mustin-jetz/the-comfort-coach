import { useEffect, useMemo, useState } from 'react';
import { COMFORT_COMPASS_STAGES } from '../../data/compass';
import { ONBOARDING_MAX_RESPONSES, ONBOARDING_STEP_BLURBS } from '../../data/onboarding';
import type { DrillScenario } from '../../data/drills';
import {
  generateCustomerState,
  type CustomerState,
} from '../../data/personas';
import {
  generateGuestReply,
  type ChatMessage,
  type ConversationMode,
} from '../../lib/ai/guest';
import { aiProviderLabel } from '../../lib/ai/client';

type ConversationPanelProps = {
  open: boolean;
  mode: ConversationMode;
  drillScenario?: DrillScenario | null;
  onClose: () => void;
  onBackToOverview?: () => void;
  onChooseAnotherDrill?: () => void;
};

export function ConversationPanel({
  open,
  mode,
  drillScenario = null,
  onClose,
  onBackToOverview,
  onChooseAnotherDrill,
}: ConversationPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [customerState, setCustomerState] = useState<CustomerState | null>(null);
  const [onboardingStepIndex, setOnboardingStepIndex] = useState(0);
  const [onboardingTurnsInStep, setOnboardingTurnsInStep] = useState(0);

  useEffect(() => {
    if (!open) return;
    const guest =
      mode === 'roleplay' || mode === 'onboarding' ? generateCustomerState() : null;
    setCustomerState(guest);
    setOnboardingStepIndex(0);
    setOnboardingTurnsInStep(0);
    setInput('');
    setBusy(false);

    if (mode === 'drill' && drillScenario?.opener) {
      setMessages([{ role: 'guest', text: drillScenario.opener }]);
    } else {
      setMessages([]);
    }
  }, [open, mode, drillScenario]);

  const stage = COMFORT_COMPASS_STAGES[onboardingStepIndex] || COMFORT_COMPASS_STAGES[0];
  const stepDone =
    mode === 'onboarding' && onboardingTurnsInStep >= ONBOARDING_MAX_RESPONSES;
  const isLastStep =
    onboardingStepIndex >= COMFORT_COMPASS_STAGES.length - 1;

  const header = useMemo(() => {
    if (mode === 'drill') {
      return {
        eyebrow: 'Drills',
        title: drillScenario?.title || 'Handle the objection',
        persona: `${drillScenario?.category || 'Objection'} — ${drillScenario?.description || ''}`,
      };
    }
    if (mode === 'onboarding') {
      return {
        eyebrow: 'Onboarding',
        title: `${stage.name} · Step ${onboardingStepIndex + 1} of 6`,
        persona: `Focus on ${stage.name}: ${ONBOARDING_STEP_BLURBS[stage.id] || ''}`,
      };
    }
    return {
      eyebrow: 'Role-Play',
      title: 'Practice a full guest visit',
      persona:
        'A guest just walked in. Uncover their needs through natural conversation — they won’t dump everything at once.',
    };
  }, [mode, drillScenario, stage, onboardingStepIndex]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || busy || stepDone) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: 'associate', text },
    ];
    setMessages(nextMessages);
    setInput('');
    setBusy(true);

    const nextTurns =
      mode === 'onboarding' ? onboardingTurnsInStep + 1 : onboardingTurnsInStep;
    if (mode === 'onboarding') setOnboardingTurnsInStep(nextTurns);

    try {
      const reply = await generateGuestReply({
        mode,
        messages: nextMessages,
        customerState,
        drillScenario,
        onboardingStepIndex,
        onboardingTurnsInStep: nextTurns,
      });
      setMessages((current) => [...current, { role: 'guest', text: reply }]);
    } finally {
      setBusy(false);
    }
  }

  function advanceOnboardingStep() {
    if (!stepDone) return;
    if (isLastStep) {
      onClose();
      return;
    }
    const nextIndex = onboardingStepIndex + 1;
    const nextStage = COMFORT_COMPASS_STAGES[nextIndex];
    setOnboardingStepIndex(nextIndex);
    setOnboardingTurnsInStep(0);
    setMessages((current) => [
      ...current,
      {
        role: 'guest',
        text: onboardingStageBridge(nextStage.id),
      },
    ]);
  }

  if (!open) return null;

  const pathClass =
    mode === 'onboarding'
      ? 'path-modal-onboarding'
      : mode === 'drill'
        ? 'path-modal-drills'
        : 'path-modal-roleplay';

  return (
    <div
      className={`modal-backdrop path-modal ${pathClass} is-open is-visible`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="convo-title"
    >
      <div className="modal-card convo-card path-panel" data-path={mode}>
        <div className="modal-header">
          <div className="convo-header-copy">
            <p className="convo-eyebrow">{header.eyebrow}</p>
            <h3 id="convo-title">{header.title}</h3>
            <p className="convo-persona">{header.persona}</p>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            style={{ padding: '8px 14px', fontSize: '0.9rem' }}
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="modal-body convo-body">
          <p className="ai-provider-chip" aria-live="polite">
            Guest AI: {aiProviderLabel}
          </p>

          {mode === 'onboarding' && (
            <p className="convo-turn-meter">
              {stepDone
                ? `Step ${onboardingStepIndex + 1} of 6 · ${stage.name} — 4 of 4 responses used`
                : `Step ${onboardingStepIndex + 1} of 6 · ${stage.name} — ${Math.max(0, ONBOARDING_MAX_RESPONSES - onboardingTurnsInStep)} of ${ONBOARDING_MAX_RESPONSES} responses left`}
            </p>
          )}

          <div className="convo-thread" aria-live="polite">
            {messages.length === 0 ? (
              <p className="convo-empty">
                {mode === 'onboarding'
                  ? 'Your onboarding guest just walked in. Start with Greet — you have 4 responses for this step.'
                  : mode === 'drill'
                    ? 'The guest is waiting. Type your response.'
                    : 'A guest just walked in. Start with your welcome.'}
              </p>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`convo-bubble convo-bubble-${message.role}`}
                >
                  <span className="convo-bubble-label">
                    {message.role === 'guest' ? 'Guest' : 'You'}
                  </span>
                  <p>{message.text}</p>
                </div>
              ))
            )}
          </div>

          <label className="convo-input-label" htmlFor="convo-input">
            {mode === 'roleplay'
              ? 'Your welcome as the sales associate'
              : 'Your reply as the sales associate'}
          </label>
          <textarea
            id="convo-input"
            className="convo-input"
            rows={3}
            value={input}
            disabled={busy || stepDone}
            placeholder="Type your response…"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void sendMessage();
              }
            }}
          />

          <div className="convo-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={busy || stepDone || !input.trim()}
              onClick={() => void sendMessage()}
            >
              {busy ? 'Guest is replying…' : 'Send'}
            </button>

            {mode === 'onboarding' && stepDone && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={advanceOnboardingStep}
              >
                {isLastStep
                  ? 'Finish assessment'
                  : `Continue to ${COMFORT_COMPASS_STAGES[onboardingStepIndex + 1]?.name || 'next step'}`}
              </button>
            )}

            {mode === 'onboarding' && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onBackToOverview}
              >
                Back to overview
              </button>
            )}
            {mode === 'drill' && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onChooseAnotherDrill}
              >
                Choose another drill
              </button>
            )}
            {mode === 'roleplay' && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setCustomerState(generateCustomerState());
                  setMessages([]);
                  setInput('');
                }}
              >
                Start over
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function onboardingStageBridge(stageId: string): string {
  const bridges: Record<string, string> = {
    discover: "Okay… so yeah, we're mostly looking at the living room.",
    demonstrate: 'That helps. Do you have something in mind I should look at?',
    develop: "I like where this is going, but I'm still thinking about the whole room.",
    close: 'Alright… what would this actually look like if we did it?',
    setExpectations: "If we move forward, I just don't want any surprises later.",
  };
  return bridges[stageId] || 'Okay… what else should we cover?';
}
