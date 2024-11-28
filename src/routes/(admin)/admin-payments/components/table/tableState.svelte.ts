import { getContext, setContext } from 'svelte';
import type { PaymentsPageTable } from './data/schemas';

class TableState {
  #activeRow = $state<PaymentsPageTable | null>(null);

  setActiveRow(row: PaymentsPageTable | null) {
    this.#activeRow = row;
  }

  getActiveRow() {
    return this.#activeRow;
  }

  #showView = $state(false);

  setShowView(show: boolean) {
    this.#showView = show;
  }

  getShowView() {
    return this.#showView;
  }

  #showDelete = $state(false);

  setShowDelete(show: boolean) {
    this.#showDelete = show;
  }

  getShowDelete() {
    return this.#showDelete;
  }
}

const TableKey = Symbol('TableState');

export const initTableState = () => {
  return setContext(TableKey, new TableState());
};

export const useTableState = () => {
  return getContext<ReturnType<typeof initTableState>>(TableKey);
};
