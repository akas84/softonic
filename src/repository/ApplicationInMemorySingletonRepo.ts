import { Application } from "../entity/application";
import { ApplicationInMemoryRepo } from "./ApplicationInMemoryRepo";
import { ApplicationRepository } from "./ApplicationRepository";

export class ApplicationInMemorySingletonRepo implements ApplicationRepository {

    static #instance: ApplicationInMemorySingletonRepo;
    repo: ApplicationRepository;
    private constructor(repo: ApplicationRepository) {
        this.repo = repo;
    }

    public static instance(repo: ApplicationRepository): ApplicationInMemorySingletonRepo {
        if (!ApplicationInMemorySingletonRepo.#instance) {
            ApplicationInMemorySingletonRepo.#instance = new ApplicationInMemorySingletonRepo(repo);
        }

        return ApplicationInMemorySingletonRepo.#instance;
    }

    getById(id: string): Application | null {
        return this.repo.getById(id);
    }
    getByDate(date: Date, limit: number, offset: number): Application[] | null {
        return this.repo.getByDate(date, limit, offset);
    }
    getByVersion(version: string, limit: number, offset: number): Application[] | null {
        return this.repo.getByVersion(version, limit, offset);
    }
    getAll(limit: number, offset: number): Application[] | null {
        return this.repo.getAll(limit, offset);
    }

}