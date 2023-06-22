import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ cookies }) => {
	// const session = await locals.auth.validate();

	const sessionCookie = cookies.get('auth_session');
	if (sessionCookie != undefined) {
		const session = await auth.validateSession(sessionCookie);
		if (session) {
			throw redirect(302, '/');
		}
	}
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
