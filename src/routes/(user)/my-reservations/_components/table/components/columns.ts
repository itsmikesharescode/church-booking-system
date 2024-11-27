import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { ReservationPageTable } from '../data/schemas';
import {
  DataTableColumnHeader,
  DataTableRowActions,
  TableDeleteRow,
  TableEventDateRow,
  TableStatusRow
} from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<ReservationPageTable, unknown>[] = [
  {
    accessorKey: 'event_name',
    id: 'event_name',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ReservationPageTable, unknown>, {
        column,
        title: 'Event Name'
      });
    },
    cell: ({ row }) => {
      const eventNameSnippet = createRawSnippet<[string]>((getEventName) => {
        return {
          render: () => `<div class="w-full">${getEventName()}</div>`
        };
      });

      return renderSnippet(eventNameSnippet, row.getValue('event_name'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'price',
    id: 'price',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ReservationPageTable, unknown>, {
        column,
        title: 'Status'
      });
    },
    cell: ({ row }) => renderComponent(TableStatusRow, { row }),
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'number_guest',
    id: 'number_guest',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ReservationPageTable, unknown>, {
        column,
        title: 'Number of Guests'
      });
    },
    cell: ({ row }) => {
      const numberGuestSnippet = createRawSnippet<[number]>((getNumberGuest) => {
        return {
          render: () => `<div class="w-full">${getNumberGuest()}</div>`
        };
      });
      return renderSnippet(numberGuestSnippet, row.getValue('number_guest'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'date',
    id: 'date',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ReservationPageTable, unknown>, {
        column,
        title: 'Date'
      });
    },
    cell: ({ row }) => renderComponent(TableEventDateRow, { row }),
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ReservationPageTable, unknown>, {
        column,
        title: 'Created At'
      });
    },
    cell: ({ row }) => {
      const createdAtSnippet = createRawSnippet<[string]>((getCreatedAt) => {
        return {
          render: () => `<div class="w-full">${new Date(getCreatedAt()).toLocaleDateString()}</div>`
        };
      });

      return renderSnippet(createdAtSnippet, row.getValue('created_at'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    id: 'actions',
    cell: ({ row }) => renderComponent(TableDeleteRow, { row })
  }
];
