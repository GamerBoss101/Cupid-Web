import { SECRET_DB_URI } from "$env/static/private";
import mongoose from "mongoose";

import { vDay } from "./vdays";
import { Pickup } from "./pickup";
import { BMV } from "./bmv";


class DB {
    vdays: vDay;
    pickups: Pickup;
    bmv: BMV;
    dbs: any; 
    constructor() {
        this.vdays = new vDay();
        this.pickups = new Pickup();
        this.bmv = new BMV();
        this.connect();
        
        this.dbs = [
            {
                name: "vday",
                db: this.vdays
            }, {
                name: "pickup",
                db: this.pickups
            },
            {
                name: "bmv",
                db: this.bmv
            }
        ];
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

    connect() {
        mongoose.set('strictQuery', true);
        mongoose.connect(SECRET_DB_URI).then(() => { console.log("Connected to DataBase") });
    }  

    async checkId(id: string) {
        let allData:any = [];
        allData = allData.concat(await this.vdays.getAll());
        allData = allData.concat(await this.pickups.getAll());
        allData = allData.concat(await this.bmv.getAll());
        let dataIds = allData.map((data: any) => data.id);
        return dataIds.includes(id);
    }

    async createVday(name: string, message: string, signature: string, image: any, colors: any) {
        let id = this.makeId(10);

        while((await this.checkId(id)) == true) {
            id = this.makeId(10);
        }

        return await this.vdays.create(name, message, signature, image, colors, id, this.makeId(5));
    }

    async createPickup(pickupLine: string, followUpLine: string, ButtonsOptions: Array<any>, colors: any, image: any) {
        let id = this.makeId(10);

        while((await this.checkId(id)) == true) {
            id = this.makeId(10);
        }

        return await this.pickups.create(id, pickupLine, followUpLine, ButtonsOptions, colors, image, this.makeId(5));
    }

    async createBMV(followUpMessage: string, noFail: boolean, ButtonsOptions: Array<any>, colors: any, image: any) {
        let id = this.makeId(10);

        while((await this.checkId(id)) == true) {
            id = this.makeId(10);
        }

        return await this.bmv.create(id, followUpMessage, noFail, ButtonsOptions, colors, image, this.makeId(5));
    }

    async updateVday(name: string, message: string, signature: string, image: any, colors: any, id: string) {
        return await this.vdays.update(name, message, signature, image, colors, id);
    }

    async updatePickup(pickupLine: string, followUpLine: string, ButtonsOptions: Array<any>, colors: any, image: any, id: string) {
        return await this.pickups.update(id, pickupLine, followUpLine, ButtonsOptions, colors, image);
    }

    async updateBMV(followUpMessage: string, noFail: boolean, ButtonsOptions: Array<any>, colors: any, image: any, id: string) {
        return await this.bmv.update(id, followUpMessage, noFail, ButtonsOptions, colors, image);
    }

    async deleteVday(id: string) {
        return await this.vdays.delete(id);
    }

    async deletePickup(id: string) {
        return await this.pickups.delete(id);
    }

    async deleteBMV(id: string) {
        return await this.bmv.delete(id);
    }

    async getPageType(id: string) {
        let data: any, pageType: any = null;
        let i = 0;
        while(data == null && i < this.dbs.length) {
            data = await this.dbs[i].db.get(id);
            if(data) pageType = this.dbs[i].name;
            i++;
        }
        return pageType;
    }

    async authenticate(id: string, password: string) {
        let data: any = null, pageType: any = null;
        let i = 0;

        while(data == null && i < this.dbs.length) {
            data = await this.dbs[i].db.get(id);
            if(data) pageType = this.dbs[i].name;
            i++;
        }

        if(data == null) return false;
        return data.password == password;
    }

    async get(id: string) {
        let data: any = null, pageType: any = null;
        let i = 0;

        while(data == null && i < this.dbs.length) {
            data = await this.dbs[i].db.get(id);
            if(data) pageType = this.dbs[i].name;
            i++;
        }

        if(data == null) return { pageType, pageData: null };
        data.password = undefined;
        return { pageType, pageData: JSON.parse(JSON.stringify(data)) };
    }
}

export const db = new DB();