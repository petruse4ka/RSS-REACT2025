import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { ColumnSelectionState } from '@/types/types';

export const useColumnSelectionStore = create<ColumnSelectionState>()(
  immer((set) => ({
    selectedFields: [],

    setSelectedFields: (fields: string[]) =>
      set((state) => {
        state.selectedFields = fields;
      }),
  }))
);
