import type { Actions } from './$types';

import { redirect } from '@sveltejs/kit';

import { db } from '$lib/ts/db';

export const actions = {
	default: async ({ request }) => {
        const data = await request.formData();

        let id: any = data.get('id');
        let password = data.get('password');

        let pageType = await db.getPageType(id);

        switch (pageType) {
            case "vday": 
                throw redirect(303, `/demos/vday/edit?id=${id}&password=${password}`);
            case "pickup":
                throw redirect(303, `/demos/pickup/edit?id=${id}&password=${password}`);
            default:
                return;
        }
	}
} satisfies Actions;