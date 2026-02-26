# AI.Services Claude

**Claude Code is powerful but stateless. AI.Services Claude gives it a brain.**

Persistent memory, identity, and a real UI — all living quietly alongside Claude Code, injecting context automatically so every session picks up where the last one left off.

---

## What It Does

| Feature | Description |
|---------|-------------|
| 🧠 **Persistent Memory** | 3-tier hot/warm/cold pipeline. Nothing is forgotten. |
| 🪞 **Identity** | `soul.md` and `expertise.md` define who Claude is across sessions. |
| 💬 **Chat Panel** | Direct chat with full memory and identity context injected. |
| 📋 **CLAUDE.md Injection** | Auto-writes context to every workspace so Claude Code loads it on startup. |
| ❤️ **Health Monitoring** | Real-time health score, checks, and self-test. |
| 📝 **Daily Logs** | Every session leaves a log. Browse and search from the panel. |

---

## Quick Start

1. Install the extension
2. Open the **brain icon** in the activity bar
3. Set your Anthropic API key: `Cmd/Ctrl+,` → search `aisc.anthropicApiKey`
4. Open any workspace — CLAUDE.md is written automatically
5. Chat, search memory, view health — all from one panel

---

## The Panel

Three tabs. Everything you need.

**Memory** — tier progress bars, recent memory cards, search, daily log viewer, flush button.

**Identity** — health score, soul.md viewer (edit in-place), expertise skills, self-test.

**Chat** — streaming conversation with full memory and identity context.

---

## Storage

All files live in `~/.aiservices-claude/`. Nothing in your workspace except `CLAUDE.md`.

```
~/.aiservices-claude/
  soul.md          — who Claude is
  insights.md      — what Claude has learned
  MEMORY.md        — consolidated long-term memory
  expertise.md     — skills and capabilities
  cold-storage.json
  memory/
    YYYY-MM-DD.md  — daily logs
```

---

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `aisc.anthropicApiKey` | `""` | API key for chat + memory ops |
| `aisc.claudeModel` | `claude-opus-4-5` | Model for chat |
| `aisc.contextUpdateIntervalMinutes` | `5` | How often CLAUDE.md refreshes |
| `aisc.hotMemoryLimitTokens` | `200000` | Hot tier limit before flush |
| `aisc.enableHeartbeat` | `true` | Session state writes every 5 min |

---

## Part of the AI.Services Family

- **AI.Services** — universal version, all models
- **AI.Services Claude** — this extension, Claude Code companion
- More adapters coming

---

*Built by Fallen Entertainment. $40 lifetime.*
