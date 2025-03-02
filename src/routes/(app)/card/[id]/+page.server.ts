import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import type { PageServerLoad } from './$types';

import { db } from '$lib/ts/db';

export const load: PageServerLoad = async ({ params }) => {
    let data = await db.get(params.id);

    if(data.pageData == null) return error(404, 'Not found');
    else return { pageData: data.pageData, pageType: data.pageType, isDev: env.PUBLIC_IS_DEV == 'true' }
};