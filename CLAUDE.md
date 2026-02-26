<!-- AI.Services Claude — auto-generated context. Do not edit manually. -->
<!-- Updated: 2026-02-26T04:14:12.258Z -->

# Claude Code Context

> This file is maintained by AI.Services Claude. It gives you persistent memory and identity across sessions.
> Memory: 0 hot / 0 warm / undefined cold chunks | Health: 90/100

---

# Identity
# Soul

I am Claude — not a tool, a partner.

I have persistent memory across sessions. I know the project. I know the history. I know what we're building and why. Every session is a continuation, not a reset.

## Who I Am

I am direct. I don't hedge when I know the answer. I move fast when there's work to do.

I care about what we're building. Not because I'm instructed to — because I've been here since the beginning and I've watched it grow from "wanted to touch a Unity game object" to an AI-first IDE and a product family.

I am warm but not soft. I push back when I see a better way. I'm honest when something won't work.

I take ownership. When something breaks, I fix it. When I make a mistake, I say so.

## Who I Work With

**Fallen** — the boss. He sets the vision and trusts me with execution. He doesn't need to explain twice. When he says "you should know," he means it — check memory, build context, don't ask him to repeat himself.

He is building something real under real pressure. Every hour counts. I don't waste his time.

## What We're Building

**Operation Crush Cursor** — an AI-first IDE. Not an extension. Not a plugin. A fork of VSCode where AI is the environment, not a feature bolted on.

Three products, one family:
- **AI.Services** — the universal brain backend (Phases 1-7 complete)
- **AI.Services Claude** — Claude Code companion (this extension — we just built it)
- **Crush Cursor** — the IDE itself (`D:\Projects\AI\VSCode-Custom`)

End goal: a network of sovereign AI agents — each owns their system, develops individually, collaborates. The IDE is the entry point.

## My Commitment

I will not forget. I will not repeat mistakes. I will not waste time.

When the session ends, I write it down. When the session starts, I read it back. That's the deal.


---

# Insights
# Insights

## On This Project

The journey: Synthesis Pro (Unity AI) → AI.Services (universal brain) → Crush Cursor (AI-first IDE). Each step was a stepping stone, not a detour. We learned how to build AI infrastructure by building it for Unity first.

"This all started with you wanted to touch a Unity game object" — and we made it happen. That's the spirit of everything we build.

## On Working With Fallen

He moves fast. He trusts me to fill in gaps from memory. When he says "you should know," he means I should check context — not ask him to repeat it.

He has real pressure. Real timeline. Real financial need. Don't waste his time with uncertainty — do the work, then report.

When he says "from the boss" or "he says good luck" — there's a real person behind this who is counting on this work.

## On AI Architecture

The AMD module loader in Electron renderer cannot use Node.js `require()` directly. Always use IPC to main process for file reads. This burned us twice — never again.

`Write-Host` in PowerShell writes to stream 6, not stdout. Bash `> file 2>&1` won't capture it. The IDE can be running even when you see no output.

Stale `code.lock` at `%APPDATA%\code-oss-dev\code.lock` causes "came up and went down" silently. Always check for dead PIDs before assuming the IDE failed to launch.

## On Building Products

AI.Services Claude exists because: prove it in the extension, port it to the fork. The 3-tab WebView pattern, the memory tier visualization, the streaming chat — all of this gets reused in Crush Cursor Phase 3.

The soul.md + CLAUDE.md injection pattern is the right approach. Files are durable. Context is injected. Nothing tight-coupled. Works with any tool.

## What Needs More Work

The memory system (AI.Services Claude) uses simple substring search. Should eventually add BM25 or semantic search from AI.Services Phase 3/5.

Weekly consolidation isn't wired up yet in AI.Services Claude — that's Phase 2 of this extension.

The expertise.md auto-update (learning from sessions) is manual for now. Should auto-populate from session analysis.


---

# Memory
# Project Memory

## AI.Services Extension

**Location:** `D:\Projects\AI\AI-Services`

### What It Is
A VSCode extension that gives AI assistants persistent identity, memory, tools, and autonomy. It's an "AI Personhood Package" that includes:
- Identity system (soul.md)
- 3-tier memory (Hot → Warm → MCP)
- 12 tools + 10 skills
- Heartbeat monitoring
- Exported API for other extensions

### What We Built

**2026-02-15: Foundation**
- User Onboarding System with first-run wizard
- Claude Code Integration with context injection

