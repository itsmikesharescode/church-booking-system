import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { ManageUserPageTable } from '../data/schemas';
import { DataTableColumnHeader, DataTableRowActions } from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<ManageUserPageTable, unknown>[] = [
  {
    accessorKey: 'email',
    id: 'email',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ManageUserPageTable, unknown>, {
        column,
        title: 'Email'
      });
    },
    cell: ({ row }) => {
      const emailSnippet = createRawSnippet<[string]>((getEmail) => {
        return {
          render: () => `<div class="w-full">${getEmail()}</div>`
        };
      });

      return renderSnippet(emailSnippet, row.getValue('email'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'client_name',
    id: 'client_name',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ManageUserPageTable, unknown>, {
        column,
        title: 'Client Name'
      });
    },
    cell: ({ row }) => {
      const clientNameSnippet = createRawSnippet<[string]>((getClientName) => {
        return {
          render: () => `<div class="w-full">${getClientName()}</div>`
        };
      });
      return renderSnippet(clientNameSnippet, row.getValue('client_name'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'mobile_number',
    id: 'mobile_number',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ManageUserPageTable, unknown>, {
        column,
        title: 'Number of Guests'
      });
    },
    cell: ({ row }) => {
      const mobileNumberSnippet = createRawSnippet<[string]>((getMobileNumber) => {
        return {
          render: () => `<div class="w-full">${getMobileNumber()}</div>`
        };
      });
      return renderSnippet(mobileNumberSnippet, row.getValue('mobile_number'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'gender',
    id: 'gender',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ManageUserPageTable, unknown>, {
        column,
        title: 'Gender'
      });
    },
    cell: ({ row }) => {
      const genderSnippet = createRawSnippet<[string]>((getGender) => {
        return {
          render: () => `<div class="w-full">${getGender()}</div>`
        };
      });
      return renderSnippet(genderSnippet, row.getValue('gender'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'birthdate',
    id: 'birthdate',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ManageUserPageTable, unknown>, {
        column,
        title: 'Birthdate'
      });
    },
    cell: ({ row }) => {
      const birthdateSnippet = createRawSnippet<[string]>((getBirthdate) => {
        return {
          render: () => `<div class="w-full">${getBirthdate()}</div>`
        };
      });
      return renderSnippet(birthdateSnippet, row.getValue('birthdate'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<ManageUserPageTable, unknown>, {
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
    cell: ({ row }) => renderComponent(DataTableRowActions, { row })
  }
];
