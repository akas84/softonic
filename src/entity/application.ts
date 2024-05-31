export class Application {
    id: string;
    name: string;
    version: string;
    country: string;
    developer: string;
    date: Date;

    constructor (id: string, name: string, version: string, country: string, developer: string, date: string) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.country = country;
        this.developer = developer;
        this.date = new Date(date)
    }

}
