# thai-human-communication

An agent skill that makes a coding agent talk **natural Thai, the way a senior Thai
developer talks to a teammate**. Thai is the main language, common technical terms stay
in English, the answer comes first, and the stock AI-assistant phrasing is left out.

> แก้แล้วครับ ปัญหาเกิดจาก `null` จาก API — frontend รอ `[]` เลยพังตอน `.map()`

instead of

> แน่นอนครับ จากการตรวจสอบในเบื้องต้น พบว่ามีหลายปัจจัยที่อาจเกี่ยวข้องกับปัญหาดังกล่าว...

## Install

```bash
npx skills add captainkie/thai-human-communication
```

This uses the [skills CLI](https://skills.sh). It detects your agents (Claude Code,
Cursor, Codex, and others) and asks where to install. Common variants:

```bash
npx skills add captainkie/thai-human-communication -g        # user-level, every project
npx skills add captainkie/thai-human-communication -a claude-code -g -y
npx skills update thai-human-communication                   # pull the latest version
npx skills remove thai-human-communication
```

To install by hand, copy `skills/thai-human-communication/` into `~/.claude/skills/`
for one user or into `.claude/skills/` for one repository.

## What it changes

- **Thai first, with technical terms kept as developers say them.** It writes `API`,
  `migration` and `breaking change`, not formal Thai translations of them.
- **Answer first.** The conclusion comes before the reasoning.
- **No AI-assistant tics.** It drops `แน่นอนครับ`, `ยินดีครับ` and
  `หวังว่าข้อมูลนี้จะเป็นประโยชน์`, and it does not repeat the request back.
- **Quiet while coding.** It reports only when something meaningful happened, and
  ends with a short summary of what changed, how it was tested, and what it affects.
- **Explicit about uncertainty.** It says "ยังไม่ฟันธง" when it cannot confirm
  something, instead of inventing a detail to sound sure.

It changes **communication style only**. It must not hide warnings, skip errors, claim
a test passed, or claim a command ran when it did not.

## Layout

```
skills/thai-human-communication/
  SKILL.md
```

## Licence

MIT. See [`LICENSE`](LICENSE).
