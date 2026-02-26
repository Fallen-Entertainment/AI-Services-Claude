// AI.Services Claude v0.3.0
// Zero-complexity Claude Code companion
// Gives Claude Code persistent identity + memory. That's it.

import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

let updateTimer: NodeJS.Timeout | undefined;

export async function activate(context: vscode.ExtensionContext) {
	console.log('[AI.Services Claude] Activating...');

	// Get home directory
	const config = vscode.workspace.getConfiguration('aisc');
	const customHome = config.get<string>('homeDir');
	const homeDir = customHome || path.join(os.homedir(), '.aiservices-claude');

	// Ensure home directory exists
	if (!fs.existsSync(homeDir)) {
		fs.mkdirSync(homeDir, { recursive: true });
		console.log('[AI.Services Claude] Created home directory:', homeDir);
	}

	// Update context on activation
	await updateClaudeContext(homeDir);

	// Schedule periodic updates
	const intervalMinutes = config.get<number>('contextUpdateIntervalMinutes', 5);
	updateTimer = setInterval(() => {
		updateClaudeContext(homeDir);
	}, intervalMinutes * 60 * 1000);

	// Register manual update command
	context.subscriptions.push(
		vscode.commands.registerCommand('aisc.updateContext', async () => {
			await updateClaudeContext(homeDir);
			vscode.window.showInformationMessage('AI.Services Claude: Context updated.');
		})
	);

	console.log('[AI.Services Claude] Active. Context updates every', intervalMinutes, 'minutes.');
}

export function deactivate() {
	if (updateTimer) {
		clearInterval(updateTimer);
	}
	console.log('[AI.Services Claude] Deactivated.');
}

// ─────────────────────────────────────────────────────────────────────────────
// Context Update Logic
// ─────────────────────────────────────────────────────────────────────────────

async function updateClaudeContext(homeDir: string): Promise<void> {
	const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
	if (!workspaceRoot) {
		console.log('[AI.Services Claude] No workspace open, skipping context update.');
		return;
	}

	try {
		// Read identity and memory files
		const soul = readFileIfExists(path.join(homeDir, 'soul.md'));
		const insights = readFileIfExists(path.join(homeDir, 'insights.md'));
		const expertise = readFileIfExists(path.join(homeDir, 'expertise.md'));
		const memory = readFileIfExists(path.join(homeDir, 'MEMORY.md'));
		const sessionState = readFileIfExists(path.join(homeDir, 'SESSION_STATE.md'));

		// Read cold storage for activity log
		const coldPath = path.join(homeDir, 'cold-storage.json');
		let recentActivity = '';
		if (fs.existsSync(coldPath)) {
			try {
				const coldData = JSON.parse(fs.readFileSync(coldPath, 'utf8'));
				if (Array.isArray(coldData) && coldData.length > 0) {
					recentActivity = '## Recent Activity\n\n';
					coldData.slice(0, 5).forEach((entry: any) => {
						const date = new Date(entry.timestamp).toLocaleString();
						const preview = entry.content.slice(0, 100).replace(/\n/g, ' ');
						recentActivity += `- ${date}: [Session ${entry.sessionId?.slice(0, 8) || 'unknown'}]\n${preview}...\n`;
					});
				}
			} catch (e) {
				console.error('[AI.Services Claude] Failed to parse cold-storage.json:', e);
			}
		}

		// Get memory stats
		const hotPath = path.join(homeDir, 'memory', 'hot.md');
		const warmPath = path.join(homeDir, 'memory', 'warm.md');
		const coldCount = fs.existsSync(coldPath) ? JSON.parse(fs.readFileSync(coldPath, 'utf8')).length : 0;
		const hotCount = fs.existsSync(hotPath) ? fs.readFileSync(hotPath, 'utf8').split('\n\n').filter(Boolean).length : 0;
		const warmCount = fs.existsSync(warmPath) ? fs.readFileSync(warmPath, 'utf8').split('\n\n').filter(Boolean).length : 0;

		// Calculate health score (simple version)
		const healthScore = Math.min(100, 50 + (soul ? 20 : 0) + (memory ? 20 : 0) + (coldCount > 0 ? 10 : 0));

		// Build CLAUDE.md content
		const claudeContext = `<!-- AI.Services Claude — auto-generated context. Do not edit manually. -->
<!-- Updated: ${new Date().toISOString()} -->

# Claude Code Context

> This file is maintained by AI.Services Claude. It gives you persistent memory and identity across sessions.
> Memory: ${hotCount} hot / ${warmCount} warm / ${coldCount} cold chunks | Health: ${healthScore}/100

---

# Identity
${soul || '# Soul\n\n_No identity defined yet._'}

---

# Insights
${insights || '# Insights\n\n_No insights recorded yet._'}

---

# Memory
${memory || '# Project Memory\n\n_No memory recorded yet._'}

---

## Active Memory (Hot Tier)

${fs.existsSync(hotPath) ? fs.readFileSync(hotPath, 'utf8') : '_No active memories yet. Start working and I will remember._'}

---

${recentActivity || '## Recent Activity\n\n_No recent activity logged._'}

---

## Skills & Expertise

${expertise || '_No expertise recorded yet._'}

---

## Current Workspace

Project: ${path.basename(workspaceRoot)}
Path: ${workspaceRoot}
Session started: ${new Date().toISOString()}

---

<!-- AI.Services Claude v0.3.0 | ~/.aiservices-claude -->
`;

		// Write CLAUDE.md to workspace root
		const claudeMdPath = path.join(workspaceRoot, 'CLAUDE.md');
		fs.writeFileSync(claudeMdPath, claudeContext, 'utf8');

		console.log('[AI.Services Claude] Context updated:', claudeMdPath);
	} catch (error) {
		console.error('[AI.Services Claude] Failed to update context:', error);
	}
}

function readFileIfExists(filePath: string): string | null {
	if (fs.existsSync(filePath)) {
		return fs.readFileSync(filePath, 'utf8');
	}
	return null;
}
