import mongoose from "mongoose";
import db from "$lib/ts/db";

const reqString = {
    type: String,
    required: true,
}

const vDaySchema = new mongoose.Schema({
    id: reqString,
    name: reqString,
    message: reqString,
    signature: reqString,
    image: {
        enabled: Boolean,
        url: String,
    },
    colors: {
        backgroundColor: reqString,
        titleTextColor: reqString,
        signatureTextColor: reqString,
    },
    date: reqString,
    password: reqString
});

class vDay {
    model: mongoose.Model<any>;
    upsert: any;
    constructor() {
        this.model = mongoose.model('vday', vDaySchema);
        this.upsert = { upsert: true };
        db();
    }
    makeId(length: number) {
        var result = [];
        var characters = 'abcdefghijklmnopqrstuvwxyz012345678901234567890123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
    }
    async create(name: string, message: string, signature: string, image: any, colors: any) {
        const id = this.makeId(10);
        const newEntry = new this.model({
            id: id,
            name: name,
            message: message,
            signature: signature,
            image: {
                enabled: image.enabled,
                url: image.url,
            },
            colors: {
                backgroundColor: colors.backgroundColor,
                titleTextColor: colors.titleTextColor,
                signatureTextColor: colors.signatureTextColor,
            },
            date: new Date().toISOString(),
            password: this.makeId(5),
        });
        await newEntry.save();
        return newEntry;
    }

    async get(Id: string) {
        return await this.model.findOne({ id: Id });
    }
    async getAll() {
        return await this.model.find();
    }
    async update(Id: string, data: any) {
        const updateEntry = this.model.findOneAndUpdate(
            { id: Id },
            data,
            this.upsert,
        );
        return updateEntry;
    }
}

export default new vDay();