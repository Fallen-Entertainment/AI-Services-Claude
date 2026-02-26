/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface MemoryChunk {
    id: string;
    content: string;
    timestamp: number;
    tokens: number;
    metadata?: Record<string, any>;
}

export class HotMemory {
    private chunks: MemoryChunk[] = [];
    private readonly maxTokens: number = 100000; // ~75k words
    private currentTokens: number = 0;

    add(content: string, metadata?: Record<string, any>): MemoryChunk {
        const chunk: MemoryChunk = {
            id: `hot-${Date.now()}`,
            content,
            timestamp: Date.now(),
            tokens: this.estimateTokens(content),
            metadata
        };

        this.chunks.push(chunk);
        this.currentTokens += chunk.tokens;

        // Auto-evict if over limit
        while (this.currentTokens > this.maxTokens && this.chunks.length > 0) {
            const evicted = this.chunks.shift()!;
            this.currentTokens -= evicted.tokens;
        }

        return chunk;
    }

    get(id: string): MemoryChunk | undefined {
        return this.chunks.find(c => c.id === id);
    }

    getAll(): MemoryChunk[] {
        return [...this.chunks];
    }

    getRecent(count: number): MemoryChunk[] {
        return this.chunks.slice(-count);
    }

    clear(): void {
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

    private estimateTokens(text: string): number {
        // Rough estimation: ~4 chars per token
        return Math.ceil(text.length / 4);
    }

    // Get chunks that should be archived to warm memory
    getArchiveCandidates(maxAge: number = 3600000): MemoryChunk[] {
        const cutoff = Date.now() - maxAge; // Default 1 hour
        return this.chunks.filter(c => c.timestamp < cutoff);
    }

    // Remove specific chunks (after archiving)
    remove(ids: string[]): void {
        const idSet = new Set(ids);
        const removed = this.chunks.filter(c => idSet.has(c.id));
        this.chunks = this.chunks.filter(c => !idSet.has(c.id));
        
        // Recalculate tokens
        this.currentTokens = this.chunks.reduce((sum, c) => sum + c.tokens, 0);
    }
}
