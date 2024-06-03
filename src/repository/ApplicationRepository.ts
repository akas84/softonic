import { Application } from "../entity/application";

export interface ApplicationRepository {
    getById(id: string): Application | null;
    getByDate(date: Date, limit: number, offset: number): Array<Application> | null;
    getByVersion(version: string, limit: number, offset: number): Array<Application> | null;
    getAll(limit: number, offset: number): Array<Application> | null;
}