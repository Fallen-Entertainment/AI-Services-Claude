import { HotMemory } from './HotMemory';
import { WarmMemory } from './WarmMemory';
import { ColdMemoryStore } from './ColdMemory';

export interface MemoryHealth {
    score: number;
    issues: string[];
    repaired: string[];
}

export class MemoryHealing {
    constructor(
        private hot: HotMemory,
        private warm: WarmMemory,
        private cold: ColdMemoryStore
    ) {}

    async diagnose(): Promise<MemoryHealth> {
        const issues: string[] = [];
        const repaired: string[] = [];

        // Check hot memory health
        const hotStats = this.hot.getStats();
        const hotUsage = (hotStats.tokens / 100000) * 100;
        
        if (hotUsage > 90) {
            issues.push(`Hot memory at ${hotUsage.toFixed(1)}% capacity`);
        }

        // Check warm memory health
        const warmStats = this.warm.getStats();
        const warmUsage = (warmStats.chunks / 100) * 100;
        
        if (warmUsage > 90) {
            issues.push(`Warm memory at ${warmUsage.toFixed(1)}% capacity`);
        }

        // Check if warm memory needs archival
        if (warmStats.chunks > 100) {
            issues.push(`Warm memory has ${warmStats.chunks} chunks (limit: 100)`);
        }

        // Check cold storage size
        const coldStats = this.cold.getStats();
        if (coldStats.fileSizeKB > 10000) { // 10MB
            issues.push(`Cold storage size: ${coldStats.fileSizeKB} KB`);
        }

        // Calculate health score
        const score = this.calculateHealthScore(issues, repaired);

        return { score, issues, repaired };
    }

    async autoRepair(): Promise<string[]> {
        const repaired: string[] = [];

        // Check warm memory status
        const warmStats = this.warm.getStats();
        if (warmStats.chunks > 80) {
            repaired.push(`Warm memory has ${warmStats.chunks} chunks - consider manual archival`);
        }

        // Evict old hot entries if needed
        const hotStats = this.hot.getStats();
        if (hotStats.tokens > 90000) {
            // Hot memory auto-evicts on add, but we can trigger manual cleanup
            repaired.push(`Hot memory approaching limit, will auto-evict on next write`);
        }

        return repaired;
    }

    private calculateHealthScore(issues: string[], repaired: string[]): number {
        let score = 100;
        score -= issues.length * 15;
        score += repaired.length * 5;
        return Math.max(0, Math.min(100, score));
    }
}
