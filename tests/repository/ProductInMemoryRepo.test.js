"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationInMemoryRepo_1 = require("../../src/repository/ApplicationInMemoryRepo");
const application_1 = require("../../src/entity/application");
describe('testing ApplicationInMemory repository', () => {
    test('given one id when requested then product is returned', () => {
        const repository = new ApplicationInMemoryRepo_1.ApplicationInMemoryRepo(__dirname + '/product_test.json');
        expect(repository.getById('5668abbd-ea75-4ec8-a22e-14d58ccb0865')).toBeInstanceOf(application_1.Application);
    });
    test('given unkown id when requested then null is returned', () => {
        const repository = new ApplicationInMemoryRepo_1.ApplicationInMemoryRepo(__dirname + '/product_test.json');
        expect(repository.getById('5668abbd-ea75-4ec8-a22e-14d58aab0865')).toBeNull();
    });
    test('given date when requested search by date, then correct array is returned', () => {
        const repository = new ApplicationInMemoryRepo_1.ApplicationInMemoryRepo(__dirname + '/product_test.json');
        expect(repository.getByDate(new Date('2019-11-19'))).toBeInstanceOf((Array));
    });
    test('given request to getAll then first 1000 items are returned', () => {
        const repository = new ApplicationInMemoryRepo_1.ApplicationInMemoryRepo(__dirname + '/product_test.json');
        expect(repository.getAll(1000).length).toBe(1000);
    });
    test('given pagination params then pagination works as expected', () => {
        const repository = new ApplicationInMemoryRepo_1.ApplicationInMemoryRepo(__dirname + '/product_test.json');
        const firstPage = repository.getAll(3);
        expect(firstPage[0].id).toBe('5668abbd-ea75-4ec8-a22e-14d58ccb0865');
        expect(firstPage.length).toBe(3);
        const secondPage = repository.getAll(2, 3);
        expect(secondPage[0].id).toBe('6dadafba-cd72-4f0c-b2b3-267bbe8eb803');
        expect(secondPage.length).toBe(2);
    });
    test('given pagination params in getByDate when called then works as expected', () => {
        var _a;
        const repository = new ApplicationInMemoryRepo_1.ApplicationInMemoryRepo(__dirname + '/product_test.json');
        const firstAppId = 'c126bbb3-0f5c-4ff6-97a7-b167ac2690f7';
        const secondAppId = '7b11d30a-ae6d-4ac4-9802-e0b6413f6b2d';
        const dateWithTwoApps = new Date('1987-07-01');
        const firstPage = repository.getByDate(dateWithTwoApps, 1);
        expect(firstPage === null || firstPage === void 0 ? void 0 : firstPage.length).toBe(1);
        expect((_a = firstPage === null || firstPage === void 0 ? void 0 : firstPage[0]) === null || _a === void 0 ? void 0 : _a.id).toBe(firstAppId);
        const secondPage = repository.getByDate(dateWithTwoApps, 1, 1);
        expect(secondPage === null || secondPage === void 0 ? void 0 : secondPage[0].id).toBe(secondAppId);
    });
});
