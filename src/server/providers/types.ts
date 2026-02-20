export interface EventProvider { ingestEvents(): Promise<void>; }
export interface MatchProvider { ingestMatches(): Promise<void>; }
export interface StatProvider { ingestStats(): Promise<void>; }
