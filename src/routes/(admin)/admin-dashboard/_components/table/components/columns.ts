import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { DashboardPageTable } from '../data/schemas';
import {
  DataTableColumnHeader,
  DataTableRowActions,
  TableCheckbox,
  TableChurchNameRow
} from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';
import { convertTo12HourFormat } from '$lib';

export const columns: ColumnDef<DashboardPageTable, unknown>[] = [
  {
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
  },
  {
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<DashboardPageTable, unknown>, {
        column,
        title: 'Church Name'
      });
    },
    cell: ({ row }) => renderComponent(TableChurchNameRow, { row }),
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'open_time',
    accessorFn: (row) =>
      `${convertTo12HourFormat(row.open_time)} - ${convertTo12HourFormat(row.close_time)}`,
    id: 'open_time',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<DashboardPageTable, unknown>, {
        column,
        title: 'Opening Hours'
      });
    },
    cell: ({ row }) => {
      const openTimeSnippet = createRawSnippet<[string]>((getOpenTime) => {
        return {
          render: () => `<div class="w-full">${getOpenTime()}</div>`
        };
      });
      return renderSnippet(openTimeSnippet, row.getValue('open_time'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'description',
    id: 'description',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<DashboardPageTable, unknown>, {
        column,
        title: 'Description'
      });
    },
    cell: ({ row }) => {
      const descriptionSnippet = createRawSnippet<[string]>((getDescription) => {
        return {
          render: () =>
            `<div class="w-[300px] line-clamp-1 cursor-help" title="${getDescription()}">${getDescription()}</div>`
        };
      });
      return renderSnippet(descriptionSnippet, row.getValue('description'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<DashboardPageTable, unknown>, {
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
