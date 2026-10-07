#!/usr/bin/env node
// Copy this package's skills into an agent's skills directory.
//
//   npx thai-human-communication               # ~/.claude/skills (user scope)
//   npx thai-human-communication --project     # ./.claude/skills (this repo only)
//   npx thai-human-communication --dir <path>  # somewhere explicit
//
// Idempotent: re-running replaces the skill in place. Nothing outside the chosen
// skills directory is written.
'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const SKILLS_SRC = path.join(__dirname, '..', 'skills');

function usage() {
  console.log(`usage: npx thai-human-communication [--project | --dir <path>]

  (default)      install into ~/.claude/skills  (honours CLAUDE_CONFIG_DIR)
  --project      install into ./.claude/skills
  --dir <path>   install into <path>`);
}

let dest = null;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--project') dest = path.join(process.cwd(), '.claude', 'skills');
  else if (a === '--dir') {
    if (!args[i + 1]) { console.error('error: --dir needs a path'); process.exit(2); }
    dest = path.resolve(args[++i]);
  } else if (a === '-h' || a === '--help') { usage(); process.exit(0); }
  else { console.error(`unknown option: ${a}`); usage(); process.exit(2); }
}
if (!dest) {
  const base = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
  dest = path.join(base, 'skills');
}

fs.mkdirSync(dest, { recursive: true });
for (const name of fs.readdirSync(SKILLS_SRC)) {
  const from = path.join(SKILLS_SRC, name);
  if (!fs.statSync(from).isDirectory()) continue;
  const to = path.join(dest, name);
  fs.rmSync(to, { recursive: true, force: true });
  fs.cpSync(from, to, { recursive: true });
  console.log(`→ ${name}`);
}
console.log(`\ninstalled into: ${dest}`);
