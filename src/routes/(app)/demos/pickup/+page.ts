import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
    return {
        preview: url.searchParams.get('preview') ? true : false,
    };
};