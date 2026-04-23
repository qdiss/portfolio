import { useState, useEffect } from "react";
import { useLang } from "../context/LangContext";

export default function CookieManager() {
  const { t } = useLang();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieConsent, setCookieConsent] = useState({
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookie_consent_given");
    const savedSettings = localStorage.getItem("cookie_settings");

    if (hasConsent === "true" && savedSettings) {
      const settings = JSON.parse(savedSettings);
      setCookieConsent(settings);
      setShowBanner(false);
      applyConsentToServices(settings);
    } else if (hasConsent === "false") {
      setShowBanner(false);
      applyConsentToServices({ analytics: false, functional: false, marketing: false });
    } else {
      setShowBanner(true);
    }
  }, []);

  const applyConsentToServices = (consent) => {
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_storage: consent.marketing ? "granted" : "denied",
        ad_user_data: consent.marketing ? "granted" : "denied",
        ad_personalization: consent.marketing ? "granted" : "denied",
      });
    }
  };

  const logConsentEvent = (consent) => {
    const consentLog = { timestamp: new Date().toISOString(), consent, userAgent: navigator.userAgent, url: window.location.href };
    const logs = JSON.parse(localStorage.getItem("consent_logs") || "[]");
    logs.push(consentLog);
    localStorage.setItem("consent_logs", JSON.stringify(logs.slice(-100)));
  };

  const handleAcceptAll = () => {
    const newConsent = { analytics: true, functional: true, marketing: true };
    setCookieConsent(newConsent);
    localStorage.setItem("cookie_consent_given", "true");
    localStorage.setItem("cookie_settings", JSON.stringify(newConsent));
    setShowBanner(false);
    setShowSettings(false);
    applyConsentToServices(newConsent);
    logConsentEvent(newConsent);
  };

  const handleDeclineAll = () => {
    const newConsent = { analytics: false, functional: false, marketing: false };
    setCookieConsent(newConsent);
    localStorage.setItem("cookie_consent_given", "true");
    localStorage.setItem("cookie_settings", JSON.stringify(newConsent));
    setShowBanner(false);
    setShowSettings(false);
    applyConsentToServices(newConsent);
    logConsentEvent(newConsent);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie_consent_given", "true");
    localStorage.setItem("cookie_settings", JSON.stringify(cookieConsent));
    setShowSettings(false);
    setShowBanner(false);
    applyConsentToServices(cookieConsent);
    logConsentEvent(cookieConsent);
  };

  // Reset: clear all cookie prefs and re-show the banner
  const handleReset = () => {
    localStorage.removeItem("cookie_consent_given");
    localStorage.removeItem("cookie_settings");
    localStorage.removeItem("consent_logs");
    setCookieConsent({ analytics: false, functional: false, marketing: false });
    setShowSettings(false);
    setShowBanner(true);
  };

  // Expose reset via a custom event so other components can trigger it
  useEffect(() => {
    const handler = () => handleReset();
    window.addEventListener("cookie:reset", handler);
    return () => window.removeEventListener("cookie:reset", handler);
  }, []);

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {showBanner && (
        <div className="cookie-bar" style={{ position: "fixed", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 9998, maxWidth: "560px", width: "calc(100% - 3rem)" }}>
          <p className="cookie-text">
            {t.cookie_text}{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); setShowSettings(true); }}>{t.cookie_link}</a>
          </p>
          <div className="cookie-btns">
            <button className="cookie-accept" onClick={handleAcceptAll}>{t.cookie_accept}</button>
            <button className="cookie-decline" onClick={handleDeclineAll}>{t.cookie_decline}</button>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="cookie-modal" onClick={() => setShowSettings(false)}>
          <div className="cookie-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Cookie Preferences</h2>
            <p>Manage your cookie preferences below. Essential cookies cannot be disabled as they ensure the website functions properly.</p>

            <div className="cookie-categories">
              <div className="cookie-category">
                <div className="category-header">
                  <h4>Essential Cookies</h4>
                  <span className="always-active">Always Active</span>
                </div>
                <p>Necessary for the website to function and cannot be switched off.</p>
              </div>

              <div className="cookie-category">
                <div className="category-header">
                  <h4>Analytics Cookies</h4>
                  <label className="switch">
                    <input type="checkbox" checked={cookieConsent.analytics} onChange={(e) => setCookieConsent((prev) => ({ ...prev, analytics: e.target.checked }))} />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>Help us understand how visitors interact with our website.</p>
              </div>

              <div className="cookie-category">
                <div className="category-header">
                  <h4>Functional Cookies</h4>
                  <label className="switch">
                    <input type="checkbox" checked={cookieConsent.functional} onChange={(e) => setCookieConsent((prev) => ({ ...prev, functional: e.target.checked }))} />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>Enable enhanced functionality and personalization.</p>
              </div>

              <div className="cookie-category">
                <div className="category-header">
                  <h4>Marketing Cookies</h4>
                  <label className="switch">
                    <input type="checkbox" checked={cookieConsent.marketing} onChange={(e) => setCookieConsent((prev) => ({ ...prev, marketing: e.target.checked }))} />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>Used to deliver relevant advertisements.</p>
              </div>
            </div>

            <div className="cookie-modal-buttons">
              <button onClick={handleAcceptAll} className="btn-accept">Accept All</button>
              <button onClick={handleSavePreferences} className="btn-save">Save Preferences</button>
            </div>

            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <button
                onClick={handleReset}
                style={{ background: "none", border: "none", color: "var(--muted)", fontSize: "0.75rem", cursor: "pointer", textDecoration: "underline", padding: 0 }}
              >
                {t.cookie_reset || "Reset cookie preferences"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
