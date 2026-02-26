"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryHealing = void 0;
class MemoryHealing {
    constructor(hot, warm, cold) {
        this.hot = hot;
        this.warm = warm;
        this.cold = cold;
    }
    async diagnose() {
        const issues = [];
        const repaired = [];
        // Check hot memory health
        const hotStats = this.hot.getStats();
        const hotUsage = (hotStats.tokens / 100000) * 100;
        if (hotUsage > 90) {
            issues.push(Hot, memory, at % capacity);
        }
        // Check warm memory health
        const warmStats = this.warm.getStats();
        const warmUsage = (warmStats.chunks / 100) * 100;
        if (warmUsage > 90) {
            issues.push(Warm, memory, at % capacity);
        }
        // Auto-archive if needed
        if (warmStats.chunks > 100) {
            const archived = await this.warm.archiveToCold(this.cold);
            if (archived > 0) {
                repaired.push(Archived, warm, chunks, to, cold, storage);
            }
        }
        // Check cold storage size
        const coldStats = await this.cold.getStats();
        if (coldStats.sizeKB > 10000) { // 10MB
            issues.push(Cold, storage, size, KB);
        }
        // Calculate health score
        const score = this.calculateHealthScore(issues, repaired);
        return { score, issues, repaired };
    }
    async autoRepair() {
        const repaired = [];
        // Archive warm to cold if needed
        const warmStats = this.warm.getStats();
        if (warmStats.chunks > 80) {
            const archived = await this.warm.archiveToCold(this.cold);
            if (archived > 0) {
                repaired.push(Auto - archived, chunks, from, warm, to, cold);
            }
        }
        // Evict old hot entries if needed
        const hotStats = this.hot.getStats();
        if (hotStats.tokens > 90000) {
            // Hot memory auto-evicts on add, but we can trigger manual cleanup
            repaired.push(Hot, memory, approaching, limit, will, auto - evict, on, next, write);
        }
        return repaired;
    }
    calculateHealthScore(issues, repaired) {
        let score = 100;
        score -= issues.length * 15;
        score += repaired.length * 5;
        return Math.max(0, Math.min(100, score));
    }
}
exports.MemoryHealing = MemoryHealing;
//# sourceMappingURL=MemoryHealing.js.map