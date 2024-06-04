import { Application } from "../entity/application";

interface IQueryString {
    id: string;
    limit: number;
    offset: number;
    version: string;
    date: string
}

interface IReplyApplication {
    200: {
        success: boolean,
        application: Application
    }
}

interface IReplyApplications {

    200: {
        success: boolean,
        application: Application[]
    }
}

export {IQueryString, IReplyApplication, IReplyApplications}