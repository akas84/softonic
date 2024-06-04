import * as fs from 'fs';
import { Application } from '../entity/application';
import { ApplicationRepository } from './ApplicationRepository';
import { finished } from 'stream';
import { parse } from 'path';
// Constructing promisify from
// util
const { promisify } = require('util');
// Defining finishedAsync method
const finishedAsync = promisify(finished);


type HashMapByIds = {
    [key in string]: number;
}

type HashMapByString = {
    [key in string]: Array<number>
}


interface JsonFormat {
    id: string,
    app_name: string,
    app_version: string,
    country: string,
    developer: string,
    date: string,
}


export class ApplicationInMemoryRepo implements ApplicationRepository {

    store: Array<Application>;
    ids: HashMapByIds;
    indexByDate: HashMapByString;
    indexByVersion: HashMapByString;


    private constructor(items: Array<Application>, ids: HashMapByIds, indexByDate: HashMapByString, indexByVersion: HashMapByString) {
        this.store = items;
        this.ids = ids;
        this.indexByDate = indexByDate;
        this.indexByVersion = indexByVersion;
    }

    static async initialize(filename: string) {

        console.log("Initializing...\n");
            let store: Array<Application> = [];
            let ids: HashMapByIds = {};
            let indexByDate: HashMapByString = {};
            let indexByVersion: HashMapByString = {}; 

            const fs = require('fs');
            const path = require('path');
            const json = require('big-json');
            const readStream = fs.createReadStream(filename);
            const parseStream = json.createParseStream();
            parseStream.on('data', (data: any) => {
                console.log("data parsed")
                store = data.map((item: JsonFormat, index: number) => {
                    //add current item to index by id
                    ids[item.id] = index;

                    //we add the current item to index by date
                    let ByDateObjects = indexByDate[item.date] || [];
                    ByDateObjects.push(index)

                    indexByDate[item.date] = ByDateObjects;

                    //we add the current item to index by date
                    let ByVersionsObjects = indexByVersion[item.app_version] || [];
                    ByVersionsObjects.push(index)

                    indexByVersion[item.app_version] = ByVersionsObjects;

                    console.log('Created item '+index)

                    return new Application(item.id, item.app_name, item.app_version, item.country, item.developer, item.date);
                })
            });

            readStream.pipe(parseStream);
            await finishedAsync(parseStream);

            return new ApplicationInMemoryRepo(store, ids, indexByDate, indexByVersion);
    }

    getById(id: string): Application | null {
        if (this.ids[id] === undefined) {
            return null;
        }

        return this.store[this.ids[id]];
    }

    getByDate(date: Date, limit: number = 1000, offset: number = 0): Array<Application> | null {

        let toReturn: Array<Application> = [];
        this.indexByDate[this.formatDate(date)].forEach((value: number) => {
            toReturn.push(this.store[value]);
        })

        return toReturn.slice(offset, offset + limit);
    }

    getByVersion(version: string, limit: number = 1000, offset: number = 0): Array<Application> | null {
        let toReturn: Array<Application> = [];
        this.indexByVersion[version].forEach((value: number) => {
            toReturn.push(this.store[value]);
        })

        return toReturn.slice(offset, offset + limit);
    }


    getAll(limit: number = 1000, offset: number = 0): Array<Application> | null {
        if (this.store.length == 0) {
            return null;
        }
        return this.store.slice(offset, offset + limit);
    }


    private formatDate(date: Date): string {
        return date.getFullYear() + '-' + this.padTo2Digits(date.getMonth() + 1) + '-' + this.padTo2Digits(date.getDate());
    }

    private padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }
}
