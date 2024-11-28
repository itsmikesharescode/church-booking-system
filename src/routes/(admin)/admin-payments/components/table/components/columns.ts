import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { PaymentsPageTable } from '../data/schemas';
import { DataTableColumnHeader, TableRowAction } from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<PaymentsPageTable, unknown>[] = [
  {
    accessorKey: 'ref_id',
    id: 'ref_id',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<PaymentsPageTable, unknown>, {
        column,
        title: 'Ref ID'
      });
    },
    cell: ({ row }) => {
      const refIdSnippet = createRawSnippet<[string]>((getRefId) => {
        return {
          render: () => `<div class="w-full">${getRefId()}</div>`
        };
      });

      return renderSnippet(refIdSnippet, row.getValue('ref_id'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'method',
    id: 'method',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<PaymentsPageTable, unknown>, {
        column,
        title: 'Method'
      });
    },
    cell: ({ row }) => {
      const methodSnippet = createRawSnippet<[string]>((getMethod) => {
        return {
          render: () => `<div class="w-full">${getMethod()}</div>`
        };
      });
      return renderSnippet(methodSnippet, row.getValue('method'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'amount',
    id: 'amount',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<PaymentsPageTable, unknown>, {
        column,
        title: 'Amount'
      });
    },
    cell: ({ row }) => {
      const amountSnippet = createRawSnippet<[number]>((getAmount) => {
        return {
          render: () => `<div class="w-full">₱ ${getAmount().toLocaleString()}</div>`
        };
      });
      return renderSnippet(amountSnippet, row.getValue('amount'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<PaymentsPageTable, unknown>, {
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
    cell: ({ row }) => renderComponent(TableRowAction, { row })
  }
];
