
import { FastifyInstance } from 'fastify';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { ApplicationInMemoryRepo } from './ApplicationInMemoryRepo';
import { DEFAULT_PRODUCT_JSON } from '../constants'


const repoConnection: FastifyPluginAsync = async (
    fastify: FastifyInstance,
) => {
    try {
        const repo = await ApplicationInMemoryRepo.initialize(DEFAULT_PRODUCT_JSON);
        fastify.decorate('repo', repo);
    }
    catch (error) {
        console.log(error)
    }
};

export default fp(repoConnection)