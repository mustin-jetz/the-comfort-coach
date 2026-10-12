import { DRILL_SCENARIOS, type DrillScenario } from '../../data/drills';

type DrillPickerProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (scenario: DrillScenario) => void;
};

export function DrillPicker({ open, onClose, onSelect }: DrillPickerProps) {
  if (!open) return null;

  return (
    <div
      className="modal-backdrop path-modal path-modal-drills is-open is-visible"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drill-picker-title"
    >
      <div className="modal-card drill-picker-card path-panel" data-path="drills">
        <div className="modal-header">
          <div className="convo-header-copy">
            <p className="convo-eyebrow">Drills</p>
            <h3 id="drill-picker-title">Choose a scenario</h3>
          </div>
          <button
            type="button"
            className="path-close path-close-light"
            aria-label="Close"
            onClick={onClose}
          >
            <span>Close</span>
            <span className="path-close-x" aria-hidden="true">
              ×
            </span>
          </button>
        </div>
        <div className="modal-body drill-picker-body">
          <p className="drill-picker-intro">
            Practice common guest objections and floor moments. Pick a drill, then
            talk or type your response.
          </p>
          <div className="drill-scenario-grid">
            {DRILL_SCENARIOS.map((scenario) => (
              <article className="drill-card" key={scenario.id}>
                <div className="drill-card-top">
                  <span className="drill-card-tag">{scenario.category}</span>
                </div>
                <h4 className="drill-card-title">{scenario.title}</h4>
                <p className="drill-card-description">{scenario.description}</p>
                <button
                  type="button"
                  className="drill-card-start"
                  onClick={() => onSelect(scenario)}
                >
                  Start drill <span aria-hidden="true">›</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
