import { z } from 'zod';

const imageSchema = z.object({
	id: z.string().min(5),
	files: z.custom<FileList | undefined>(
		(fileList) => {
			if (!fileList) return false;

			if (!(fileList instanceof FileList)) {
				return false; // Fail if not a FileList
			}

			if (fileList.length !== 1) {
				return false; // Fail if not exactly 1 file
			}

			const file = fileList[0]; // Get the single file
			const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
			return validImageTypes.includes(file.type); // Validate file type
		},
		{
			message: 'Must upload exactly one PNG, JPEG, or JPG image.'
		}
	),
	imageTitle: z.string().min(1, { message: 'Must enter image name.' }),
	description: z.string().min(1, { message: 'Must enter image description.' })
});

export const uploadChurchSchema = z.object({
	churchName: z.string().min(1, { message: 'Must enter church name.' }),
	description: z.string().min(1, { message: 'Must enter church description.' }),
	images: z.array(imageSchema).min(1, { message: 'Must upload at least one image.' })
});

export type UploadChurchTypes = z.infer<typeof uploadChurchSchema>;
