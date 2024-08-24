import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { updateUserSchema } from './_components/_operations/_operations/user-schema';

export const load: PageServerLoad = async () => {
	return {
		updateUserForm: await superValidate(zod(updateUserSchema))
	};
};
