import * as fs from 'fs';
import { Application } from '../entity/application';

type HashMapByIds = {
    [key in string]: number;    
}

type HashMapByDate = {
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


export class ApplicationInMemoryRepo {

    store: Array<Application>;
    ids: HashMapByIds;
    indexByDate: HashMapByDate;


    constructor(filename: string) {

        const content = fs.readFileSync(filename, {encoding: 'utf-8'});
        this.ids = {};
        this.indexByDate = {}
        this.store = JSON.parse(content).map((item: JsonFormat, index: number) => {

            //add current item to index by id
            this.ids[item.id] = index;

            //we add the current item to index by date
            let ByDateObjects = this.indexByDate[item.date] || [];
            ByDateObjects.push(index)

            this.indexByDate[item.date] = ByDateObjects;

            return new Application(item.id, item.app_name, item.app_version, item.country, item.developer, item.date)
        })
    }

    getById(id: string): Application | null {
        if (this.ids[id] === undefined) {
            return null;
        }

        return this.store[this.ids[id]];
    }

    getByDate(date: Date, limit: number = 1000, offset: number = 0): Array<Application> | null
    {

        let toReturn: Array<Application> = [];
        this.indexByDate[this.formatDate(date)].forEach((value: number) => {
            toReturn.push(this.store[value]);
        })

        return toReturn.slice(offset, offset + limit);
    }

    getAll(limit: number = 1000, offset: number = 0) {
        return this.store.slice(offset, offset + limit);
    }


    private formatDate(date: Date): string
    {
        return date.getFullYear()+'-'+this.padTo2Digits(date.getMonth()+1)+'-'+this.padTo2Digits(date.getDate());
    }

    private padTo2Digits(num: number) {
       return num.toString().padStart(2, '0');
    }
}
