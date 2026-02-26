/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as fs from 'fs';
import * as path from 'path';
import { CompressedChunk } from './WarmMemory';

export interface ColdMemory {
    id: string;
    content: string;
    timestamp: number;
    metadata?: Record<string, any>;
}

export class ColdMemoryStore {
    private storagePath: string;
    private memories: ColdMemory[] = [];

    constructor(homeDir: string) {
        this.storagePath = path.join(homeDir, 'cold-storage.json');
        this.load();
    }

    async add(chunk: CompressedChunk): Promise<void> {
        const memory: ColdMemory = {
            id: chunk.id,
            content: chunk.summary,
            timestamp: chunk.timestamp,
            metadata: {
                ...chunk.metadata,
                originalIds: chunk.originalIds
            }
        };

        this.memories.push(memory);
        await this.save();
    }

    async addBatch(chunks: CompressedChunk[]): Promise<void> {
        for (const chunk of chunks) {
            const memory: ColdMemory = {
                id: chunk.id,
                content: chunk.summary,
                timestamp: chunk.timestamp,
                metadata: {
                    ...chunk.metadata,
                    originalIds: chunk.originalIds
                }
            };
            this.memories.push(memory);
        }
        await this.save();
    }

    search(query: string, limit: number = 10): ColdMemory[] {
        // Simple keyword search (can be enhanced with embeddings later)
        const queryLower = query.toLowerCase();
        const scored = this.memories.map(m => ({
            memory: m,
            score: this.calculateRelevance(m.content.toLowerCase(), queryLower)
        }));

        return scored
            .filter(s => s.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(s => s.memory);
    }

    getAll(): ColdMemory[] {
        return [...this.memories];
    }

    getRecent(count: number): ColdMemory[] {
        return this.memories.slice(-count);
    }

    getStats() {
        return {
            memories: this.memories.length,
            oldestTimestamp: this.memories[0]?.timestamp,
            newestTimestamp: this.memories[this.memories.length - 1]?.timestamp,
            storagePath: this.storagePath,
            fileSizeKB: this.getFileSize()
        };
    }

    private load(): void {
        try {
            if (fs.existsSync(this.storagePath)) {
                const data = JSON.parse(fs.readFileSync(this.storagePath, 'utf8'));
                this.memories = data.memories || [];
            }
        } catch (error) {
            console.error('Failed to load cold storage:', error);
            this.memories = [];
        }
    }

    private async save(): Promise<void> {
        try {
            const dir = path.dirname(this.storagePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            const data = {
                memories: this.memories,
                lastSaved: new Date().toISOString()
            };

            fs.writeFileSync(this.storagePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            console.error('Failed to save cold storage:', error);
            throw error;
        }
    }

    private calculateRelevance(content: string, query: string): number {
        // Simple keyword matching score
        const words = query.split(/\s+/);
        let score = 0;
        
        for (const word of words) {
            if (word.length < 3) { continue; }
            const count = (content.match(new RegExp(word, 'g')) || []).length;
            score += count;
        }

        return score;
    }

    private getFileSize(): number {
        try {
            if (fs.existsSync(this.storagePath)) {
                const stats = fs.statSync(this.storagePath);
                return Math.round(stats.size / 1024);
            }
        } catch (error) {
            // Ignore
        }
        return 0;
    }
}
