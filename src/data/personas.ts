export type ShoppingStage =
  | 'Just Browsing'
  | 'Comparing Competitors'
  | 'Actively Shopping'
  | 'Ready to Buy';

export type CustomerProfile = {
  id: string;
  name: string;
  primaryNeed: string;
  household: string;
  budget: number;
  hiddenObjection: string;
  shoppingStageBias: ShoppingStage[];
};

export const CUSTOMER_PROFILES: CustomerProfile[] = [
  {
    id: 'browser',
    name: 'The Browser',
    primaryNeed: 'Just browsing for ideas; not ready to commit yet',
    household: 'Lives with a partner; no pets mentioned yet',
    budget: 2200,
    hiddenObjection: 'Afraid of being pressured into buying today',
    shoppingStageBias: ['Just Browsing', 'Comparing Competitors'],
  },
  {
    id: 'deal-hunter',
    name: 'The Deal Hunter',
    primaryNeed: 'Finding a reclining sofa at the best possible price',
    household: 'Lives with spouse; two dogs',
    budget: 2500,
    hiddenObjection: 'Thinks La-Z-Boy will be more expensive than Ashley with no real difference',
    shoppingStageBias: ['Comparing Competitors', 'Actively Shopping'],
  },
  {
    id: 'researcher',
    name: 'The Researcher',
    primaryNeed: 'Confirming features, warranties, and build quality before deciding',
    household: 'Lives with spouse; researching for both of them',
    budget: 3200,
    hiddenObjection: 'Worried salespeople exaggerate specs and leave out downsides',
    shoppingStageBias: ['Actively Shopping', 'Comparing Competitors'],
  },
  {
    id: 'family-shopper',
    name: 'The Family Shopper',
    primaryNeed: 'A family living-room sofa everyone will actually use',
    household: 'Spouse not here today; two kids at home',
    budget: 2800,
    hiddenObjection: 'Won’t buy without spouse approval, even if they like it',
    shoppingStageBias: ['Actively Shopping', 'Just Browsing'],
  },
  {
    id: 'comfort-seeker',
    name: 'The Comfort Seeker',
    primaryNeed: 'A recliner that is easier on backs/knees than what they have',
    household: 'Spouse recovering from knee surgery; scouting alone today',
    budget: 1800,
    hiddenObjection: 'Doesn’t understand power lift vs regular and is embarrassed to ask',
    shoppingStageBias: ['Actively Shopping', 'Ready to Buy'],
  },
  {
    id: 'pet-owner',
    name: 'The Pet Owner',
    primaryNeed: 'A durable, easy-clean couch that can survive pets',
    household: 'Two labs that think the couch is theirs',
    budget: 2600,
    hiddenObjection: 'Worried nice furniture won’t last with muddy paws and shedding',
    shoppingStageBias: ['Actively Shopping', 'Just Browsing'],
  },
  {
    id: 'new-homeowner',
    name: 'The New Homeowner',
    primaryNeed: 'Furnishing an empty first home, starting with the living room',
    household: 'Just moved in with partner; house is basically empty',
    budget: 3000,
    hiddenObjection: 'Overwhelmed by choices and scared of buying the wrong style',
    shoppingStageBias: ['Actively Shopping', 'Just Browsing'],
  },
  {
    id: 'empty-nester',
    name: 'The Empty Nester',
    primaryNeed: 'Updating the living room now that the kids are grown',
    household: 'Spouse at home; empty nest, taking their time',
    budget: 4500,
    hiddenObjection: 'Doesn’t want to feel rushed into a trendy look they’ll regret',
    shoppingStageBias: ['Just Browsing', 'Actively Shopping'],
  },
  {
    id: 'luxury-buyer',
    name: 'The Luxury Buyer',
    primaryNeed: 'A premium customized piece that feels high-end',
    household: 'Design-conscious couple; pets optional',
    budget: 6500,
    hiddenObjection: 'Won’t settle for entry-level even if pitched as a “deal”',
    shoppingStageBias: ['Ready to Buy', 'Actively Shopping'],
  },
  {
    id: 'indecisive',
    name: 'The Indecisive Shopper',
    primaryNeed: 'Wants a new sofa but second-guesses every option',
    household: 'Shops alone but texts a friend/spouse for opinions',
    budget: 2700,
    hiddenObjection: 'Fear of making the wrong decision and buyer’s remorse',
    shoppingStageBias: ['Just Browsing', 'Comparing Competitors'],
  },
];

export const CUSTOMER_DIFFICULTIES = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
] as const;

export const CUSTOMER_MOODS = [
  'Friendly',
  'Skeptical',
  'Rushed',
  'Excited',
  'Frustrated',
  'Reserved',
] as const;

export const SHOPPING_STAGES: ShoppingStage[] = [
  'Just Browsing',
  'Comparing Competitors',
  'Actively Shopping',
  'Ready to Buy',
];

export type CustomerState = {
  customer_profile: string;
  profile_id: string;
  difficulty: (typeof CUSTOMER_DIFFICULTIES)[number];
  mood: (typeof CUSTOMER_MOODS)[number];
  shopping_stage: ShoppingStage;
  budget: number;
  household: string;
  primary_need: string;
  hidden_objection: string;
};

function pickOne<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

export function generateCustomerState(): CustomerState {
  const profile = pickOne(CUSTOMER_PROFILES);
  const difficulty = pickOne(CUSTOMER_DIFFICULTIES);
  const mood = pickOne(CUSTOMER_MOODS);
  const shoppingStage = pickOne(
    profile.shoppingStageBias.length ? profile.shoppingStageBias : SHOPPING_STAGES,
  );
  const budgetVariance = Math.round((Math.random() * 0.2 - 0.1) * profile.budget);
  const budget = Math.max(900, Math.round((profile.budget + budgetVariance) / 50) * 50);

  return {
    customer_profile: profile.name,
    profile_id: profile.id,
    difficulty,
    mood,
    shopping_stage: shoppingStage,
    budget,
    household: profile.household,
    primary_need: profile.primaryNeed,
    hidden_objection: profile.hiddenObjection,
  };
}
