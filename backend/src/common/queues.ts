const QUEUE_NAMES: Record<number, string> = {
  400: 'NORMAL DRAFT',
  420: 'RANKED SOLO',
  430: 'NORMAL BLIND',
  440: 'RANKED FLEX',
  450: 'ARAM',
  480: 'SWIFTPLAY',
  490: 'QUICKPLAY',
  700: 'CLASH',
  710: 'RANKED 5S',
  720: 'ARAM CLASH',
  900: 'ARURF',
  1700: 'ARENA',
  1710: 'ARENA (16)',
  1900: 'PICK URF',
};

export function getQueueName(queueId: number): string {
  return QUEUE_NAMES[queueId] ?? 'OTHER';
}
