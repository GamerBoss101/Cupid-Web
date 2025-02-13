import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true,
}

const pickupSchema = new mongoose.Schema({
    id: reqString,
    pickupLine: reqString,
    followUpLine: reqString,
    ButtonsOptions: Array,
    colors: {
        backgroundColor: reqString,
        titleTextColor: reqString,
        buttonBGColor: reqString,
    },
    image: {
        enabled: Boolean,
        url: String,
    },
    date: reqString,
    password: reqString
});

export class Pickup {
    model: mongoose.Model<any>;
    upsert: any;
    constructor() {
        this.model = mongoose.model('pickup', pickupSchema);
        this.upsert = { upsert: true };
    }
    async create(id: string, pickupLine: string, followUpLine: string, ButtonsOptions: Array<any>, colors: any, image: any, password: string) {
        const newEntry = new this.model({
            id: id,
            pickupLine: pickupLine,
            followUpLine: followUpLine,
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
    async update(Id: string, data: any) {
        const updateEntry = this.model.findOneAndUpdate(
            { id: Id },
            data,
            this.upsert,
        );
        return updateEntry;
    }
}