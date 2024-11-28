import { getContext, setContext } from 'svelte';
import type { EventReservationPageTable } from './data/schemas';

class TableState {
  #activeRow = $state<EventReservationPageTable | null>(null);

  setActiveRow(row: EventReservationPageTable | null) {
    this.#activeRow = row;
  }

  getActiveRow() {
    return this.#activeRow;
  }

  #showApprove = $state(false);

  setShowApprove(show: boolean) {
    this.#showApprove = show;
  }

  getShowApprove() {
    return this.#showApprove;
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
