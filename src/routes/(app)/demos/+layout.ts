import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
    return {
        preview: url.searchParams.get('preview') ? true : false,
    };
};