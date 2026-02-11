# AI Agents: Architecture & Orchestration

The **AuraLink** platform was developed using a multi-agent orchestration framework, ensuring rapid deployment, medical accuracy, and robust code quality.

## 🤖 The Agent Team

### 1. Manager Agent (Architecture & Planning)
- **Role**: System Design & Task Orchestration.
- **Contribution**: Defined the "Tunnel Experience" user flow, planned the transition from "Anchor Protocol" (Emergency App) to "AuraLink" (Startup Portal), and managed the implementation roadmap.

### 2. Coder Agent (Implementation)
- **Role**: Full-Stack Development (React/Tailwind).
- **Contribution**: Built the high-performance UI components (`EmergencyPage`, `LandingPage`), implemented the "Cyber-Medical" design system (Tailwind v4), and handled complex logic (Seizure Timer, Geolocation, i18n).

### 3. QA Agent (Medical Verification)
- **Role**: Quality Assurance & Compliance.
- **Contribution**: Verified all medical content against Epilepsy Foundation guidelines (e.g., ensuring "Do NOT restrain" and "Airway management" protocols). Validated international emergency number logic (190/198 vs 911).

## 🔄 Workflow
The development followed a strict **Plan -> Execute -> Verify** loop:
1.  **Plan**: Manager Agent creates `implementation_plan.md`.
2.  **Execute**: Coder Agent writes code and configures infrastructure.
3.  **Verify**: QA Agent (and automated linters) check for errors and safety violations.

This collaborative AI approach allowed for the delivery of a production-grade MVP in under 2 hours.
