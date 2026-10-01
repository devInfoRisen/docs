# SMM Panel AI documentation

Short operator docs for [SMM Panel AI](https://smmpanel-ai.com). Built with [Mintlify](https://mintlify.com).

Public docs cover **how to use** the product — not how to rebuild it. See [AGENTS.md](./AGENTS.md) for the Keep/Cut policy.

## Brand config

```bash
cp .env.example .env
npm run sync-brand
```

`sync-brand` updates `docs.json` and replaces MDX placeholders `__BRAND_NAME__`, `__APP_URL__`, `__SUPPORT_EMAIL__`, and `__PANEL_CTA_LABEL__`.

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
