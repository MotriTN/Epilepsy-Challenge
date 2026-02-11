# Changelog

All notable changes to the **AuraLink** platform.

## [Unreleased] - 2026-02-11

### Added
- **[Feature] Tunnel Experience**: A guided, step-by-step emergency interface (Protect -> Safety -> Airway) to assist responders during a seizure.
- **[Safety] Triage Logic**: A "Seizure Onset" modal to correct timer offsets ("Just now" vs "2 mins ago"), ensuring accurate medical data.
- **[UX] Two-Tap Verification**: Replaced older slider mechanisms with a glassmorphic Confirmation Modal to prevent accidental 911 calls while maintaining speed.
- **[Global] Intelligent i18n**: Added full support for **English**, **French**, and **Arabic** (Tunisia context).
- **[Logic] Dynamic Emergency Numbers**: System automatically routes calls to `190` (SAMU) for TN/FR locales and `911` for EN locales.
- **[Startup] AuraLink Landing Page**: Launched a Series-A quality landing page with:
    - E-commerce integration for NFC Bracelets.
    - Interactive "Seizure First Aid" education section.
    - "Cyber-Medical" branding.

### Changed
- **[UI] Theme Overhaul**: Migrated to a "Cyber-Medical" aesthetic (Deep Navy `#0f172a`, Electric Blue accents) using Tailwind CSS v4.
- **[Tech] Infrastructure**: Updated project to use React 19 and modern CSS-native variables.

### Medical Verification
- **[QA] Content Safety**: Validated all instructions against First Aid guidelines (removed any "restraint" or "mouth insertion" references).
