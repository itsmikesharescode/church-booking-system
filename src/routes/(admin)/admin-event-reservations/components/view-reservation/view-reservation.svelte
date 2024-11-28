<script lang="ts">
  import { convertTo12HourFormat, getBookingStatus, publicAPIs } from '$lib';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import type { AdminQType } from '$lib/types';
  import { X } from 'lucide-svelte';
  import * as Avatar from '$lib/components/ui/avatar';
  import { useTableState } from '../table/tableState.svelte';

  const tableState = useTableState();
</script>

<AlertDialog.Root open={tableState.getShowView()}>
  <AlertDialog.Content class="flex max-h-screen max-w-[1200px] flex-col gap-[1rem]">
    <button
      onclick={() => {
        tableState.setActiveRow(null);
        tableState.setShowView(false);
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header>
      <AlertDialog.Title>Viewing</AlertDialog.Title>
    </AlertDialog.Header>

    <div class="flex flex-col gap-[0.625rem] overflow-auto px-[1rem]">
      <div class="grid gap-[1rem] lg:grid-cols-2">
        <div class="border-[1px] p-[1rem]">
          <h1 class="text-lg">Client Details</h1>
          <div class="flex flex-col gap-[1rem] p-[1rem]">
            <Avatar.Root class="h-[5rem] w-[5rem] rounded-none">
              <Avatar.Image
                src={publicAPIs(
                  tableState.getActiveRow()?.user_meta_data.avatarLink ?? '',
                  'Profile'
                )}
                alt="userProfile"
              />
              <Avatar.Fallback
                >{tableState.getActiveRow()?.user_meta_data.firstName[0]}</Avatar.Fallback
              >
            </Avatar.Root>
            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Fullname:</p>
              <p>
                {tableState.getActiveRow()?.user_meta_data.firstName}
                {tableState.getActiveRow()?.user_meta_data.middleName}
                {tableState.getActiveRow()?.user_meta_data.lastName}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Gender:</p>
              <p>
                {tableState.getActiveRow()?.user_meta_data.gender}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Birth date:</p>
              <p>
                {tableState.getActiveRow()?.user_meta_data.birthDate}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Email:</p>
              <p>
                {tableState.getActiveRow()?.user_meta_data.email}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Mobile #:</p>
              <p>
                {tableState.getActiveRow()?.user_meta_data.mobileNum}
              </p>
            </div>
          </div>
        </div>
        <div class="border-[1px] p-[1rem]">
          <h1 class="text-lg">Event Details</h1>
          <div class="flex flex-col gap-[1rem] p-[1rem]">
            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Event name:</p>
              <p>
                {tableState.getActiveRow()?.event_name}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Schedule Date:</p>
              <p>
                {tableState.getActiveRow()?.date}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Guest Count:</p>
              <p>
                {tableState.getActiveRow()?.number_of_guests}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Status:</p>
              <span
                class={tableState.getActiveRow()?.price
                  ? 'bg-green-700'
                  : 'bg-red-500  p-[1px] px-[1rem] text-white'}
              >
                {tableState.getActiveRow()?.price ? 'Approved' : 'Pending'}
              </span>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Preview:</p>
              {tableState.getActiveRow()?.preview}
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Price:</p>
              <p>
                {tableState.getActiveRow()?.price ?? 'Not available'}
              </p>
            </div>

            <div class="flex flex-col gap-[0.5rem]">
              <p class="font-semibold">Event Note:</p>
              <pre
                class="max-h-[20dvh] overflow-auto text-wrap p-2 font-sans">{tableState.getActiveRow()
                  ?.event_note}</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="border-[1px] p-[1rem]">
        <h1 class="text-lg">Church Details</h1>
        <div class="flex flex-col gap-[1rem] p-[1rem]">
          <Avatar.Root class="h-[5rem] w-[5rem] rounded-none">
            <Avatar.Image
              src={publicAPIs(tableState.getActiveRow()?.church_data.photo_path ?? '', 'Church')}
              alt="churchPhoto"
            />
            <Avatar.Fallback>{tableState.getActiveRow()?.church_data.name[0]}</Avatar.Fallback>
          </Avatar.Root>
          <div class="flex flex-wrap gap-[0.5rem]">
            <p class="font-semibold">Opening at:</p>
            <p>
              {convertTo12HourFormat(tableState.getActiveRow()?.church_data.open_time ?? '')} ~ {convertTo12HourFormat(
                tableState.getActiveRow()?.church_data.close_time ?? ''
              )}
            </p>
          </div>

          <div class="flex flex-wrap gap-[0.5rem]">
            <p class="font-semibold">Church name:</p>
            <p>
              {tableState.getActiveRow()?.church_data.name}
            </p>
          </div>

          <div class="flex flex-wrap gap-[0.5rem]">
            <p class="font-semibold">Church description:</p>
            <p>
              {tableState.getActiveRow()?.church_data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
