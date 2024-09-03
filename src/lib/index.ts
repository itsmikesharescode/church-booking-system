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
