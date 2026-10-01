# SMMPANEL AI documentation

Short operator docs for [SMMPANEL AI](https://smmpanel-ai.com). Built with [Mintlify](https://mintlify.com).

Public docs cover **how to use** the product — not how to rebuild it. See [AGENTS.md](./AGENTS.md) for the Keep/Cut policy.

## Brand config

Set brand name, navbar links, and content variables in [`docs.json`](./docs.json):

- `name` — site title / navbar brand text source
- `navbar` — Support + Open Panel links
- `variables` — Mintlify build-time values (`brandName`, `appUrl`, `supportEmail`, `supportUrl`, `panelCtaLabel`)

In MDX you can use `{{brandName}}`, `{{appUrl}}`, etc. Prefer plain text for simple copy so local `mint validate` stays clean.

## Development

```bash
npm i -g mint
npm run dev
```

Preview at `http://localhost:3000`.

- `npm run validate`
- `npm run broken-links`

## Pages

| Page | Purpose |
|------|---------|
| Home / Introduction / Quick start | Pitch and go-live |
| Account and billing | Signup, systems, wallet, invites |
| Connect panel / Channels / Customers / Commands | Setup |
| Day-to-day / AI support / Security | Ops |
| FAQ | Short fixes |

## Publishing

Install the Mintlify GitHub app from your [dashboard](https://dashboard.mintlify.com/settings/organization/github-app). Pushes to the default branch deploy automatically.
