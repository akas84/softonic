import { ApplicationInMemoryRepo } from '../../src/repository/ApplicationInMemoryRepo'
import { Application } from '../../src/entity/application';
import { ApplicationInMemorySingletonRepo } from '../../src/repository/ApplicationInMemorySingletonRepo'
import { ApplicationRepository } from '../../src/repository/ApplicationRepository'
import exp from 'constants';
import { instance, mock, reset, when } from "ts-mockito";


let mockedRepo:ApplicationRepository = mock<ApplicationRepository>();


describe('testing ApplicationInMemorySingleton repository', () => {

    test('Given call to getAll, call to repo is returned', () => {
        const repo: ApplicationRepository = instance(mockedRepo);
        
        const singeltonRepo = ApplicationInMemorySingletonRepo.instance(repo);
        
        when(mockedRepo.getAll(1, 2)).thenReturn([new Application('','','','','','')])

        const response = singeltonRepo.getAll(1,2);

        expect(response?.length).toBe(1);
    });

    test('Given call to get by date, call to repo is returned', () => {

        const repo: ApplicationRepository = instance(mockedRepo);
        
        const singeltonRepo = ApplicationInMemorySingletonRepo.instance(repo);

        const date = new Date('2019-02-02');
        
        when(mockedRepo.getByDate(date, 1, 2)).thenReturn([new Application('','','','','','')])

        const response = singeltonRepo.getByDate(date, 1, 2);

        expect(response?.length).toBe(1);
    })

    test('Given call to get by id then call to the repo is returned', () => {

        const repo: ApplicationRepository = instance(mockedRepo);
        
        const singeltonRepo = ApplicationInMemorySingletonRepo.instance(repo);

        const expectedId = 'expectedId'
        
        when(mockedRepo.getById(expectedId)).thenReturn(new Application(expectedId,'','','','',''))

        const response = singeltonRepo.getById(expectedId);

        expect(response?.id).toBe(expectedId);
    })

    test('Given call to get by version, then call to the repo is returned', () => {

        const repo: ApplicationRepository = instance(mockedRepo);
        
        const singeltonRepo = ApplicationInMemorySingletonRepo.instance(repo);

        const requestedVersion = '1.2.3'
        
        when(mockedRepo.getByVersion(requestedVersion, 2, 3)).thenReturn([new Application('','','','','','')])

        const response = singeltonRepo.getByVersion(requestedVersion, 2, 3);

        expect(response?.length).toBe(1);

    })

});
