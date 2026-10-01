#!/usr/bin/env node
/**
 * Reads .env and writes brand fields into docs.json + materializes
 * __BRAND_NAME__ / __APP_URL__ / __SUPPORT_EMAIL__ / __PANEL_CTA_LABEL__
 * placeholders in MDX (avoids MDX parsing {{variables}} as JS expressions).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env');
const docsJsonPath = join(root, 'docs.json');

const defaults = {
  DOCS_BRAND_NAME: 'SMM Panel AI',
  DOCS_APP_URL: 'https://smmpanel-ai.com',
  DOCS_SUPPORT_EMAIL: 'hello@smmpanel-ai.com',
  DOCS_PANEL_CTA_LABEL: 'Open Panel',
};

function parseEnvFile(contents) {
  const out = {};
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function loadEnv() {
  const fromFile = existsSync(envPath)
    ? parseEnvFile(readFileSync(envPath, 'utf8'))
    : {};
  return {
    brandName:
      process.env.DOCS_BRAND_NAME ||
      fromFile.DOCS_BRAND_NAME ||
      defaults.DOCS_BRAND_NAME,
    appUrl:
      process.env.DOCS_APP_URL ||
      fromFile.DOCS_APP_URL ||
      defaults.DOCS_APP_URL,
    supportEmail:
      process.env.DOCS_SUPPORT_EMAIL ||
      fromFile.DOCS_SUPPORT_EMAIL ||
      defaults.DOCS_SUPPORT_EMAIL,
    panelCtaLabel:
      process.env.DOCS_PANEL_CTA_LABEL ||
      fromFile.DOCS_PANEL_CTA_LABEL ||
      defaults.DOCS_PANEL_CTA_LABEL,
  };
}

function walkMdx(dir, out = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (
      ['.git', 'node_modules', '.agents', '.mint', '.cursor', 'scripts'].includes(
        name.name,
      )
    ) {
      continue;
    }
    const p = join(dir, name.name);
    if (name.isDirectory()) walkMdx(p, out);
    else if (extname(name.name) === '.mdx') out.push(p);
  }
  return out;
}

/** Replace materialized values or placeholders with current env values. */
function materializeMdx(contents, env, previous) {
  let s = contents;
  const pairs = [
    ['__BRAND_NAME__', env.brandName],
    ['__APP_URL__', env.appUrl],
    ['__SUPPORT_EMAIL__', env.supportEmail],
    ['__PANEL_CTA_LABEL__', env.panelCtaLabel],
  ];

  // Prefer placeholders when present
  let hadPlaceholder = false;
  for (const [token, value] of pairs) {
    if (s.includes(token)) {
      hadPlaceholder = true;
      s = s.split(token).join(value);
    }
  }
  if (hadPlaceholder) return s;

  // Re-sync previously materialized brand strings when env changes
  if (previous) {
    if (previous.brandName && previous.brandName !== env.brandName) {
      s = s.split(previous.brandName).join(env.brandName);
    }
    if (previous.appUrl && previous.appUrl !== env.appUrl) {
      s = s.split(previous.appUrl).join(env.appUrl);
    }
    if (previous.supportEmail && previous.supportEmail !== env.supportEmail) {
      s = s.split(previous.supportEmail).join(env.supportEmail);
    }
    if (
      previous.panelCtaLabel &&
      previous.panelCtaLabel !== env.panelCtaLabel
    ) {
      s = s.split(previous.panelCtaLabel).join(env.panelCtaLabel);
    }
  }
  return s;
}

const env = loadEnv();
const docs = JSON.parse(readFileSync(docsJsonPath, 'utf8'));
const previous = {
  brandName: docs.variables?.brandName,
  appUrl: docs.variables?.appUrl,
  supportEmail: docs.variables?.supportEmail,
  panelCtaLabel: docs.variables?.panelCtaLabel,
};

docs.name = env.brandName;
docs.navbar = docs.navbar || {};
docs.navbar.links = [
  {
    label: 'Support',
    href: `mailto:${env.supportEmail}`,
  },
];
docs.navbar.primary = {
  type: 'button',
  label: env.panelCtaLabel,
  href: env.appUrl,
};
docs.variables = {
  ...(docs.variables || {}),
  brandName: env.brandName,
  appUrl: env.appUrl,
  supportEmail: env.supportEmail,
  panelCtaLabel: env.panelCtaLabel,
};

writeFileSync(docsJsonPath, `${JSON.stringify(docs, null, 2)}\n`, 'utf8');

let mdxUpdated = 0;
for (const file of walkMdx(root)) {
  const before = readFileSync(file, 'utf8');
  const after = materializeMdx(before, env, previous);
  if (after !== before) {
    writeFileSync(file, after, 'utf8');
    mdxUpdated += 1;
  }
}

console.log(
  `Synced brand → docs.json + ${mdxUpdated} MDX file(s): ${env.brandName} | ${env.appUrl} | ${env.supportEmail}`,
);
