export interface IDream {
  dreamId: string;
  title: string;
  content: string;
  category: string;
  type: DreamType;
}

export type DreamType = 'NIGHTMARE' | 'NOT_NIGHTMARE';
