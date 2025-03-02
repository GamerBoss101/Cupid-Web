import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true,
}

const bmvSchema = new mongoose.Schema({
    id: reqString,
    followUpMessage: reqString,
    noFail: Boolean,
    ButtonsOptions: Array,
    colors: {
        backgroundColor: reqString,
        titleTextColor: reqString,
        buttonBGColor: reqString,
    },
    image: {
        initial: {
            enabled: Boolean,
            url: String,
        },
        followUp: {
            enabled: Boolean,
            url: String,
        }
    },
    date: reqString,
    password: reqString
});

export class BMV {
    model: mongoose.Model<any>;
    upsert: any;
    constructor() {
        this.model = mongoose.model('bmv', bmvSchema);
        this.upsert = { upsert: true };
    }
    async create(id: string, followUpMessage: string, noFail: boolean, ButtonsOptions: Array<any>, colors: any, image: any, password: string) {
        const newEntry = new this.model({
            id: id,
            followUpMessage: followUpMessage,
            noFail: noFail,
            ButtonsOptions: ButtonsOptions,
            colors: colors,
            image: image,
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
    async update(Id: string, followUpMessage: string, noFail: boolean, ButtonsOptions: Array<any>, colors: any, image: any) {
         await this.model.updateOne({ id: Id }, {
            followUpMessage,
            noFail,
            ButtonsOptions: ButtonsOptions,
            colors: colors,
            image: image
        }, this.upsert);
        return await this.model.findOne({ id: Id });
    }

    async delete(Id: string) {
        return await this.model.deleteOne({ id: Id });
    }
}