"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationInMemoryRepo = void 0;
const fs = __importStar(require("fs"));
const application_1 = require("../entity/application");
class ApplicationInMemoryRepo {
    constructor(filename) {
        const content = fs.readFileSync(filename, { encoding: 'utf-8' });
        this.ids = {};
        this.indexByDate = {};
        this.store = JSON.parse(content).map((item, index) => {
            //add current item to index by id
            this.ids[item.id] = index;
            //we add the current item to index by date
            let ByDateObjects = this.indexByDate[item.date] || [];
            ByDateObjects.push(index);
            this.indexByDate[item.date] = ByDateObjects;
            return new application_1.Application(item.id, item.app_name, item.app_version, item.country, item.developer, item.date);
        });
    }
    getById(id) {
        if (this.ids[id] === undefined) {
            return null;
        }
        return this.store[this.ids[id]];
    }
    getByDate(date, limit = 1000, offset = 0) {
        let toReturn = [];
        this.indexByDate[this.formatDate(date)].forEach((value) => {
            toReturn.push(this.store[value]);
        });
        return toReturn.slice(offset, offset + limit);
    }
    getAll(limit = 1000, offset = 0) {
        return this.store.slice(offset, offset + limit);
    }
    formatDate(date) {
        return date.getFullYear() + '-' + this.padTo2Digits(date.getMonth() + 1) + '-' + this.padTo2Digits(date.getDate());
    }
    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
}
exports.ApplicationInMemoryRepo = ApplicationInMemoryRepo;