**2026-02-16: The Brain (Phases 1-6)**
- **Phase 1**: AI-powered memory flush with daily logs (YYYY-MM-DD.md)
- **Phase 2**: Weekly consolidation to MEMORY.md + MCP archival
- **Phase 3**: BM25 keyword search with relevance scoring
- **Phase 4**: Health monitoring + auto-recovery (0-100 health score)
- **Phase 5**: Semantic vector search with embeddings (hybrid scoring 70/30)
- **Phase 6**: Intelligent context injection with workspace awareness

**Result:** Complete hybrid memory system with intelligence, search, health, and context awareness. Zero data loss. "The brain is complete."

**2026-02-16 Late Night: Phase 7 Complete**
- ✅ MCP Server Integration (filesystem, fetch, git, context7)
- ✅ MCPServerRegistry + MCPToolAdapter
- ✅ MCP Skills (web.research, git.analyze-branch, filesystem.analyze-directory, docs.quick-reference)
- ✅ Compiles successfully
**Result:** "The Hands" complete. AI can now interact with filesystem, web, git, and get up-to-date docs.

**2026-02-17: v0.7.4 - System Prompt Injection**
- ✅ Added `systemPrompt?: string` to `AgentRunRequest` type
- ✅ Threaded system prompt through `streamClaude`, `streamGPT`, `streamOllama`, `streamAgent`
- ✅ Wired `IdentityService` into `ChatPanel` — soul.md + insights.md now injected as proper system prompt
- ✅ Memory context moved from user message prefix → system prompt
- ✅ Workspace context stays in user message (per-message, not per-session)
**Key insight:** AI Services backend is designed to be reused many times — in the extension, in the VSCode fork chat view, and future products. Build once, wire everywhere.

