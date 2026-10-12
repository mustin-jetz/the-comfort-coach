type OnboardingOverviewProps = {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
};

export function OnboardingOverview({
  open,
  onClose,
  onStart,
}: OnboardingOverviewProps) {
  if (!open) return null;

  return (
    <div
      className="modal-backdrop path-modal path-modal-onboarding is-open is-visible"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="modal-card onboarding-card path-panel" data-path="onboarding">
        <h3 id="onboarding-title" className="sr-only">
          Onboarding Assessment
        </h3>
        <img
          className="onboarding-panel-art"
          src="/assets/onboarding-overview.jpg"
          alt="Onboarding Assessment. The Comfort Compass, 6 steps. Start Assessment."
          width={1024}
          height={499}
          useMap="#onboarding-overview-map"
          draggable={false}
        />
        <map name="onboarding-overview-map" id="onboarding-overview-map">
          <area
            shape="rect"
            coords="960,4,1019,35"
            href="#close-onboarding"
            alt="Close"
            title="Close"
            onClick={(event) => {
              event.preventDefault();
              onClose();
            }}
          />
          <area
            shape="rect"
            coords="368,447,608,494"
            href="#start-onboarding"
            alt="Start Assessment"
            title="Start Assessment"
            onClick={(event) => {
              event.preventDefault();
              onStart();
            }}
          />
        </map>
        <button
          type="button"
          className="onboarding-hotspot onboarding-hotspot-close"
          aria-label="Close"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
        </button>
        <button
          type="button"
          className="onboarding-hotspot onboarding-hotspot-start"
          aria-label="Start assessment"
          onClick={onStart}
        >
          <span className="sr-only">Start assessment</span>
        </button>
      </div>
    </div>
  );
}
