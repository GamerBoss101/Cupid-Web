
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

import vdays from '$lib/ts/vdays';

export const POST: RequestHandler = async({ request }: any) => {
    let body = await request.json();
    if (!body) return error(400, 'No body');

    let { name, message, signature, image, colors } = body;

    if (!name || !message || !signature || !image || !colors) return error(400, 'Missing required fields');
    let newEntry = await vdays.create(name, message, signature, image, colors);

    return new Response(JSON.stringify(newEntry));
};