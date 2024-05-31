import * as fs from 'fs';
import { Application } from '../entity/application';

type HashMap = {

    [key in string]: number;    
}


export class ApplicationInMemoryRepo {

    store: Array<Application>;
    ids: HashMap;


    constructor(filename: string) {

        const content = fs.readFileSync(filename, {encoding: 'utf-8'});
        this.ids = {};
        this.store = JSON.parse(content).map((item, index) => {
            //this.ids.set(item.id, index);
            this.ids[item.id] = index;
            return new Application(item.id, item.app_name, item.app_version, item.country, item.developer, item.date)
        })
    }

    getById(id: string): Application | null {
        if (this.ids[id] === undefined) {
            return null;
        }

        return this.store[this.ids[id]];
    }

}
