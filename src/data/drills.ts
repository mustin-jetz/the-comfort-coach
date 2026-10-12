export type DrillScenario = {
  id: string;
  title: string;
  category: string;
  difficulty?: string;
  description: string;
  opener: string;
  focus: string;
  lookFor: string[];
  samplePhrases: string[];
  stageId: string;
};

export const DRILL_SCENARIOS: DrillScenario[] = [
  {
    id: 'price-pushback',
    category: 'Objection Handling',
    difficulty: 'Medium',
    title: 'The Price Pushback',
    description:
      'A customer loves the recliner but balks at the price. Focus on reinforcing value before any discount talk.',
    opener: "I really like this one… but that's more than I wanted to spend.",
    focus:
      'Acknowledge the price concern, re-establish value (comfort, longevity, warranty), then ask for the sale again — do not jump straight to a discount.',
    lookFor: [
      'Acknowledge the price concern without getting defensive',
      'Re-establish value before talking money off',
      'Ask what “too much” means / uncover the real budget worry',
      'Offer financing or a lower-cost La-Z-Boy only after value is clear',
      'Ask for the sale again',
    ],
    samplePhrases: [
      'I hear you — it’s a big investment. What feels high about it?',
      'You’re going to have this a long time — here’s what you’re really getting…',
      'If we can make the payments comfortable, would this be the one?',
    ],
    stageId: 'close',
  },
  {
    id: 'just-browsing',
    category: 'Greeting',
    difficulty: 'Easy',
    title: 'Just Browsing',
    description:
      "A guarded customer doesn't want to be sold to. Focus on the Greet: warm them up and get permission to help.",
    opener: "I'm just looking. I don't really need any help.",
    focus:
      'Warm, non-threatening greet. Acknowledge “just looking,” build rapport, and earn permission to ask a light question — do not pitch product yet.',
    lookFor: [
      'Warm welcome without pressure',
      'Acknowledge “just looking” without walking away',
      'Non-business icebreaker or light rapport',
      'Earn permission to help / ask one soft discovery question',
    ],
    samplePhrases: [
      'Totally fine — ideas are the fun part.',
      'Welcome in. Mind if I point you toward a couple popular spots while you browse?',
      'What room are you getting ideas for today?',
    ],
    stageId: 'greet',
  },
  {
    id: 'need-to-think',
    category: 'Closing',
    difficulty: 'Hard',
    title: 'Need to Think About It',
    description:
      'Ready to close, but the customer hesitates at the decision. Focus on the Close: handle the false objection and find the real concern.',
    opener: 'I need to think about it.',
    focus:
      'Treat “I need to think about it” as a false objection. Empathize, then ask what the real concern is. Do not pressure or abandon the close.',
    lookFor: [
      'Acknowledge and empathize with “think about it”',
      'Ask “What concerns do you have?” to find the real objection',
      'Address the real concern with Comfort Compass language',
      'Ask for the sale again without pressure',
    ],
    samplePhrases: [
      'I understand — it’s a big decision and you’ll have it a long time.',
      'What concerns do you have?',
      'If we solved that, would you feel ready to move forward?',
    ],
    stageId: 'close',
  },
  {
    id: 'empty-room',
    category: 'Discovery',
    difficulty: 'Easy',
    title: 'The Empty Room',
    description:
      "A customer knows they need furniture but isn't sure what. Focus on Discover: ask the right questions before showing product.",
    opener: "We just need something for the living room… I'm not really sure what though.",
    focus:
      'Stay in Discover. Ask what they’re adding/replacing, what’s most important, who uses it, and timeframe before jumping to a demo.',
    lookFor: [
      'Ask what they are adding or replacing',
      'Ask what’s most important in the new piece',
      'Learn who else uses it / household needs',
      'Confirm timeframe before demonstrating',
    ],
    samplePhrases: [
      'What’s most important in your new sofa?',
      'Who else will be using it?',
      'Are you replacing something, or starting fresh?',
    ],
    stageId: 'discover',
  },
  {
    id: 'skeptical-sit',
    category: 'Demonstration',
    difficulty: 'Medium',
    title: 'The Skeptical Sit',
    description:
      "Customer won't commit to trying the product. Focus on Demonstrate: get them to experience the La-Z-Boy difference.",
    opener: "I don't need the whole pitch. I'll know it when I sit in it — and I'm not sure I even want to sit yet.",
    focus:
      'Invite them into a low-pressure Fit Test. Tie features to what matters to them. Do not dump a generic feature list.',
    lookFor: [
      'Invite a sit / La-Z-Boy Fit Test without pressure',
      'Tie features to their stated needs',
      'Show why La-Z-Boy is different from cheaper options',
      'Check their reaction and ask what they notice',
    ],
    samplePhrases: [
      'Would you mind sitting for a second so you can feel the difference?',
      'Since comfort matters most to you, notice your lower back here…',
      'How does that compare to what you have at home?',
    ],
    stageId: 'demonstrate',
  },
  {
    id: 'spouse-decision',
    category: 'Objection Handling',
    difficulty: 'Hard',
    title: 'The Spouse Decision',
    description:
      'Customer wants it but defers to an absent spouse. Focus on the Close: respect the partnership and keep momentum.',
    opener: "I should check with my spouse before we do anything.",
    focus:
      'Respect the absent decision maker. Uncover whether they love it, offer hold / designer / return-visit plan, and avoid pressuring a solo close.',
    lookFor: [
      'Acknowledge the spouse as part of the decision',
      'Confirm whether this would be “the one” if spouse agrees',
      'Offer a hold, follow-up, or in-home/designer option',
      'Keep the relationship warm — no hard close pressure',
    ],
    samplePhrases: [
      'That makes sense — you’ll both be living with it.',
      'If they love it too, would this be the one?',
      'We can hold it / set a time for both of you to come back.',
    ],
    stageId: 'close',
  },
  {
    id: 'in-home-design',
    category: 'In-Home Design',
    difficulty: 'Medium',
    title: 'Booking an In-Home Design Appointment',
    description:
      'Transition a curious shopper into a booked In-Home Design appointment with your Designer.',
    opener: "This is helpful, but I'm worried it'll look different once it's in our house.",
    focus:
      'Use Develop language to offer Designer / in-home help as a solution, book a clear next step, and do not overwhelm with accessories first.',
    lookFor: [
      'Acknowledge room-fit / style uncertainty',
      'Position Designer / in-home as helpful, not pushy',
      'Book a specific appointment or next step',
      'Confirm what to expect from the visit',
    ],
    samplePhrases: [
      'A lot of guests feel that way — that’s why our Designer can come to you.',
      'Would a weekday evening or weekend work better?',
      'We’ll map the room so you’re not guessing on fit or style.',
    ],
    stageId: 'develop',
  },
  {
    id: 'protection-plan',
    category: 'Protection Plan',
    difficulty: 'Medium',
    title: 'Selling the Protection Plan',
    description:
      'Present the ServeCo Protection Plan (FAB) and handle the customer’s hesitation.',
    opener: "Do I have to take the protection plan? It feels like an add-on.",
    focus:
      'Present protection with features-advantages-benefits tied to their use (kids, pets, spills). Handle hesitation without guilt.',
    lookFor: [
      'Acknowledge the add-on concern',
      'Explain protection with clear benefits tied to their life',
      'Use FAB — not fear tactics',
      'Ask if they want it included after value is clear',
    ],
    samplePhrases: [
      'Totally fair question — it’s optional, and here’s why guests with pets/kids often want it…',
      'It protects against accidental stains and damage so the piece stays looking new.',
      'Would you like me to include that for peace of mind?',
    ],
    stageId: 'demonstrate',
  },
  {
    id: 'competitor-compare',
    category: 'Objection Handling',
    difficulty: 'Hard',
    title: 'We Saw It Cheaper Elsewhere',
    description:
      'Customer compares La-Z-Boy to a lower price at another store. Focus on value differentiation, not racing to match.',
    opener: "We saw something similar at Ashley for less. Why would I pay more here?",
    focus:
      'Stay calm. Ask what they liked elsewhere, differentiate comfort/construction/warranty, and avoid trash-talking the competitor.',
    lookFor: [
      'Acknowledge the comparison without criticizing the competitor',
      'Ask what they liked / what price they saw',
      'Differentiate La-Z-Boy value clearly',
      'Return to their priorities and ask for the sale',
    ],
    samplePhrases: [
      'I’m glad you shopped around — what did you like about that one?',
      'A lot of the difference shows up in comfort and how long it lasts…',
      'Based on what matters most to you, here’s why this is worth it.',
    ],
    stageId: 'close',
  },
  {
    id: 'delivery-timeframe',
    category: 'Objection Handling',
    difficulty: 'Medium',
    title: 'That’s Too Long to Wait',
    description:
      'Customer likes the piece but objects to the delivery/custom timeframe. Focus on Set Expectations and options.',
    opener: "Wait — that's longer than I thought. Can we get it sooner?",
    focus:
      'Empathize with timeframe concern, clarify stock vs custom options, set honest expectations, and keep trust.',
    lookFor: [
      'Acknowledge the wait concern',
      'Explain stock vs custom options honestly',
      'Offer the best realistic alternative',
      'Confirm next steps and follow-up',
    ],
    samplePhrases: [
      'I get it — timing matters. Let’s look at what’s available sooner…',
      'Custom gives you exactly what you want; here’s the realistic window.',
      'If we wrote it up today, here’s how follow-up would work.',
    ],
    stageId: 'setExpectations',
  },
];
