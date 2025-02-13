import mongoose from "mongoose";

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

export class vDay {
    model: mongoose.Model<any>;
    upsert: any;
    constructor() {
        this.model = mongoose.model('vday', vDaySchema);
        this.upsert = { upsert: true };
    }
    async create(name: string, message: string, signature: string, image: any, colors: any, id: string, password: string) {
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
            password: password,
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
    async update(Id: string, name: string, message: string, signature: string, image: any, colors: any) {
        await this.model.updateOne({ id: Id }, {
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
            }
        });
        return await this.model.findOne({ id: Id });
    }

    async delete(Id: string) {
        return await this.model.deleteOne({ id: Id });
    }
}