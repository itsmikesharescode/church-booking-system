import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createUserSchema, updateUserSchema } from './manage-users-schema';

export const load: PageServerLoad = async () => {
	return {
		createUserForm: await superValidate(zod(createUserSchema)),
		updateUserForm: await superValidate(zod(updateUserSchema))
	};
};
