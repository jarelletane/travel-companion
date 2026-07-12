import { ArrowRight } from "lucide-react";
import mysaLogo from "../assets/mysa-logo.png";

type LoginPageProps = {
  onLogin: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <main className="login-page">
      <div className="gradient-band" />
      <nav className="login-nav">
        <img src={mysaLogo} alt="Mysa" className="logo-mark" />
        <span>Plan beautiful trips</span>
      </nav>
      <section className="login-hero">
        <div>
          <p className="eyebrow">AI planning for your real trip</p>
          <h1>
            From scattered plans to <em>beautiful days</em>
          </h1>
        </div>
        <aside className="login-panel">
          <p>
            Forward bookings, import saved Google places and let AI shape a
            realistic itinerary around what is already planned.
          </p>
          <div className="fake-form" aria-label="Login form">
            <label>
              Username
              <input value="jarelle@example.com" readOnly />
            </label>
            <label>
              Password
              <input value="mysa-demo" type="password" readOnly />
            </label>
            <button className="pill-button orange" onClick={onLogin}>
              Log in
              <ArrowRight size={16} />
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}

