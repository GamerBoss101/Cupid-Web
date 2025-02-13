import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { db } from '$lib/ts/db';

export const load: PageServerLoad = async({ url }) => {
    let id: any = url.searchParams.get('id'); 
    let password: any = url.searchParams.get('password');

    if(id == null || password == null) throw error(400, 'Bad Request');

    if(!(await db.authenticate(id, password))) throw error(403, 'Unauthorized');

    let data = await db.get(id);

    if(data.pageData == null) return error(404, 'Not found');
    else return data;
};