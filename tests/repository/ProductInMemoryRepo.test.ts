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



});


