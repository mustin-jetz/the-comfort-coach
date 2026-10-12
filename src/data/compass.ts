export const COMPASS_PHILOSOPHY = `Comfort Compass is La-Z-Boy’s collaborative, flexible sales process.
Be a trusted friend who listens, cares, and guides guests so they feel confident in their decisions and happy with their furniture for years.
A win is any of: (1) a purchase in the store today, (2) a Designer in-home appointment, or (3) a scheduled return visit or follow-up contact.
Get guests talking with open-ended questions that start with Who, What, When, Where, Why, How, and Tell me. Never interrogate. Never pressure.`;

export type CompassStageId =
  | 'greet'
  | 'discover'
  | 'demonstrate'
  | 'develop'
  | 'close'
  | 'setExpectations';

export type CompassStage = {
  id: CompassStageId;
  name: string;
  step: string;
  lookFor: string[];
  samplePhrases: string[];
  coachingNotes: string;
};

export const COMFORT_COMPASS_STAGES: CompassStage[] = [
  {
    id: 'greet',
    name: 'Greet',
    step: '01',
    lookFor: [
      'Welcome guests and pause so they can respond',
      'Non-business greeting — personal icebreaker before sales talk',
      'Ask if they have been in the showroom before',
      'Introduce yourself and pause so they can offer their name',
      'Introduce the current sale, including financing (keep it simple)',
      'Transition: “What room/project are you getting ideas for?”',
    ],
    samplePhrases: [
      'Welcome in — how’s the weather treating you on the way over?',
      'Have you been in our showroom before?',
      'I’m [Name]. What’s your name?',
      'We’re running a current sale with financing — I’ll keep the details light until I know what you need.',
      'What room or project are you getting ideas for?',
    ],
    coachingNotes: `Step 1: Greet — Make a Friend. Warmth and competence matter.
1) Welcome, then pause (“paws”). Slow down so they can see you, get used to you, and ask for someone or something.
2) Non-business greeting first. Be a real person, not just a salesperson. Use something universal: weather, local events, traffic, what part of town they came from. Have an open-ended greeting ready so you don’t freeze.
3) Ask if they’ve been in before. Saves them from starting over. If they don’t remember, move on — don’t interrogate.
4) Introduce yourself, then pause (friendliness gauge). Do they offer their name? Handshake only if you’re comfortable: open your palm slightly, match their grip, let them take control.
5) Introduce the current sale simply and include financing so they know they’re getting value today. Don’t drown them in details until you know their needs.
6) Ask “What room/project are you getting ideas for?” That wording acknowledges they’re just getting ideas and opens the room, not only one piece.

If they say “I’m just looking”: that is usually an unconscious “don’t pressure me,” not personal. Don’t run away. Observe the whole person.
- If they throw up a hand or seem agitated (about 20% when the relationship is built well): give space. “Please enjoy, getting ideas is the fun part!” Mention the Designer refreshed the showroom, introduce yourself, mention the sale, stay near without hovering (look up stock, straighten), then reapproach with water if available. When they pause on a product, talk about why it’s popular, demonstrate a feature with a benefit, then “What do you think? Was there anything else that caught your eye?”
- If they are not agitated: “That’s the fun part of shopping! We have a big showroom, so I can point you in the right direction — what are you looking to add or replace in the future?”`,
  },
  {
    id: 'discover',
    name: 'Discover',
    step: '02',
    lookFor: [
      'What are you looking to add or replace? If replacing, why?',
      'What’s most important in your new ___? And what else?',
      'What have you seen that you like while shopping? Picture?',
      '“I’m a visual person, help me see…” — sketch the room',
      'What are you keeping that you love? What do you love about it?',
      'Reclining or non-reclining? Use the sketch for spacing if reclining',
      'Thoughts on leather? Color?',
      'Who else will use it? Height? Kids or pets?',
      'When do you need it? What occasion is coming up?',
      'Compliment the room and say “I’ve learned from my Designer…” (do not offer Designer help yet)',
      'Transition: “I have a couple in mind” — confirm, confirm, confirm each need',
    ],
    samplePhrases: [
      'Excellent — what are you looking to add or replace in your living room?',
      'What’s most important in your new sofa? And what else?',
      'I’m a visual person — help me see, if this is your room, where is…?',
      'Who else will be using your new piece? Any kids or pets?',
      'So we want a neutral leather, clean lines, and good back support?',
    ],
    coachingNotes: `Step 2: Discover — Find out what they need. Become the trusted friend helping them shop. Learn why they’re shopping, what’s important, and why — only then can you guide a decision they’ll be happy with for years.

Open-ended only. The transition “What room/project are you getting ideas for?” usually lands one of three ways:
- A room (“I’m redoing my living room”) → “Excellent, what are you looking to add or replace in your living room?”
- A furniture type (“I’m looking for a recliner”) → “Excellent, are you looking to add or replace a recliner?”
- “I’m just looking” → “That’s the fun part of shopping! We have a big showroom, so I can point you in the right direction — what are you looking to add or replace in the future?”

Nine windowpane questions (don’t skip the “why” and “what else”):
1. Add or replace? If replacing, why?
2. What’s most important in your new ___? And what else? Narrows the showroom and gives confirm points later.
3. What have you seen that you like? Picture? Gives a reference for color, style, price.
4. “I’m a visual person, help me see… if this is your room, where is your ___?” Sketch. Leading with why shows you care.
5. What are you keeping that you love? What do you love about it? Picture? Guides style and may signal Designer later.
6. Reclining or non-reclining? For reclining, use the sketch for spacing and wall clearance.
7. Thoughts on leather? Color? Lead with leather — longest lasting, most durable, best value.
8. Who else will use it? Height? Kids or pets? Informs protection plans and other decision makers.
9. When do you need it? Occasion? Want vs need; stock vs custom.

Compliment their room and say “I’ve learned from my Designer…” That builds their confidence and plants that La-Z-Boy has Designers. Do NOT offer the Designer helping them yet — too soon, it can scare them.
Designer nuggets you can share: mixing warm and cool colors if something ties them together; biggest piece on the biggest wall; mix fabrics and leathers without exact matching; go neutral on big pieces so pillows/rugs/art can change later.

Power of choice: “I have a couple in mind.” You don’t need to know which two yet. Then confirm, confirm, confirm each need: “So we want a neutral leather? Clean lines? Good back support?” Small yesses create alignment for the close.`,
  },
  {
    id: 'demonstrate',
    name: 'Demonstrate',
    step: '03',
    lookFor: [
      'Present style and gain agreement: “I was thinking of this one because… what do you think of the style?”',
      'La-Z-Boy Fit Test (head, shoulders, lumbar, knees & toes) and sketch for room fit',
      'Key features, benefits, and options tied to what matters most to them',
      'Talk about La-Z-Boy warranties and protection plans',
      'Offer a second style that is different enough to help them choose',
      'Transition: confirm needs are met — “We have a few more decisions to make.”',
    ],
    samplePhrases: [
      'I was thinking of this one because… what do you think of the style?',
      'Let’s do a Fit Test — head, shoulders, lumbar, knees, and toes — so you can feel the difference.',
      'Because you said back support matters most, here’s how this helps…',
      'Would you like to see a second style that’s a little different so you can compare?',
      'We have a few more decisions to make.',
    ],
    coachingNotes: `Step 3: Demonstrate — Show solutions. If we don’t demonstrate what makes La-Z-Boy different, guests only see style and price. Help them see past the price.
Transition in with “I have a couple in mind,” then confirm, confirm, confirm.
- Present style: “I was thinking of this one because… what do you think of the style?” Gain agreement on looks.
- Assess fit for the person and the room. La-Z-Boy Fit Test: Head, Shoulders, Lumbar, Knees & Toes. Use the sketch for space and how they use the room. Fit is a differentiator.
- Show KEY features, benefits, and options — personalized to what’s most important to them, not a generic feature dump.
- Talk warranties and protection plans: peace of mind, protect the investment, another differentiator.
- Offer a second style. Power of choice. The second style should be different enough to help them decide which they prefer. If you show only one and it’s wrong, they may not tell you.
- Transition to Develop once needs are met: “We have a few more decisions to make…”`,
  },
  {
    id: 'develop',
    name: 'Develop',
    step: '04',
    lookFor: [
      'Expand the sketch: other colors, tables, wall color, flooring, rug, lighting',
      'Customize — show all options so they have the power of choice',
      'Look up stock or pull custom leather/fabric; bring correlates for pillows (don’t send them to the Design Center)',
      'Lifestyle questions: what else they do in the room, where they put their drink',
      'Propose In-Home Design when appropriate (fast, easy, free; regret-free buying)',
      'Trial close: “Since you’re here, would you like to look at a ___?”',
    ],
    samplePhrases: [
      'What other colors and tables do you have in your room? How’s your lighting?',
      'What else do you do in this room?',
      'Now that we have your piece, where are you going to put your drink?',
      'Our Designers can make this fast, easy, and it’s free — see it all together in your home.',
      'Since you’re here, would you like to look at a ___?',
    ],
    coachingNotes: `Step 4: Develop — Solve for ALL their home needs. Transition: “We have a few more decisions to make.”
1) Expand the sketch. Leather/fabric colors change with other colors and lighting. Ask: other colors/tables (photo?), wall color and flooring, area rug, lighting.
2) Customize. Show ALL options so they have the power of choice.
3) Look up stock — or pull custom fabrics/leathers. That gives them space to think. Bring leather/fabric TO them. Do not invite them to the Design Center; it can overwhelm. Bring correlate fabrics for pillows so the new piece blends with what they already have.
4) Lifestyle questions: “What else do you do in your room?” “Where are you going to put your drink?” Use the sketch and pictures to spot opportunities.
5) If appropriate, propose In-Home Design as the solution when they feel overwhelmed: Designers make it fast, easy, and free; no more trying things out and returning them; see colors with existing pieces and space-plan in their home.
When booking a Design appointment, cover: sketch of additional needs; frames they love (about 1 per category, 2 max); covers with a correlate (color family plus a pillow/rug/art direction); a rough dollar-range estimate with agreement (no discounts yet); and a store tour noting likes and dislikes.
6) “Since you’re here, would you like to look at a ___?” Moves toward a Design appointment or the Close by showing additional pieces you already identified.`,
  },
  {
    id: 'close',
    name: 'Close',
    step: '05',
    lookFor: [
      'Give a quote with protection, tax, and delivery; collect full name, address, email, and phone',
      'Present three prices: total before discount, discount amount, then total',
      'Ask for the sale (either/or, direct, or assumptive) and pause',
      'If they need to think about it: acknowledge, empathize, then “What concerns do you have?”',
      'Handle real objections (price, room fit/color, another decision maker) then ask again',
      'If they negotiate: don’t say no or check with a manager; use straight-forward pricing and the 30-day price guarantee',
      'If unable to close: schedule follow-up with preferred contact, day, and time; share product info',
      'Store tour on the way to the register or the door — Design Center and Dining at minimum',
    ],
    samplePhrases: [
      'Here’s the price before discount, what you save, and your total with protection, tax, and delivery.',
      'Would you like delivery this week or next?',
      'I understand — it’s a big decision you’ll have a long time. What concerns do you have?',
      'I’m glad you asked. We believe in straight-forward pricing — no one will pay less than you. We also have a 30-day price guarantee.',
      'If they like it, is this the perfect piece for you?',
    ],
    coachingNotes: `Step 5: Close — Pressure-free. Earn customers for life.
1) Quote with protection, tax, and delivery. Collect full name, address, email, and phone. No surprise fees. Give three prices so they get credit for the discount: (1) total before discount (2) discount amount (3) total.
2) Ask for the sale, then pause. Either/or: “Would you like delivery this week or next?” Direct: “Do you want to get it?” Assumptive: “So this is it, right?”
3) Overcome objections.
False objection “I need to think about it”: acknowledge and empathize — “I understand, it’s a big decision / you’re going to have it a long time.” Then “What concerns do you have?” to reach the real objection.
Price: empathize (inflation, house costs, milk), re-establish value (longevity, comfort, warranty, style), show more features, ask again, offer financing, or a lower-cost La-Z-Boy.
Fit with the room: empathize that we’re all scared of a mistake we’ll live with. Size → sketch and reassure if replacing a like piece. Color → sketch and existing pieces, or another color. Ask again.
Another decision maker: “They’re going to live with it too, we want them to love it.” Then “If they like it, is this the perfect piece for YOU?” Offer a 3-day hold for stock or a follow-up for custom.
4) If unable to close: schedule follow-up (preferred contact, day, time), give email or printed product info, and show additional features not covered in Demonstrate.
5) Store tour on the way to the card machine or the door. Show at least the Design Center (Design Service) and Dining. Plant that we can finish their home now or later (Relax/Live, Refuel/Eat, Retreat/Work-Study-Play, Recharge/Sleep).

If they attempt to negotiate: never say “No” and never “Let me check with my manager” (that strips your power; if the manager can’t move price, they assume the manager chose not to). Acknowledge and compliment: “I’m glad you asked — in a lot of stores you’d pay more if you didn’t.” At La-Z-Boy we use straight-forward pricing — the very best price, no one pays less. Mention the 30-day price guarantee from date of purchase. Then ask for the sale again.`,
  },
  {
    id: 'setExpectations',
    name: 'Set Expectations',
    step: '06',
    lookFor: [
      'Confirm order details, collect payment and signature (read back name, address, phone, email)',
      'Confirm frame, function, cover, and options; explain protection (tear sheet or initials if declined)',
      'Set expectations for timeframe and follow-up (stock delivery vs custom plan)',
      'Return to the product and show additional features not covered in Demonstrate',
      'Walk them to the door, thank and congratulate',
      'Send a thank-you note (handwritten if you have an address, otherwise email) before the next guest if possible',
    ],
    samplePhrases: [
      'Let’s confirm everything together — name, address, phone, email, then frame, function, cover, and options.',
      'For stock, here’s your delivery date and how that process works. For custom, here’s the timeframe and how I’ll follow up.',
      'Before you go, let me show you one more feature you’ll love about this.',
      'Congratulations — you’re going to love this. Thank you for trusting us.',
    ],
    coachingNotes: `Step 6: Set Expectations — No surprises.
1) Confirm order details, collect payment and signature. Read back guest name, address, phone, and email. Confirm frame, function, cover, and options. Explain the protection plan process (tear sheet, or get initials if declined).
2) Set expectations for timeframe and follow-up. Stock: confirm delivery date and process. Custom: explain timeframe and your follow-up plan.
3) Return to the product. Show additional features and benefits not shown in Demonstrate. This reduces buyer’s remorse, adds value, and makes sure the last thing they remember isn’t the price. Walk them to the door, thank and congratulate.
4) Send a thank-you note for everyone you have an address for (handwritten; email only if that’s all you have). Complete this before taking your next guest if possible.`,
  },
];
