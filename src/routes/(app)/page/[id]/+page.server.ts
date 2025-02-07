import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import vdays from '$lib/ts/vdays';

export const load: PageServerLoad = async ({ params }) => {
    let pageType = null;

    let data = await vdays.get(params.id);
    if(data !== null) pageType = 'vday';

    
    if(!data) throw error(404, 'Not found');
    data.password = undefined;
    return {
        pageType,
        pageData: JSON.parse(JSON.stringify(data))
    }
};