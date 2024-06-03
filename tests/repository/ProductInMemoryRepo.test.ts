import { ApplicationInMemoryRepo } from '../../src/repository/ApplicationInMemoryRepo'
import { Application } from '../../src/entity/application';


describe('testing ApplicationInMemory repository', () => {

    test('given one id when requested then product is returned', () => {
        const repository = new ApplicationInMemoryRepo(__dirname + '/product_test.json')
        expect(repository.getById('5668abbd-ea75-4ec8-a22e-14d58ccb0865')).toBeInstanceOf(Application);
    })

    test('given unkown id when requested then null is returned', () => {

        const repository = new ApplicationInMemoryRepo(__dirname + '/product_test.json')
        expect(repository.getById('5668abbd-ea75-4ec8-a22e-14d58aab0865')).toBeNull();
    })

    test('given date when requested search by date, then correct array is returned', () => {

        const repository = new ApplicationInMemoryRepo(__dirname + '/product_test.json')
        expect(repository.getByDate(new Date('2019-11-19'))).toBeInstanceOf(Array<Application>);
    })

    test('given request to getAll then first 1000 items are returned', () => {
        const repository = new ApplicationInMemoryRepo(__dirname + '/product_test.json')
        expect(repository.getAll(1000).length).toBe(1000)
    })

    test('given pagination params then pagination works as expected', () => {
        const repository = new ApplicationInMemoryRepo(__dirname + '/product_test.json')
        const firstPage = repository.getAll(3);
        expect(firstPage[0].id).toBe('5668abbd-ea75-4ec8-a22e-14d58ccb0865')
        expect(firstPage.length).toBe(3)
        const secondPage = repository.getAll(2, 3);
        expect(secondPage[0].id).toBe('6dadafba-cd72-4f0c-b2b3-267bbe8eb803')
        expect(secondPage.length).toBe(2)
    })

});


