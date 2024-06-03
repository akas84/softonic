"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
class Application {
    constructor(id, name, version, country, developer, date) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.country = country;
        this.developer = developer;
        this.date = new Date(date);
    }
}
exports.Application = Application;
