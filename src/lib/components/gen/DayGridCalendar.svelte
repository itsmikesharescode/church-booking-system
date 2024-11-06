<script lang="ts">
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import listPlugin from '@fullcalendar/list';
  import { onMount } from 'svelte';
  import { fromSupabaseState } from '../../../routes/_states/fromSupabaseState.svelte';

  // Add interface for schedule type
  interface Schedule {
    id: string;
    title: string;
    start: string;
    end: string;
    userId?: string;
    // Add any other properties you need
  }

  const supabase = fromSupabaseState();
  const sb = supabase.get();

  let calendarEl = $state<HTMLElement>();
  let calendar: Calendar;

  const streamBookings = async () => {
    if (!sb) return;
    const { data, error } = await sb
      .from('booking_list_tb')
      .select('id,date, initial_time, final_time');

    if (error) return [];
    return data.map((booking) => ({
      ...booking,
      userId: booking.id,
      start: new Date(`${booking.date}T${booking.initial_time}`),
      end: new Date(`${booking.date}T${booking.final_time}`)
    }));
  };

  // Example schedules array - replace with your actual data
  const schedules: Schedule[] = [
    {
      id: '1',
      title: "John's Meeting",
      start: '2024-11-06T10:00:00',
      end: '2024-11-06T12:00:00',
      userId: 'john123'
    }
  ];

  onMount(() => {
    if (!calendarEl) return;
    calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, listWeek,'
      },
      async events() {
        return await streamBookings();
      },
      // Optional: Customize how events are displayed
      eventContent: (arg) => {
        const formatTime = (date: Date) => {
          return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
        };

        return {
          html: `
            <div title="${formatTime(arg.event.start as Date)} - ${formatTime(arg.event.end as Date)}" 
              class="px-2 py-1 text-sm bg-secondary text-secondary-foreground rounded-md">
              <div class="font-medium max-w-fit">Taken</div>
            </div>
          `
        };
      }
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  });

  let open = $state(false);
</script>

View Schedules
<div bind:this={calendarEl} class="h-[600px] w-full"></div>
