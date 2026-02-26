"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarmMemory = void 0;
class WarmMemory {
    constructor() {
        this.chunks = [];
        this.maxChunks = 100;
    }
    async add(hotChunks, compress) {
        // Combine content from multiple hot chunks
        const combined = hotChunks.map(c => c.content).join('\n\n');
        // Compress using AI (passed in as dependency)
        const summary = await compress(combined);
        const chunk = {
            id: `warm-${Date.now()}`,
            summary,
            originalIds: hotChunks.map(c => c.id),
            timestamp: Date.now(),
            tokens: this.estimateTokens(summary),
            metadata: {
                originalTokens: hotChunks.reduce((sum, c) => sum + c.tokens, 0),
                compressionRatio: summary.length / combined.length
            }
        };
        this.chunks.push(chunk);
        // Auto-evict oldest if over limit
        while (this.chunks.length > this.maxChunks) {
            this.chunks.shift();
        }
        return chunk;
    }
    getAll() {
        return [...this.chunks];
    }
    getRecent(count) {
        return this.chunks.slice(-count);
    }
    clear() {
        this.chunks = [];
    }
    getStats() {
        return {
            chunks: this.chunks.length,
            maxChunks: this.maxChunks,
            percentUsed: Math.round((this.chunks.length / this.maxChunks) * 100),
            totalTokens: this.chunks.reduce((sum, c) => sum + c.tokens, 0),
            oldestTimestamp: this.chunks[0]?.timestamp,
            newestTimestamp: this.chunks[this.chunks.length - 1]?.timestamp
        };
    }
    estimateTokens(text) {
        return Math.ceil(text.length / 4);
    }
    // Get chunks that should be archived to cold storage
    getArchiveCandidates(maxCount = 20) {
        if (this.chunks.length <= maxCount) {
            return [];
        }
        return this.chunks.slice(0, this.chunks.length - maxCount);
    }
    // Remove specific chunks (after archiving to cold)
    remove(ids) {
        const idSet = new Set(ids);
        this.chunks = this.chunks.filter(c => !idSet.has(c.id));
    }
}
exports.WarmMemory = WarmMemory;
//# sourceMappingURL=WarmMemory.js.map