import {IQueryString, IReplyApplication, IReplyApplications} from './application/interfaces'
import {ApplicationInMemorySingletonRepo} from './repository/ApplicationInMemorySingletonRepo'
import {Config} from './config'
import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
  } from 'fastify';
import fp from 'fastify-plugin';
import { ApplicationRepository } from './repository/ApplicationRepository';

// Declaration merging
declare module 'fastify' {
    export interface FastifyInstance {
        repo: ApplicationRepository;
    }
}

const ApiRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    server.get<{Querystring: IQueryString}>('/apps/all', {}, async function (request: any, response: any) {
        try {
            const {limit, offset} = request.query;

            const applications = server.repo.getAll(limit, offset);

            response.code(200).send({
                applications: applications
            });

        } catch {

            response.code(500).send(500);
        }

    });

}

export default fp(ApiRoute);

//const routes = async (server: any, options: any) => {
//
//
//    server.get<{QueryString: IQueryString}>('/apps/all', async function (request: any, response: any) {
//        try {
//            const {limit, offset} = request.query;
//
//            
//            const repo:ApplicationInMemorySingletonRepo = ApplicationInMemorySingletonRepo.instance(config.defaultCatalogFile)
//
//
//            const applications = repo.getAll()
//
//        }
//
//    })
//
//
//}