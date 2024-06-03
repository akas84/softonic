
import { config } from '../../config';
import { Application } from '../../entity/application';
import { ApplicationRepository } from '../../repository/ApplicationRepository';


export class GetAllApplicationsUseCase {

    repo: ApplicationRepository;
    config: config;

    constructor(repo: ApplicationRepository, config: config) {
        this.repo = repo;
        this.config = config;
    }

    execute(limit: number|null, offset: number|null): Array<Application>|null {
        return this.repo.getAll(limit || this.config.maxApplicationPerPage, offset || this.config.defaultOffset);
    }

}