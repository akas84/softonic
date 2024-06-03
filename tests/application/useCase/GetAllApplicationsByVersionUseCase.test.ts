import { GetAllApplicationsUseCase } from "../../../src/application/useCase/GetAllApplicationsUseCase";
import { GetApplicationsByVersion } from "../../../src/application/useCase/GetApplicationsByVersion";
import { Application } from "../../../src/entity/application";
import { ApplicationRepository } from "../../../src/repository/ApplicationRepository";
import { instance, mock, reset, when } from "ts-mockito";

let mockedRepo:ApplicationRepository = mock<ApplicationRepository>();


describe('Controller behaviour', () => {

    beforeEach(()=> {
        reset(mockedRepo);
    })

    const dataSet = [
        [1, 2, 1, 2],
        [null, null, 2, 3]
    ];


    it.each(dataSet)
        ('given params, then returns correct result', (
            limit: number | null,
            offset: number | null,
            expectedLimit: number | null,
            expetedOffset: number | null,
        ) => {

            if (expectedLimit === null || expetedOffset === null) {
                throw 'Err'
            }
            const expectedVersion = '1.2.3';
            const expectedId = 'expectedId'

            const repo: ApplicationRepository = instance(mockedRepo);
            const useCase = new GetApplicationsByVersion(repo, {
                maxApplicationPerPage: 2,
                defaultOffset: 3,
            });

            when(mockedRepo.getByVersion(expectedVersion, expectedLimit, expetedOffset))
                .thenReturn([new Application(expectedId, '', expectedVersion, '', '', '')])

            const response = useCase.execute(expectedVersion, limit, offset);

            expect(response?.length).toBe(1);
            expect(response?.[0].id).toBe(expectedId)
        })


    test('Given null response from repo, then response is null', () => {
        const repo:ApplicationRepository = instance(mockedRepo);
        const requestedVersion = '1.2.3';
        const useCase = new GetApplicationsByVersion(repo, {
            maxApplicationPerPage: 2,
            defaultOffset: 3,
        });

        when(mockedRepo.getByVersion(requestedVersion, 2, 3)).thenReturn(null)

        const response = useCase.execute(requestedVersion, 1, 2);

        expect(response).toBeNull();
    })

})

