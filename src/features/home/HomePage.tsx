type HomePageProps = {
  faded?: boolean;
  onOpenOnboarding: () => void;
  onOpenRoleplay: () => void;
  onOpenDrills: () => void;
};

export function HomePage({
  faded = false,
  onOpenOnboarding,
  onOpenRoleplay,
  onOpenDrills,
}: HomePageProps) {
  return (
    <main className={`coach-home${faded ? ' is-faded' : ''}`}>
      <section className="coach-hero" aria-label="Welcome to The Comfort Coach">
        <img
          className="coach-hero-banner"
          src="/assets/home-hero-banner.jpg"
          alt="Welcome to The Comfort Coach. Practice customer conversations, try new approaches, and get coaching feedback. Comfort Starts with Great Conversations."
          width={1024}
          height={364}
        />
      </section>

      <section className="coach-path-cards" aria-label="Training options">
        <button
          type="button"
          className="path-card path-card-onboarding path-card-image"
          onClick={onOpenOnboarding}
          aria-label="Get started with Onboarding"
        >
          <img
            className="path-card-art"
            src="/assets/onboarding-card.jpg"
            alt="Onboarding. Learn the Comfort Compass and understand the foundations of the customer experience. Get Started."
            width={330}
            height={184}
          />
        </button>

        <button
          type="button"
          className="path-card path-card-roleplay path-card-image"
          onClick={onOpenRoleplay}
          aria-label="Get started with Role-Play"
        >
          <img
            className="path-card-art"
            src="/assets/roleplay-card.jpg"
            alt="Role-Play. Practice full customer visits and receive personalized coaching on your approach. Get Started."
            width={330}
            height={184}
          />
        </button>

        <button
          type="button"
          className="path-card path-card-drills path-card-image"
          onClick={onOpenDrills}
          aria-label="Get started with Drills"
        >
          <img
            className="path-card-art"
            src="/assets/drills-card.jpg"
            alt="Drills. Focus on specific objections and situations through quick practice exercises. Get Started."
            width={330}
            height={184}
          />
        </button>
      </section>

      <footer className="coach-footer">
        <span>American Icon Since 1927</span>
        <span>A More Comfortable World.</span>
      </footer>
    </main>
  );
}
