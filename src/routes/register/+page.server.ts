import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.auth.validateUser();
	if (session) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { name, username, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					name,
					username
				}
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not register user' });
		}

		throw redirect(302, '/login');
	}
};
