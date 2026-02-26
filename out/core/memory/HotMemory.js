"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotMemory = void 0;
class HotMemory {
    constructor() {
        this.chunks = [];
        this.maxTokens = 100000; // ~75k words
        this.currentTokens = 0;
    }
    add(content, metadata) {
        const chunk = {
            id: hot--,
            content,
            timestamp: Date.now(),
            tokens: this.estimateTokens(content),
            metadata
        };
        this.chunks.push(chunk);
        this.currentTokens += chunk.tokens;
        // Auto-evict if over limit
        while (this.currentTokens > this.maxTokens && this.chunks.length > 0) {
            const evicted = this.chunks.shift();
            this.currentTokens -= evicted.tokens;
        }
        return chunk;
    }
    get(id) {
        return this.chunks.find(c => c.id === id);
    }
    getAll() {
        return [...this.chunks];
    }
    getRecent(count) {
        return this.chunks.slice(-count);
    }
    clear() {
        this.chunks = [];
        this.currentTokens = 0;
    }
    getStats() {
        return {
            chunks: this.chunks.length,
            tokens: this.currentTokens,
            maxTokens: this.maxTokens,
            percentUsed: Math.round((this.currentTokens / this.maxTokens) * 100),
            oldestTimestamp: this.chunks[0]?.timestamp,
            newestTimestamp: this.chunks[this.chunks.length - 1]?.timestamp
        };
    }
    estimateTokens(text) {
        // Rough estimation: ~4 chars per token
        return Math.ceil(text.length / 4);
    }
    // Get chunks that should be archived to warm memory
    getArchiveCandidates(maxAge = 3600000) {
        const cutoff = Date.now() - maxAge; // Default 1 hour
        return this.chunks.filter(c => c.timestamp < cutoff);
    }
    // Remove specific chunks (after archiving)
    remove(ids) {
        const idSet = new Set(ids);
        const removed = this.chunks.filter(c => idSet.has(c.id));
        this.chunks = this.chunks.filter(c => !idSet.has(c.id));
        // Recalculate tokens
        this.currentTokens = this.chunks.reduce((sum, c) => sum + c.tokens, 0);
    }
}
exports.HotMemory = HotMemory;
//# sourceMappingURL=HotMemory.js.map