export const publicProfileAPI =
  'https://ldsuhuvtfqrflozlznho.supabase.co/storage/v1/object/public/profile_bucket/';

export const userRoutes = ['/profile', '/my-reservations', '/my-payments'];
export const adminRoutes = [
  '/admin-dashboard',
  '/admin-event-reservations',
  '/admin-payments',
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

export const timeList = [
  { value: '00:00:00', label: '12:00 AM' },
  { value: '00:30:00', label: '12:30 AM' },
  { value: '01:00:00', label: '01:00 AM' },
  { value: '01:30:00', label: '01:30 AM' },
  { value: '02:00:00', label: '02:00 AM' },
  { value: '02:30:00', label: '02:30 AM' },
  { value: '03:00:00', label: '03:00 AM' },
  { value: '03:30:00', label: '03:30 AM' },
  { value: '04:00:00', label: '04:00 AM' },
  { value: '04:30:00', label: '04:30 AM' },
  { value: '05:00:00', label: '05:00 AM' },
  { value: '05:30:00', label: '05:30 AM' },
  { value: '06:00:00', label: '06:00 AM' },
  { value: '06:30:00', label: '06:30 AM' },
  { value: '07:00:00', label: '07:00 AM' },
  { value: '07:30:00', label: '07:30 AM' },
  { value: '08:00:00', label: '08:00 AM' },
  { value: '08:30:00', label: '08:30 AM' },
  { value: '09:00:00', label: '09:00 AM' },
  { value: '09:30:00', label: '09:30 AM' },
  { value: '10:00:00', label: '10:00 AM' },
  { value: '10:30:00', label: '10:30 AM' },
  { value: '11:00:00', label: '11:00 AM' },
  { value: '11:30:00', label: '11:30 AM' },
  { value: '12:00:00', label: '12:00 PM' },
  { value: '12:30:00', label: '12:30 PM' },
  { value: '13:00:00', label: '01:00 PM' },
  { value: '13:30:00', label: '01:30 PM' },
  { value: '14:00:00', label: '02:00 PM' },
  { value: '14:30:00', label: '02:30 PM' },
  { value: '15:00:00', label: '03:00 PM' },
  { value: '15:30:00', label: '03:30 PM' },
  { value: '16:00:00', label: '04:00 PM' },
  { value: '16:30:00', label: '04:30 PM' },
  { value: '17:00:00', label: '05:00 PM' },
  { value: '17:30:00', label: '05:30 PM' },
  { value: '18:00:00', label: '06:00 PM' },
  { value: '18:30:00', label: '06:30 PM' },
  { value: '19:00:00', label: '07:00 PM' },
  { value: '19:30:00', label: '07:30 PM' },
  { value: '20:00:00', label: '08:00 PM' },
  { value: '20:30:00', label: '08:30 PM' },
  { value: '21:00:00', label: '09:00 PM' },
  { value: '21:30:00', label: '09:30 PM' },
  { value: '22:00:00', label: '10:00 PM' },
  { value: '22:30:00', label: '10:30 PM' },
  { value: '23:00:00', label: '11:00 PM' },
  { value: '23:30:00', label: '11:30 PM' }
];
