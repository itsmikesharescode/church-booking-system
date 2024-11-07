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
        right: 'dayGridMonth timeGridWeek listWeek'
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
              class="px-2 py-1 text-sm bg-primary text-primary-foreground rounded-md shadow-sm hover:shadow">
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

<div class="calendar-wrapper">
  <div bind:this={calendarEl} class="h-[600px] w-full"></div>
</div>

<style lang="postcss">
  /* Calendar wrapper styles */
  :global(.calendar-wrapper) {
    /* Light mode variables */
    --fc-border-color: hsl(var(--border));
    --fc-page-bg-color: hsl(var(--background));
    --fc-neutral-bg-color: hsl(var(--secondary));
    --fc-list-event-hover-bg-color: hsl(var(--accent));

    /* Header and text colors */
    --fc-button-text-color: hsl(var(--foreground));
    --fc-button-bg-color: hsl(var(--secondary));
    --fc-button-border-color: hsl(var(--border));
    --fc-button-hover-bg-color: hsl(var(--accent));
    --fc-button-hover-border-color: hsl(var(--accent));
    --fc-button-active-bg-color: hsl(var(--accent));

    /* Event styles */
    --fc-event-bg-color: hsl(var(--primary));
    --fc-event-border-color: hsl(var(--primary));
    --fc-event-text-color: hsl(var(--primary-foreground));
  }

  /* Dark mode overrides */
  :global(.dark .calendar-wrapper) {
    --fc-border-color: hsl(var(--border));
    --fc-page-bg-color: hsl(var(--background));
    --fc-neutral-bg-color: hsl(var(--secondary));
    --fc-today-bg-color: hsl(var(--accent) / 0.1);
  }

  /* Additional custom styles */
  :global(.fc-button) {
    @apply shadow-sm transition-shadow hover:shadow-md;
  }

  :global(.fc-button-active) {
    @apply ring-2 ring-primary ring-offset-2 ring-offset-background;
  }

  :global(.fc-day-today) {
    @apply bg-accent/10 !important;
  }

  :global(.fc-event) {
    @apply cursor-pointer transition-opacity hover:opacity-80;
  }
</style>
