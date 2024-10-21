import sample1 from '$lib/assets/sample_1.avif';
import sample2 from '$lib/assets/sample_2.avif';
import sample3 from '$lib/assets/sample_3.avif';

export const mockChuchDatas = [
  {
    title: 'Elegant',
    description:
      'A nurturing spiritual home dedicated to cultivating a deep relationship with God and empowering individuals to reach their full potential.',
    img: sample1
  },

  {
    title: 'Fantastic',
    description:
      'A sanctuary of faith and fellowship, where hearts find solace, minds discover truth, and lives are transformed together.',
    img: sample2
  },

  {
    title: 'Enjoy',
    description:
      'A vibrant community committed to serving others, making a positive impact, and inspiring hope in the world.',
    img: sample3
  }
];

export const publicProfileAPI =
  'https://ldsuhuvtfqrflozlznho.supabase.co/storage/v1/object/public/profile_bucket/';

export const userRoutes = ['/profile', '/my-reservations'];
export const adminRoutes = [
  '/admin-dashboard',
  '/admin-dashboard/upload-church',
  '/admin-event-reservations',
  '/admin-',
  '/admin-manage-users'
];
export const defaultRoutes = ['/authenticate'];

export const convertTo24HourFormat = (time: string) => {
  const [timePart, modifier] = time.split(' ');
  let [hours, minutes] = timePart.split(':');

  if (hours === '12') {
    hours = modifier === 'AM' ? '00' : '12';
  } else {
    hours =
      modifier === 'PM' ? String(Number(hours) + 12).padStart(2, '0') : hours.padStart(2, '0');
  }

  return `${hours}:${minutes}:00`;
};

export const convertTo12HourFormat = (time: string) => {
  let [hours, minutes] = time.split(':');
  const parsedHours = Number(hours);
  const modifier = parsedHours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = parsedHours % 12 === 0 ? '12' : String(parsedHours % 12).padStart(2, '0');

  return `${hours}:${minutes} ${modifier}`;
};

export const publicAPIs = (path: string, selection: 'Profile' | 'Church') => {
  const churchpath =
    'https://ldsuhuvtfqrflozlznho.supabase.co/storage/v1/object/public/church_bucket/';
  const profilepath =
    'https://ldsuhuvtfqrflozlznho.supabase.co/storage/v1/object/public/profile_bucket/';

  if (selection === 'Church') return churchpath + path;

  return profilepath + path;
};

export const getBookingStatus = (input: string) => {
  // Ensure the input format is 'YYYY-MM-DD/HH:MM:SS/HH:MM:SS'
  if (!/^(\d{4}-\d{2}-\d{2})\/(\d{2}:\d{2}:\d{2})\/(\d{2}:\d{2}:\d{2})$/.test(input)) {
    throw new Error("Invalid input format. Expected 'YYYY-MM-DD/HH:MM:SS/HH:MM:SS'.");
  }

  // Split the input string to extract the date and times
  const [date, startTime, endTime] = input.split('/');

  // Create Date objects for the start and end times in local time
  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  // Get the current date and time in local time
  const now = new Date();

  // Determine the booking status based on the current time
  if (now < startDateTime) {
    return 'Reserve';
  } else if (now >= startDateTime && now <= endDateTime) {
    return 'On-going';
  } else {
    return 'Done';
  }
};
