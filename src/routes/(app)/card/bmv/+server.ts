
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

import { db } from '$lib/ts/db';

export const POST: RequestHandler = async({ request }: any) => {
    let body = await request.json();
    if (!body) return error(400, 'No body');

    let { followUpMessage, noFail, ButtonsOptions, colors, image } = body;

    console.log(body);

    if (!followUpMessage || noFail == null || !ButtonsOptions || !colors || !image) return error(400, 'Missing required fields');
    let newEntry = await db.createBMV(followUpMessage, noFail, ButtonsOptions, colors, image);

    return new Response(JSON.stringify(newEntry));
};

export const PUT: RequestHandler = async({ request }: any) => {
    let body = await request.json();
    if (!body) return error(400, 'No body');

    let { followUpMessage, noFail, ButtonsOptions, colors, image, id } = body;

    if (!followUpMessage || !noFail || !ButtonsOptions || !colors || !image || !id) return error(400, 'Missing required fields');
    let updatedEntry = await db.updateBMV(followUpMessage, noFail, ButtonsOptions, colors, image, id);

    return new Response(JSON.stringify(updatedEntry));
}

export const DELETE: RequestHandler = async({ request }: any) => {
    let body = await request.json();
    if (!body) return error(400, 'No body');

    let { id } = body;

    if (!id) return error(400, 'Missing required fields');
    let deletedEntry = await db.deleteBMV(id);

    return new Response(JSON.stringify(deletedEntry));
}