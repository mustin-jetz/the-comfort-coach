import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { HomePage } from './features/home/HomePage';
import { OnboardingOverview } from './features/onboarding/OnboardingOverview';
import { DrillPicker } from './features/drills/DrillPicker';
import { ConversationPanel } from './features/conversation/ConversationPanel';
import type { DrillScenario } from './data/drills';
import type { ConversationMode } from './lib/ai/guest';
import './styles/app.css';

type Overlay =
  | { type: 'none' }
  | { type: 'onboarding-overview' }
  | { type: 'drill-picker' }
  | { type: 'conversation'; mode: ConversationMode; drill?: DrillScenario | null };

export default function App() {
  const [overlay, setOverlay] = useState<Overlay>({ type: 'none' });

  const homeFaded = overlay.type !== 'none';

  return (
    <div className={`coach-app${homeFaded ? ' is-path-open' : ''}`}>
      <TopBar />
      <HomePage
        faded={homeFaded}
        onOpenOnboarding={() => setOverlay({ type: 'onboarding-overview' })}
        onOpenRoleplay={() =>
          setOverlay({ type: 'conversation', mode: 'roleplay' })
        }
        onOpenDrills={() => setOverlay({ type: 'drill-picker' })}
      />

      <OnboardingOverview
        open={overlay.type === 'onboarding-overview'}
        onClose={() => setOverlay({ type: 'none' })}
        onStart={() =>
          setOverlay({ type: 'conversation', mode: 'onboarding' })
        }
      />

      <DrillPicker
        open={overlay.type === 'drill-picker'}
        onClose={() => setOverlay({ type: 'none' })}
        onSelect={(scenario) =>
          setOverlay({
            type: 'conversation',
            mode: 'drill',
            drill: scenario,
          })
        }
      />

      <ConversationPanel
        open={overlay.type === 'conversation'}
        mode={overlay.type === 'conversation' ? overlay.mode : 'roleplay'}
        drillScenario={
          overlay.type === 'conversation' ? overlay.drill || null : null
        }
        onClose={() => setOverlay({ type: 'none' })}
        onBackToOverview={() => setOverlay({ type: 'onboarding-overview' })}
        onChooseAnotherDrill={() => setOverlay({ type: 'drill-picker' })}
      />
    </div>
  );
}
