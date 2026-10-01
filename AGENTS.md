# Documentation project instructions

## About this project

- This is the **SMM Panel AI** documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Brand strings come from `.env` → `npm run sync-brand` → `docs.json` (`name`, navbar, `variables`) and MDX body text
- In new MDX drafts, use placeholders `__BRAND_NAME__`, `__APP_URL__`, `__SUPPORT_EMAIL__`, `__PANEL_CTA_LABEL__`, then run `npm run sync-brand`
- Keep the public docs **short and AI-safe**: operator how-tos only

## Terminology

| Prefer | Avoid / notes |
|--------|----------------|
| **SMM Panel AI** / `__BRAND_NAME__` (before sync) | Perfect AI, Nexa, Perfect Bot in user-facing copy |
| **Account** | Central login: My Systems, billing, team invites |
| **System** | One support panel the owner launches |
| **Channel** | WhatsApp, Telegram, or website widget |
| **Customer** | Chat sender; may link to a Perfect Panel username |
| **Command** | Short customer message that requests an order action |
| **SMM Panel** | Settings screen for Perfect Panel credentials |

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Prefer Mintlify `<Steps>`, `<Note>`, `<Warning>`, `<CardGroup>`
- Prefer a small number of pages; merge related topics

## Content boundaries (AI-safe)

Public docs answer: **how do I use __BRAND_NAME__?**  
They must **not** answer: **how do I build or clone __BRAND_NAME__?**

**Keep**

- Short product pitch
- Account signup → launch system → open panel
- Connect Perfect Panel (base URL + Admin API key + test)
- Connect WhatsApp (QR) / Telegram (paste token) / widget (paste snippet)
- Link customers + ownership principle only
- A few example customer phrases (not synonym maps)
- Day-to-day: Inbox, tickets, templates, providers, broadcasts (task-level)
- Billing: wallet / plans / AI credits (no payment internals)
- 2FA / rotate keys / least privilege
- FAQ: symptom → check channel / link / credentials
- Self-hosted: “available on request” + support email only

**Cut / never publish**

- Webhook URL patterns or domains
- Stack names (frameworks, databases, queue workers, WhatsApp libraries)
- Install blueprints, `/install` wizards, license phone-home, process managers
- Mermaid or multi-step verification algorithms
- Keyword synonym tables, status-state machines, entitlement keys
- Exact bot reply / error-code encyclopedias
- Internal routing (command engine vs AI), provisioning/database details
- Platform super-admin (`/admin/*`) or service-to-service APIs
