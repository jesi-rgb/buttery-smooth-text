export const effectList = {
  effects: {
    'effect-1': { id: 'effect-1', name: 'Texture' },
    'effect-2': { id: 'effect-2', name: 'Glass' },
    'effect-3': { id: 'effect-3', name: 'Metal' },
    'effect-4': { id: 'effect-4', name: 'Motion' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      effectIds: ['effect-1', 'effect-2', 'effect-3', 'effect-4'],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1'],
}
