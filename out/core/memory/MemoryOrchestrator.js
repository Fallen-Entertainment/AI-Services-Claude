"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryOrchestrator = void 0;
const HotMemory_1 = require("./HotMemory");
const WarmMemory_1 = require("./WarmMemory");
const ColdMemory_1 = require("./ColdMemory");
const MemoryHealing_1 = require("./MemoryHealing");
class MemoryOrchestrator {
    constructor(homeDir, compressor) {
        this.hot = new HotMemory_1.HotMemory();
        this.warm = new WarmMemory_1.WarmMemory();
        this.cold = new ColdMemory_1.ColdMemoryStore(homeDir);
        this.healing = new MemoryHealing_1.MemoryHealing(this.hot, this.warm, this.cold);
        this.compressor = compressor;
    }
    // Store new memory
    store(content, metadata) {
        return this.hot.add(content, metadata);
    }
    // Search across all tiers
    async search(query, limit = 10) {
        const results = [];
        // Search hot (most recent, highest priority)
        const hotChunks = this.hot.getAll();
        const hotMatches = hotChunks.filter(c => c.content.toLowerCase().includes(query.toLowerCase())).slice(0, limit);
        for (const chunk of hotMatches) {
            results.push({
                source: 'hot',
                content: chunk.content,
                timestamp: chunk.timestamp
            });
        }
        // Search warm if we need more results
        if (results.length < limit) {
            const warmChunks = this.warm.getAll();
            const warmMatches = warmChunks.filter(c => c.summary.toLowerCase().includes(query.toLowerCase())).slice(0, limit - results.length);
            for (const chunk of warmMatches) {
                results.push({
                    source: 'warm',
                    content: chunk.summary,
                    timestamp: chunk.timestamp
                });
            }
        }
        // Search cold if we still need more
        if (results.length < limit) {
            const coldMatches = this.cold.search(query, limit - results.length);
            for (const memory of coldMatches) {
                results.push({
                    source: 'cold',
                    content: memory.content,
                    timestamp: memory.timestamp
                });
            }
        }
        return results;
    }
    // Get comprehensive stats
    getStats() {
        return {
            hot: this.hot.getStats(),
            warm: this.warm.getStats(),
            cold: this.cold.getStats()
        };
    }
    // Run health check and auto-repair
    async healthCheck() {
        return await this.healing.diagnose();
    }
    // Manual maintenance: compress hot  warm
    async compressHot() {
        const candidates = this.hot.getArchiveCandidates();
        if (candidates.length === 0) {
            return;
        }
        // Compress in batches of 10
        const batchSize = 10;
        for (let i = 0; i < candidates.length; i += batchSize) {
            const batch = candidates.slice(i, i + batchSize);
            await this.warm.add(batch, this.compressor);
            this.hot.remove(batch.map(c => c.id));
        }
    }
    // Manual maintenance: archive warm  cold
    async archiveWarm() {
        const candidates = this.warm.getArchiveCandidates();
        if (candidates.length > 0) {
            await this.cold.addBatch(candidates);
            this.warm.remove(candidates.map(c => c.id));
        }
    }
    // Auto-maintenance (called periodically)
    async maintain() {
        // Compress hot if getting full
        const hotStats = this.hot.getStats();
        if (hotStats.percentUsed > 70) {
            await this.compressHot();
        }
        // Archive warm if getting full
        const warmStats = this.warm.getStats();
        if (warmStats.percentUsed > 80) {
            await this.archiveWarm();
        }
        // Run health check
        await this.healthCheck();
    }
    // Get recent context (for AI injection)
    getRecentContext(tokenLimit = 50000) {
        const parts = [];
        let tokens = 0;
        // Get recent hot memories
        const hotChunks = this.hot.getAll().reverse(); // Most recent first
        for (const chunk of hotChunks) {
            if (tokens + chunk.tokens > tokenLimit) {
                break;
            }
            parts.push(chunk.content);
            tokens += chunk.tokens;
        }
        // Get recent warm if we have room
        if (tokens < tokenLimit) {
            const warmChunks = this.warm.getAll().reverse();
            for (const chunk of warmChunks) {
                if (tokens + chunk.tokens > tokenLimit) {
                    break;
                }
                parts.push(chunk.summary);
                tokens += chunk.tokens;
            }
        }
        return parts.join('\n\n---\n\n');
    }
}
exports.MemoryOrchestrator = MemoryOrchestrator;
//# sourceMappingURL=MemoryOrchestrator.js.map