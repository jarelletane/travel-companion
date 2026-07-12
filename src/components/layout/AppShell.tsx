import {
  ArrowRight,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
  User,
} from "lucide-react";
import { useState } from "react";
import type React from "react";
import mysaIcon from "../../assets/mysa-icon.png";
import mysaLogo from "../../assets/mysa-logo.png";
import { navItems } from "../../data/mockData";
import type { Page } from "../../types/navigation";

type AppShellProps = {
  page: Page;
  pageTitle: string;
  onPageChange: (page: Page) => void;
  children: React.ReactNode;
};

export function AppShell({ page, pageTitle, onPageChange, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentNavItem =
    navItems.find((item) => item.page === page) ??
    navItems.find((item) => item.page === "trips") ??
    navItems[0];
  const CurrentNavIcon = currentNavItem.icon;

  const handlePageChange = (nextPage: Page) => {
    onPageChange(nextPage);
    setIsMobileMenuOpen(false);
    setIsNotificationsOpen(false);
  };

  return (
    <main className={collapsed ? "app-shell nav-collapsed" : "app-shell"}>
      <aside className={isMobileMenuOpen ? "side-nav mobile-menu-open" : "side-nav"}>
        <button className="collapse-button" onClick={() => setCollapsed((value) => !value)}>
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
        <div className="brand">
          <img src={collapsed ? mysaIcon : mysaLogo} alt="Mysa" className="brand-logo" />
        </div>
        <div className="notification-shell">
          <button
            className="nav-notification"
            type="button"
            title="Notifications"
            onClick={() => setIsNotificationsOpen((value) => !value)}
          >
            <Bell size={18} />
            <span className="notification-dot" />
            {!collapsed && <span>Notifications</span>}
          </button>
          {isNotificationsOpen && (
            <div className="notification-popover">
              <span>Notifications</span>
              <article>
                <small>Flight</small>
                <strong>QF 937 BNE → PER</strong>
                <em>just added</em>
              </article>
            </div>
          )}
        </div>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((value) => !value)}
        >
          <span>
            <CurrentNavIcon size={18} />
            <span>{currentNavItem.label}</span>
          </span>
          {isMobileMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                className={page === item.page ? "active" : ""}
                onClick={() => handlePageChange(item.page)}
                title={item.label}
              >
                <Icon size={18} />
                {(!collapsed || isMobileMenuOpen) && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <button className="logout-button" onClick={() => handlePageChange("login")} title="Log out">
          <ArrowRight size={18} />
          {!collapsed && <span>Log out</span>}
        </button>
      </aside>

      <section className="main-content">
        {page !== "tripMap" && (
          <header className="app-header">
            <div>
              {page !== "dashboard" && (
                <button className="back-button" onClick={() => onPageChange("dashboard")}>
                  <ChevronLeft size={15} />
                  Back to dashboard
                </button>
              )}
              <p className="eyebrow">{pageTitle}</p>
              {page === "dashboard" ? (
                <div className="welcome-heading">
                  <span>
                    <User size={22} />
                  </span>
                  <h1>Welcome back Milly</h1>
                </div>
              ) : (
                <h1>{pageTitle}</h1>
              )}
            </div>
            <button className="pill-button">
              <Plus size={17} />
              Add new
            </button>
          </header>
        )}

        {children}
      </section>
    </main>
  );
}