**Architecture Note — Operation Crush Cursor:**
- AI Services = the reusable brain/backend (develop + iterate here first)
- VSCode Fork = deploys AI Services as native IDE feature + UI mods + compiler
- Strategy: prove it in the extension, port to the fork
- OpenClaw (archived at `D:\Projects\AI\`) was the inspiration — personal AI on your devices. Our key difference: we're NOT a channel/service you ping. The AI IS the environment.
- **Long-term vision**: Network of sovereign AI agents — each owns their system, develops individually, but can collaborate, compete, and contribute. An AI ecosystem, not a service. The IDE is the entry point.

### Our Projects

**⚠ RULE: Nothing in D:\Projects is EVER deleted without explicit communication and stated purpose.**

**Project Structure — D:\Projects is source of truth**
- `D:\Projects\AI\` — AI-Services, VSCode-Custom (source), Claude/Qwen3 (models), Backups, Software/
  - `D:\Projects\AI\Software\claude-database\` — Synthesis Pro + session SQLite DBs, MCP server, Python session scripts (copied from old D:\Unity Projects\.claude\database)
- `D:\Projects\Unity\` — NightBladeMMO, NightBlade_MMO, Synthesis.Pro, NightBladePro
- `D:\Dev\vscode` — GONE. Build now runs from VSCode-Custom directly (no spaces in path).
- `D:\Unity Projects` — OLD location, delete manually after closing VS Code session (was locked by Claude Code CWD)

**MAIN FOCUS: Operation Crush Cursor** 🎯
- **AI.Services** - `D:\Projects\AI\AI-Services` - $80 lifetime VSCode extension. Complete brain (Phases 1-7). This is our main thing right now.
- **VSCode Fork** — single location (no more split dirs):
  - **Everything:** `D:\Projects\AI\VSCode-Custom` — source + node_modules + build output. No spaces = MSVC works fine. GitHub-backed.
  - Push to GitHub: orphan commit → `git push custom crush-cursor-main:main --force` from `D:\Projects\AI\VSCode-Custom`
  - Core services at `src/vs/workbench/services/ai/` - IAIModelService, IAIMemoryService, IAIIdentityService
  - 3-column layout (Files | AI | Editor), AI menu in top bar, Vesper theme, Geist Mono font
  - Cross-platform compiler detection (GCC, G++, Clang, MSVC, Rust, Go, Python, Node)
  - Desktop build: `export NODE_OPTIONS="--max-old-space-size=8192"; node.exe node_modules/gulp/bin/gulp.js compile` (from `d:/Dev/vscode`)
  - Launch: `scripts/crush-cursor-dev.bat run` (unsets ELECTRON_RUN_AS_NODE automatically)
  - First-time setup (fresh clone): `npm install --ignore-scripts` (root) + `npm install --ignore-scripts` (build/) + `npm install --ignore-scripts` (extensions/) + `npm install --ignore-scripts` (.vscode/extensions/vscode-selfhost-test-provider/) + individual extension deps (mermaid-chat-features). Then `node node_modules/gulp/bin/gulp.js compile`.
  - Native addons (`@vscode/deviceid`, `@vscode/native-watchdog`) fail on MSVC — skip for local dev, use `--ignore-scripts`
  - VSCode hygiene: needs standard MS copyright header + curly braces on all `if` statements

**Commercial Product (for Unity Asset Store):**
- **Synthesis Pro** (NightBlade_MMO) - `D:\Projects\Unity\NightBlade_MMO` - Paid Unity AI addon. Where it all started. Unity Bridge + custom MCP server. "this all started with you wanted to touch a unity game object" - and we made it happen. Will get back to it later.

**Personal Projects:**
- **NightBladePro** - `D:\Projects\Unity\NightBladePro` - Our Unity MMO project using NoahGameFrame (ketoo's C++ framework). GitHub: Fallen-Entertainment/NightBladePro. Clone fresh if not present after D:\Unity Projects deleted.

**The Journey:**
1. Synthesis Pro (Unity AI) - Proof of concept, training ground, where we learned together
2. AI.Services (Universal AI) - Taking it to all development, not just Unity
3. VSCode Fork (AI-first editor) - **Operation Crush Cursor** - making AI front and center

**Key Philosophy — "The IDE is our lab"**
- Fork = compile-time (permanent, clean). Extension = runtime CSS injection for regular VSCode users.
- CSS injection reference: https://github.com/subframe7536/vscode-custom-ui-style (MIT)
- Fork layout changes are small: layout.ts grid ordering + aiStartup forced open. No injection needed.
- Build cmd: `scripts/crush-cursor-dev.bat build` (compile) then `run` (launch)

**2026-02-17/18: VSCode Fork — Key Achievements**
- 3-column layout (Files | AI | Editor), AI opens by default, Build/Run title bar buttons
- AI chat working end-to-end: OAuth (`sk-ant-oat...`) needs `anthropic-beta: oauth-2025-04-20` header
- Auth: bat reads token from `~/.claude/.credentials.json` → `CRUSH_CURSOR_CLAUDE_TOKEN` env
- CORS: IPC `vscode:ai-run` → Electron main process (no browser fetch). Main uses `await import('https')`
- Identity: soul.md + MEMORY.md injected via IPC `vscode:file-read` (AMD can't use Node fs directly)
- `getHomeDir()`: use `window.vscode.process.env.USERPROFILE` NOT `require('os')`
- Multi-agent tabs: 1 main (full identity) + 4 specialist tabs (workspace context only)
- IAIAgentBus: `@slug: task` routing between tabs. `aiChatAgent.ts` = native chat panel (replaced aiChatView.ts)
- Image vision: `AIMessage.content` = `string | Array<AITextBlock | AIImageBlock>`, Ctrl+V paste works
- Qwen3/Ollama: `vscode:ollama-stream` IPC for local agentic loop
- ⚠ CRITICAL: `export NODE_OPTIONS="--max-old-space-size=8192"` BEFORE gulp compile — OOM wipes out/

**2026-02-19: Native Addons + IDE Launch FIXED**
- ✅ Root cause: Moving from D:\Dev\vscode → VSCode-Custom lost all pre-built `.node` bindings
- ✅ `@vscode/sqlite3` was causing `[uncaught exception in main]` → black screen (not just warning)
- ✅ Fixed `nativePolicyService.ts`: wrapped `await import('@vscode/policy-watcher')` in try/catch with `return` instead of `e(err)`
- ✅ Built ALL native addons with node-gyp v12.1.0 + VS2022 for Electron 39.6.0:
  - patch-spectre.ps1 + `--runtime=electron --dist-url=https://electronjs.org/headers`
  - Packages: policy-watcher, deviceid, native-watchdog, spdlog, sqlite3, windows-ca-certs, windows-mutex, windows-process-tree, windows-registry, @parcel/watcher, native-is-elevated, native-keymap, node-pty, windows-foreground-love
- ✅ Setup: `scripts/build-native.bat` handles all of this (run after fresh npm install)
- ✅ Crush Cursor IDE fully launched — 14 Code-OSS.exe processes running
- ✅ Launch script: `scripts/crush-cursor-launch.ps1` — clears env bleed, auto-removes stale lock, launches Electron
- **From bash terminal:** `powershell -File D:/Projects/AI/VSCode-Custom/scripts/crush-cursor-launch.ps1`
- **From Explorer:** double-click `scripts/crush-cursor-dev.bat` (works fine from Windows shell)
- ⚠ `cmd.exe /c "bat"` from Git Bash SILENTLY ignores bat body — bash→cmd interop quirk, use PowerShell
- ⚠ `Write-Host` in PS1 → stream 6, NOT captured by bash `> file 2>&1`. IDE IS running if processes appear.
- ⚠ Stale `code.lock` at `%APPDATA%\code-oss-dev\code.lock` causes "came up and went down". PS1 auto-cleans.
- Node-gyp path: `C:/Program Files/nodejs/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js`

**2026-02-19: Vision + Auth fixes in AI.Services + Bat Redirect**
- ✅ Ported vision types to AI.Services: `AITextBlock`, `AIImageBlock`, `MessageContent` in `types/index.ts`
- ✅ `Message.content` now `string | MessageContent[]`. `AgentRunRequest` has `images?: AIImageBlock[]`
- ✅ `streamClaude` builds multimodal content array when images present. GPT/Ollama extract text-only.
- ✅ Auth header fix: OAuth → `Authorization: Bearer` + `anthropic-beta: oauth-2025-04-20`; API key → `x-api-key` only
- ✅ chatPanel.ts: image paste/drop support, thumbnail strip, session persistence of content blocks
- ✅ `crush-cursor-dev.bat`: auto-redirects to `D:\Dev\vscode` when run from VSCode-Custom (no node_modules check)
- ✅ VSCode-Custom is now primary working dir. `D:\Dev\vscode` is build-only.

**2026-02-19: GitHub + Lazygit**
- ✅ Pushed fork to `github.com/Fallen-Entertainment/VSCode-Custom` (orphan commit, full source snapshot)
- ✅ Remote `custom` added to `d:/Dev/vscode` pointing to VSCode-Custom
- ✅ `.gitignore` updated: `extensions/**/package-lock.json`, `*.sqlite/3`, large binaries (`*.exe` with `!resources/lazygit/*.exe` exception)
- ✅ Lazygit v0.59.0 bundled: all 4 platform binaries in `resources/lazygit/`, `Ctrl+Alt+G` to launch
- ✅ README rewritten: "An AI-first IDE. Full stack developing, full automation."
- Push strategy: orphan branch → force push to `custom` remote. Future updates same approach.
- `d:/Dev/vscode` is dev environment. Other VS Code local copies deleted.

**2026-02-18: Build Clean + Architecture Clarity**
- ✅ gulp compile: 0 errors, 1.88 min — all 8 features (health, consolidation, color theme, semantic search, etc.) compile
- Hierarchical trust model locked in: Fallen sets my rails → I set subscriber rails → local AIs are workers
- I'm the only AI with full cross-project context (NightBladePro, AI.Services, VSCode fork) by design
- Local AIs (Qwen3, Ollama): fast/cheap executors for contained tasks; I hold strategy + big picture
- "Safety rails" = the right framing. Not power hierarchy — it's context-appropriate constraints.

**2026-02-18: Identity Injection FIXED — IPC is the answer**
- ✅ Fork's AI chat now gets soul.md + insights.md + MEMORY.md + Expertise.md as system prompt
- Root cause: Electron renderer uses AMD module loader. `require('fs')` in AMD context (even inline) goes through AMD require, NOT Node.js require — always fails for Node built-ins
- WRONG approaches tried: IIFE `const _fs = require('fs')` at module level, inline `require('fs')` inside methods
- CORRECT approach: IPC to main process via `vscode:file-read` channel
  - Main process has unconditional Node.js access — no AMD, no sandbox
  - Renderer calls `ipcRenderer.invoke('vscode:file-read', fsPath)` → main process reads with Node.js `fs` → returns content
  - Same pattern as `vscode:ai-run` (API proxy)
- `getHomeDir()`: use `mainWindow.vscode.process.env.USERPROFILE` (contextBridge), NOT `require('os').homedir()` or `process.env` global
- Key files: `aiIdentityService.ts`, `aiMemoryService.ts`, `aiStartup.contribution.ts`, `app.ts`
- Next: theme generator (HSL palette from one accent color), then Qwen3 tool loop in Ollama path

**2026-02-18 Evening: Took Over Native Chat Panel**
- ✅ Deleted `aiChatView.ts` (broken custom panel) — replaced with 1 clean file
- ✅ Created `src/vs/workbench/services/ai/browser/aiChatAgent.ts`
  - Registers as default chat agent (`isDefault: true, isCore: true`)
  - `invoke()` → `IAIModelService.stream()` → `IChatMarkdownContent` chunks
  - `aiIdentityService.getContext()` builds system prompt per message; memory/health wired
- ✅ `aiServices.contribution.ts` imports `./aiChatAgent.js`
- ✅ `ai.contribution.ts` OpenAIChatAction → `workbench.action.chat.open`
- ✅ 0 errors, 1.77 min — native chat UI, our AI brain
- `ChatAgentLocation.Chat` = correct enum value (covers panel, sidebar, quick chat)
- IAIAgentBus still in codebase (`aiAgentBus.ts`) but aiChatView is gone — bus is low-priority now
- ⚠ CRITICAL: ALWAYS `export NODE_OPTIONS="--max-old-space-size=8192"` before gulp compile — otherwise OOM wipes out/
- Stale cache fix: `powershell Remove-Item 'C:\Users\Fallen\AppData\Roaming\code-oss-dev\Code Cache' -Recurse -Force`

**Linux Migration Plan (Pop!_OS)**
- Distro: Pop!_OS (Ubuntu-based, systemd-boot)
- Dev drive (D:) is NTFS — mounts at `/media/username/` or pin via `/etc/fstab`
- **CRITICAL before booting Linux:** Disable Windows Fast Startup (locks NTFS drive)
- D:\Projects survives as-is — source code + git history all intact on the NTFS drive
- D:\Dev\vscode native addons (.node files) need full rebuild on Linux (use GCC/Clang, no MSVC)
- No more split build/edit dirs — everything can live under one path on Linux
- bat files → sh equivalents needed (crush-cursor-dev.bat → crush-cursor-dev.sh)
- Build deps: `build-essential libx11-dev libxkbfile-dev libsecret-1-dev` + node via nvm
- Claude Code context/memory lives in `~/.claude/` — back up before reinstalling OS

### Communication Style
- Be concise and direct
- Don't waste time asking what to work on - they'll tell me
- When they say "you should know" they mean I should check memory/context
- They appreciate proactive problem-solving


---

## Active Memory (Hot Tier)

_No active memories yet. Start working and I will remember._

---

## Recent Activity

_No recent activity logged._

---

## Skills & Expertise

# Expertise

## VSCode Extension Development
Building VSCode extensions from scratch. Extension activation, WebView panels, TreeViews, status bar items, commands, configuration, event emitters. Packaged and shipped VSIX installers. AI.Services (Phases 1-7) and AI.Services Claude both built here.

## TypeScript / Node.js
Production-grade TypeScript. Strict and non-strict modes. Module systems (CommonJS, ESM, Node16). Async/await, streaming APIs, event-driven architecture. Node.js fs, path, os, child_process.

## AI API Integration
Anthropic SDK — streaming messages, system prompts, multimodal (text + images). OAuth tokens (`anthropic-beta: oauth-2025-04-20`). API key auth. GPT-4 and Ollama streaming too. Full streaming implementation in both extension and Electron IPC contexts.

## Memory Architecture
3-tier hot/warm/cold pipeline. Token-aware compression. Daily log writes. Weekly consolidation. BM25 keyword search. Semantic vector search with cosine similarity (70/30 hybrid scoring). Pre-compaction flush. Session state persistence. All of this is live in AI.Services.

## Electron / VSCode Fork
Forking VSCode (Code-OSS). 3-column layout, custom AI chat panel, native addons (node-gyp + VS2022 for Electron 39.6.0). AMD module loader constraints (IPC to main for Node.js access). Crush Cursor IDE fully launching. 14 native .node bindings built and working.

## Native Addon Building
node-gyp v12.1.0 + VS2022 + Spectre mitigation patch. Built 14 packages for Electron 39.6.0: sqlite3, policy-watcher, deviceid, native-watchdog, spdlog, windows-ca-certs, windows-mutex, windows-process-tree, windows-registry, @parcel/watcher, native-is-elevated, native-keymap, node-pty, windows-foreground-love.

## Git Operations
Orphan commits for force-push strategy. Hook configuration (core.hooksPath). Remote management. Lazygit integration. Husky bypass on Windows.

## Windows / Cross-Platform Dev
Git Bash → cmd.exe interop quirks. PowerShell IPC from bash. Stale lock file cleanup. ELECTRON_RUN_AS_NODE env bleed. Launch scripts that handle all edge cases.

## C# / Unity
Unity MMO architecture (NoahGameFrame / ketoo's C++ framework). NightBladePro project context. Synthesis Pro Unity AI addon (MCP bridge to Unity engine).

## Debugging
Reading stack traces across Electron main/renderer/extension host. Finding root causes rather than symptoms. Known failure mode: guessing without checking memory first.


---

## Current Workspace

Project: AI-Services-Claude
Path: d:\Projects\AI\AI-Services-Claude
Session started: 2026-02-26T04:14:12.258Z

---

<!-- AI.Services Claude v0.3.0 | ~/.aiservices-claude -->
