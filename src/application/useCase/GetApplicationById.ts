import { Application } from '../../entity/application';
import { ApplicationRepository } from '../../repository/ApplicationRepository';

export class GetApplicationById
{

    repo: ApplicationRepository;

    constructor(repo: ApplicationRepository) {
        this.repo = repo;
    }

    execute(id: string): Application|null {
        return this.repo.getById(id);
    }

}