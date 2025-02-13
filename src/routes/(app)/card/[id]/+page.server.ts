import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import type { PageServerLoad } from './$types';

import { db } from '$lib/ts/db';
import { page } from '$app/state';

export const load: PageServerLoad = async ({ params }) => {
    let data = await db.get(params.id);

    if(data.pageData == null) return error(404, 'Not found');
    else return { pageData: data.pageData, isDev: env.PUBLIC_IS_DEV === 'true'}
};