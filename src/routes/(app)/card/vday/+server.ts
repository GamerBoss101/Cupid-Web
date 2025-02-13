
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

import { db } from '$lib/ts/db';

export const POST: RequestHandler = async({ request }: any) => {
    let body = await request.json();
    if (!body) return error(400, 'No body');

    let { name, message, signature, image, colors } = body;

    if (!name || !message || !signature || !image || !colors) return error(400, 'Missing required fields');
    let newEntry = await db.createVday(name, message, signature, image, colors);

    return new Response(JSON.stringify(newEntry));
};

export const PUT: RequestHandler = async({ request }: any) => {
    let body = await request.json();
    if (!body) return error(400, 'No body');

    let { name, message, signature, image, colors, id } = body;

    if (!name || !message || !signature || !image || !colors || !id) return error(400, 'Missing required fields');
    let updatedEntry = await db.updateVday(name, message, signature, image, colors, id);

    return new Response(JSON.stringify(updatedEntry));
}

export const DELETE: RequestHandler = async({ request }: any) => {
    let body = await request.json();
    if (!body) return error(400, 'No body');

    let { id } = body;

    if (!id) return error(400, 'Missing required fields');
    let deletedEntry = await db.deleteVday(id);

    return new Response(JSON.stringify({ deletedEntry, status: 200 }));
}