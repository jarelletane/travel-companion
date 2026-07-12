export function SettingsPage() {
  return (
    <section className="panel large">
      <h2>Settings</h2>
      <p className="lede">
        Profile, connected Google account, forwarded email address and notification preferences.
      </p>
      <div className="settings-list">
        <article>
          <strong>Google Maps</strong>
          <p>Saved places connected · Bakeries, Restaurants, Views, Markets.</p>
        </article>
        <article>
          <strong>Email forwarding</strong>
          <p>forward@mysa.example · bookings are sorted into trips automatically.</p>
        </article>
      </div>
    </section>
  );
}

