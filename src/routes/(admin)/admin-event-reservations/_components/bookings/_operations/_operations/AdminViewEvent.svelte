<script lang="ts">
  import { convertTo12HourFormat, getBookingStatus, publicAPIs } from '$lib';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import type { AdminQType } from '$lib/types';
  import { X } from 'lucide-svelte';
  import * as Avatar from '$lib/components/ui/avatar';

  interface Props {
    viewSignal: boolean;
    booking: AdminQType['bookings'][number];
  }

  let { viewSignal = $bindable(), ...props }: Props = $props();
</script>

<AlertDialog.Root bind:open={viewSignal}>
  <AlertDialog.Content class="flex max-h-screen max-w-[1200px] flex-col gap-[1rem]">
    <button
      onclick={() => {
        viewSignal = false;
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
                src={publicAPIs(props.booking.user_data.user_meta_data.avatarLink, 'Profile')}
                alt="userProfile"
              />
              <Avatar.Fallback
                >{props.booking.user_data.user_meta_data.firstName[0]}</Avatar.Fallback
              >
            </Avatar.Root>
            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Fullname:</p>
              <p>
                {props.booking.user_data.user_meta_data.firstName}
                {props.booking.user_data.user_meta_data.middleName}
                {props.booking.user_data.user_meta_data.lastName}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Gender:</p>
              <p>
                {props.booking.user_data.user_meta_data.gender}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Birth date:</p>
              <p>
                {props.booking.user_data.user_meta_data.birthDate}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Email:</p>
              <p>
                {props.booking.user_data.user_meta_data.email}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Mobile #:</p>
              <p>
                {props.booking.user_data.user_meta_data.mobileNum}
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
                {props.booking.event_name}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Schedule Date:</p>
              <p>
                {props.booking.date}
                {convertTo12HourFormat(props.booking.initial_time)}
                {convertTo12HourFormat(props.booking.final_time)}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Guest Count:</p>
              <p>
                {props.booking.number_guest}
              </p>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Status:</p>
              <span
                class="{props.booking.price
                  ? 'bg-green-700'
                  : 'bg-red-500'}  p-[1px] px-[1rem] text-white"
              >
                {props.booking.price ? 'Approved' : 'Pending'}
              </span>
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Preview:</p>
              {getBookingStatus(
                `${props.booking.date}/${props.booking.initial_time}/${props.booking.final_time}`
              )}
            </div>

            <div class="flex flex-wrap gap-[0.5rem]">
              <p class="font-semibold">Price:</p>
              <p>
                {props.booking.price ?? 'Not available'}
              </p>
            </div>

            <div class="flex flex-col gap-[0.5rem]">
              <p class="font-semibold">Event Note:</p>
              <pre class="max-h-[20dvh] overflow-auto text-wrap p-2 font-sans">{props.booking
                  .event_note}</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="border-[1px] p-[1rem]">
        <h1 class="text-lg">Church Details</h1>
        <div class="flex flex-col gap-[1rem] p-[1rem]">
          <Avatar.Root class="h-[5rem] w-[5rem] rounded-none">
            <Avatar.Image
              src={publicAPIs(props.booking.church_data.photo_path, 'Church')}
              alt="churchPhoto"
            />
            <Avatar.Fallback>{props.booking.user_data.user_meta_data.firstName[0]}</Avatar.Fallback>
          </Avatar.Root>
          <div class="flex flex-wrap gap-[0.5rem]">
            <p class="font-semibold">Opening at:</p>
            <p>
              {convertTo12HourFormat(props.booking.church_data.open_time)} ~ {convertTo12HourFormat(
                props.booking.church_data.close_time
              )}
            </p>
          </div>

          <div class="flex flex-wrap gap-[0.5rem]">
            <p class="font-semibold">Church name:</p>
            <p>
              {props.booking.church_data.name}
            </p>
          </div>

          <div class="flex flex-wrap gap-[0.5rem]">
            <p class="font-semibold">Church description:</p>
            <p>
              {props.booking.church_data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
