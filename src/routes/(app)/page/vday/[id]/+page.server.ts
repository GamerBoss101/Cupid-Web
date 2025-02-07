import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import vdays from '$lib/ts/vdays';

export const load: PageServerLoad = async ({ params }) => {

    let data = await vdays.get(params.id);

    if (!data) return error(404, 'Vday not found');

    return JSON.parse(JSON.stringify(data));
};