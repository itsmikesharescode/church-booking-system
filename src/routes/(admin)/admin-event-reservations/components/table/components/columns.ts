import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { EventReservationPageTable } from '../data/schemas';
import {
  DataTableColumnHeader,
  DataTableRowActions,
  TableCheckbox,
  TableChurchNameRow
} from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';
import { convertTo12HourFormat } from '$lib';

export const columns: ColumnDef<EventReservationPageTable, unknown>[] = [
  /* {
    id: 'select',
    header: ({ table }) =>
      renderComponent(TableCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
        class: 'translate-y-[2px]'
      }),
    cell: ({ row }) =>
      renderComponent(TableCheckbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        'aria-label': 'Select row',
        class: 'translate-y-[2px]'
      }),
    enableSorting: false,
    enableHiding: false
  }, */

  {
    accessorKey: 'status',
    id: 'status',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<EventReservationPageTable, unknown>, {
        column,
        title: 'Status'
      });
    },
    cell: ({ row }) => {
      const statusSnippet = createRawSnippet<[string]>((getStatus) => {
        return {
          render: () => `<div class="w-full">${getStatus()}</div>`
        };
      });
      return renderSnippet(statusSnippet, row.getValue('status'));
    },
    enableSorting: true,
    enableHiding: true
  },
  /* {
    accessorKey: 'event_name',
    id: 'event_name',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<EventReservationPageTable, unknown>, {
        column,
        title: 'Event Name'
      });
    },
    cell: ({ row }) => renderComponent(TableChurchNameRow, { row }),
    enableSorting: true,
    enableHiding: true
  }, */

  {
    accessorKey: 'event_name',
    id: 'event_name',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<EventReservationPageTable, unknown>, {
        column,
        title: 'Event Name'
      });
    },
    cell: ({ row }) => {
      const eventNameSnippet = createRawSnippet<[string]>((getEventName) => {
        return { render: () => `<div class="w-full">${getEventName()}</div>` };
      });
      return renderSnippet(eventNameSnippet, row.getValue('event_name'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'client_name',
    id: 'client_name',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<EventReservationPageTable, unknown>, {
        column,
        title: 'Client Name'
      });
    },
    cell: ({ row }) => {
      const clientNameSnippet = createRawSnippet<[string]>((getClientName) => {
        return { render: () => `<div class="w-full">${getClientName()}</div>` };
      });
      return renderSnippet(clientNameSnippet, row.getValue('client_name'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'price',
    id: 'price',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<EventReservationPageTable, unknown>, {
        column,
        title: 'Price'
      });
    },
    cell: ({ row }) => {
      const priceSnippet = createRawSnippet<[number]>((getPrice) => {
        return {
          render: () =>
            `<div class="w-full"> ${getPrice() ? `₱ ${getPrice().toLocaleString()}` : 'Not available'}</div>`
        };
      });
      return renderSnippet(priceSnippet, row.getValue('price'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'date',
    id: 'date',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<EventReservationPageTable, unknown>, {
        column,
        title: 'EventDate'
      });
    },
    cell: ({ row }) => {
      const dateSnippet = createRawSnippet<[string]>((getDate) => {
        return {
          render: () => `<div class="w-full">${getDate()}</div>`
        };
      });
      return renderSnippet(dateSnippet, row.getValue('date'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'number_of_guests',
    id: 'number_of_guests',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<EventReservationPageTable, unknown>, {
        column,
        title: 'Number of Guests'
      });
    },
    cell: ({ row }) => {
      const numberOfGuestsSnippet = createRawSnippet<[number]>((getNumberOfGuests) => {
        return {
          render: () => `<div class="w-full">${getNumberOfGuests()}</div>`
        };
      });
      return renderSnippet(numberOfGuestsSnippet, row.getValue('number_of_guests'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<EventReservationPageTable, unknown>, {
        column,
        title: 'Created At'
      });
    },
    cell: ({ row }) => {
      const createdAtSnippet = createRawSnippet<[string]>((getCreatedAt) => {
        return {
          render: () =>
            `<div class="w-full">${new Date(getCreatedAt()).toLocaleDateString()} @ ${new Date(getCreatedAt()).toLocaleTimeString()}</div>`
        };
      });

      return renderSnippet(createdAtSnippet, row.getValue('created_at'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    id: 'actions',
    cell: ({ row }) => renderComponent(DataTableRowActions, { row })
  }
];
