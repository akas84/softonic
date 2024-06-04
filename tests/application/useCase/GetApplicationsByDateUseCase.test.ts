import { GetAllApplicationsUseCase } from "../../../src/application/useCase/GetAllApplicationsUseCase";
import { GetApplicationsByDate } from "../../../src/application/useCase/GetApplicationsByDate";
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
            const date = new Date('2010-09-02');

            if (expectedLimit === null || expetedOffset === null) {
                throw 'Err'
            }
            const expectedId = 'expectedId'

            const repo: ApplicationRepository = instance(mockedRepo);
            const useCase = new GetApplicationsByDate(repo, {
                maxApplicationPerPage: 2,
                defaultOffset: 3,
                defaultCatalogFile: '',
            });

            when(mockedRepo.getByDate(date, expectedLimit, expetedOffset)).thenReturn([new Application(expectedId, '', '', '', '', '')])

            const response = useCase.execute(date, limit, offset);

            expect(response?.length).toBe(1);
            expect(response?.[0].id).toBe(expectedId)
        })


    test('Given null response from repo, then response is null', () => {
        const repo:ApplicationRepository = instance(mockedRepo);
        const date = new Date('2019-09-10');
        const useCase = new GetApplicationsByDate(repo, {
            maxApplicationPerPage: 2,
            defaultOffset: 3,
            defaultCatalogFile: '',
        });

        when(mockedRepo.getByDate(date, 2, 3)).thenReturn(null)

        const response = useCase.execute(date, 1, 2);

        expect(response).toBeNull();
    })

})