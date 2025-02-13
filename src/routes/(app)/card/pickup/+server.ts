
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

import { db } from '$lib/ts/db';

export const POST: RequestHandler = async({ request }: any) => {
    let body = await request.json();
    if (!body) return error(400, 'No body');

    let { pickupLine, followUpLine, ButtonsOptions, colors, image } = body;

    if (!pickupLine || !followUpLine || !ButtonsOptions || !colors || !image) return error(400, 'Missing required fields');
    let newEntry = await db.createPickup(pickupLine, followUpLine, ButtonsOptions, colors, image);

    return new Response(JSON.stringify(newEntry));
};

export const PUT: RequestHandler = async({ request }: any) => {
    let body = await request.json();
    if (!body) return error(400, 'No body');

    let { pickupLine, followUpLine, ButtonsOptions, colors, image, id } = body;

    if (!pickupLine || !followUpLine || !ButtonsOptions || !colors || !image || !id) return error(400, 'Missing required fields');
    let updatedEntry = await db.updatePickup(pickupLine, followUpLine, ButtonsOptions, colors, image, id);

    return new Response(JSON.stringify(updatedEntry));
}

export const DELETE: RequestHandler = async({ request }: any) => {
    let body = await request.json();
    if (!body) return error(400, 'No body');

    let { id } = body;

    if (!id) return error(400, 'Missing required fields');
    let deletedEntry = await db.deletePickup(id);

    return new Response(JSON.stringify(deletedEntry));
}