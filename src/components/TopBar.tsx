type TopBarProps = {
  userName?: string;
};

export function TopBar({ userName = 'Sales Associate' }: TopBarProps) {
  const initials = userName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

  return (
    <header className="coach-topbar" aria-label="Comfort Coach header">
      <div className="coach-brand">
        <img
          className="coach-logo"
          src="/assets/lzb-logo-white.png"
          alt="La-Z-Boy"
          width={140}
          height={50}
        />
        <span className="coach-brand-divider" aria-hidden="true" />
        <span className="coach-product-name">The Comfort Coach</span>
      </div>
      <div className="coach-user" aria-live="polite">
        <span className="coach-user-avatar">{initials || 'SA'}</span>
        <span className="coach-user-name">{userName}</span>
      </div>
    </header>
  );
}
