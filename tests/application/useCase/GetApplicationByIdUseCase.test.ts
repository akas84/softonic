import { GetAllApplicationsUseCase } from "../../../src/application/useCase/GetAllApplicationsUseCase";
import { Application } from "../../../src/entity/application";
import { ApplicationRepository } from "../../../src/repository/ApplicationRepository";
import { instance, mock, reset, when } from "ts-mockito";
import { GetApplicationById } from "../../../src/application/useCase/GetApplicationById"

let mockedRepo:ApplicationRepository = mock<ApplicationRepository>();


describe('Controller behaviour', () => {

    beforeEach(()=> {
        reset(mockedRepo);
    })

    test('Given Id param then application is returned from repo', () => {
        const repo:ApplicationRepository = instance(mockedRepo);
        const useCase = new GetApplicationById(repo);
        const expectedId = 'expectedId';

        when(mockedRepo.getById(expectedId)).thenReturn(new Application(expectedId, '', '', '', '', ''))

        const response = useCase.execute(expectedId);

        expect(response?.id).toBe(expectedId);
    })

    test('Given application not found then null is returned', () => {
        const repo:ApplicationRepository = instance(mockedRepo);
        const useCase = new GetApplicationById(repo);
        const expectedId = 'expectedId';

        when(mockedRepo.getById(expectedId)).thenReturn(null)

        const response = useCase.execute(expectedId);

        expect(response).toBeNull();
    })

})