import { GetAllApplicationsUseCase } from "../../../src/application/useCase/GetAllApplicationsUseCase";
import { Application } from "../../../src/entity/application";
import { ApplicationRepository } from "../../../src/repository/ApplicationRepository";
import {anyNumber, instance, mock, reset, when} from "ts-mockito";

let mockedRepo:ApplicationRepository = mock<ApplicationRepository>();


describe('Controller behaviour', () => {

    beforeEach(()=> {
        reset(mockedRepo);
    })

    test('Given params for limit and offset, params are sent to repo', () => {

        const repo:ApplicationRepository = instance(mockedRepo);
        const useCase = new GetAllApplicationsUseCase(repo, {
            maxApplicationPerPage: 2,
            defaultOffset: 3,
        });

        when(mockedRepo.getAll(1, 2)).thenReturn([new Application('', '', '', '', '', '')])

        const response = useCase.execute(1, 2);

        expect(response?.length).toBe(1);
        
    })

    test('Given no params, then calls to repo with default and returns', () => {

        const repo:ApplicationRepository = instance(mockedRepo);
        const useCase = new GetAllApplicationsUseCase(repo, {
            maxApplicationPerPage: 2,
            defaultOffset: 3,
        });

        when(mockedRepo.getAll(2, 3)).thenReturn([new Application('', '', '', '', '', '')])

        const response = useCase.execute(null, null);

        expect(response?.length).toBe(1);
    });

    test('Given null response from repo, then response is null', () => {
        const repo:ApplicationRepository = instance(mockedRepo);
        const useCase = new GetAllApplicationsUseCase(repo, {
            maxApplicationPerPage: 2,
            defaultOffset: 3,
        });

        when(mockedRepo.getAll(2, 3)).thenReturn(null)

        const response = useCase.execute(1, 2);

        expect(response).toBeNull();
    })


})


