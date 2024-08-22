import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { updateStatusEventSchema } from './_components/_operations/_operations/event-schema';

export const load: PageServerLoad = async () => {
	return {
		updateStatusEventForm: await superValidate(zod(updateStatusEventSchema))
	};
};
