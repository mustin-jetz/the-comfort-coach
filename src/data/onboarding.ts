import type { CompassStageId } from './compass';

export const ONBOARDING_MAX_RESPONSES = 4;

export const ONBOARDING_STEP_BLURBS: Record<CompassStageId, string> = {
  greet:
    'Welcome the guest warmly. Build rapport with a non-business greeting before any selling.',
  discover:
    'Ask open-ended questions to understand what the guest wants, their lifestyle, style preferences, and who will use the furniture.',
  demonstrate:
    'Present style, assess fit, show key features tied to discovered needs, and introduce La-Z-Boy warranties and Protection Plans.',
  develop:
    'Expand the sketch throughout the room for function and fashion. Customize, ask lifestyle questions, and present In-Home Design if appropriate.',
  close:
    'Give a full quote with protection, tax, and delivery. Ask for the sale, overcome objections, and schedule follow-up if needed.',
  setExpectations:
    'Confirm order details, collect payment, review warranty and protection, set delivery expectations, return to product, and thank the guest.',
};
