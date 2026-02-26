"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColdMemoryStore = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ColdMemoryStore {
    constructor(homeDir) {
        this.memories = [];
        this.storagePath = path.join(homeDir, 'cold-storage.json');
        this.load();
    }
    async add(chunk) {
        const memory = {
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
    async addBatch(chunks) {
        for (const chunk of chunks) {
            const memory = {
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
    search(query, limit = 10) {
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
    getAll() {
        return [...this.memories];
    }
    getRecent(count) {
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
    load() {
        try {
            if (fs.existsSync(this.storagePath)) {
                const data = JSON.parse(fs.readFileSync(this.storagePath, 'utf8'));
                this.memories = data.memories || [];
            }
        }
        catch (error) {
            console.error('Failed to load cold storage:', error);
            this.memories = [];
        }
    }
    async save() {
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
        }
        catch (error) {
            console.error('Failed to save cold storage:', error);
            throw error;
        }
    }
    calculateRelevance(content, query) {
        // Simple keyword matching score
        const words = query.split(/\s+/);
        let score = 0;
        for (const word of words) {
            if (word.length < 3) {
                continue;
            }
            const count = (content.match(new RegExp(word, 'g')) || []).length;
            score += count;
        }
        return score;
    }
    getFileSize() {
        try {
            if (fs.existsSync(this.storagePath)) {
                const stats = fs.statSync(this.storagePath);
                return Math.round(stats.size / 1024);
            }
        }
        catch (error) {
            // Ignore
        }
        return 0;
    }
}
exports.ColdMemoryStore = ColdMemoryStore;
//# sourceMappingURL=ColdMemory.js.map