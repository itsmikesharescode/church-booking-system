import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { uploadChurchSchema } from './upload-church-schema';

export const load: PageServerLoad = async () => {};
