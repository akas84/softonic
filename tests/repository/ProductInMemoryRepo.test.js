"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationInMemoryRepo_1 = require("../../src/repository/ApplicationInMemoryRepo");
const application_1 = require("../../src/entity/application");
describe('testing ApplicationInMemory repository', () => {
    test('given one id when requested then product is returned', () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = yield ApplicationInMemoryRepo_1.ApplicationInMemoryRepo.initialize(__dirname + '/product_test.json');
        expect(repository.getById('5668abbd-ea75-4ec8-a22e-14d58ccb0865')).toBeInstanceOf(application_1.Application);
    }));
    test('given unkown id when requested then null is returned', () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = yield ApplicationInMemoryRepo_1.ApplicationInMemoryRepo.initialize(__dirname + '/product_test.json');
        expect(repository.getById('5668abbd-ea75-4ec8-a22e-14d58aab0865')).toBeNull();
    }));
    test('given date when requested search by date, then correct array is returned', () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = yield ApplicationInMemoryRepo_1.ApplicationInMemoryRepo.initialize(__dirname + '/product_test.json');
        expect(repository.getByDate(new Date('2019-11-19'))).toBeInstanceOf((Array));
    }));
    test('given request to getAll then first 1000 items are returned', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const repository = yield ApplicationInMemoryRepo_1.ApplicationInMemoryRepo.initialize(__dirname + '/product_test.json');
        expect((_a = repository.getAll(1000)) === null || _a === void 0 ? void 0 : _a.length).toBe(1000);
    }));
    test('given version when requested by version then correct array is returned', () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const repository = yield ApplicationInMemoryRepo_1.ApplicationInMemoryRepo.initialize(__dirname + '/product_test.json');
        expect((_b = repository.getByVersion('8.5.0')) === null || _b === void 0 ? void 0 : _b.length).toBe(3);
    }));
    test('given pagination params then pagination works as expected', () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = yield ApplicationInMemoryRepo_1.ApplicationInMemoryRepo.initialize(__dirname + '/product_test.json');
        const firstPage = repository.getAll(3);
        expect(firstPage === null || firstPage === void 0 ? void 0 : firstPage[0].id).toBe('5668abbd-ea75-4ec8-a22e-14d58ccb0865');
        expect(firstPage === null || firstPage === void 0 ? void 0 : firstPage.length).toBe(3);
        const secondPage = repository.getAll(2, 3);
        expect(secondPage === null || secondPage === void 0 ? void 0 : secondPage[0].id).toBe('6dadafba-cd72-4f0c-b2b3-267bbe8eb803');
        expect(secondPage === null || secondPage === void 0 ? void 0 : secondPage.length).toBe(2);
    }));
    test('given pagination params in getByDate when called then works as expected', () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const repository = yield ApplicationInMemoryRepo_1.ApplicationInMemoryRepo.initialize(__dirname + '/product_test.json');
        const firstAppId = 'c126bbb3-0f5c-4ff6-97a7-b167ac2690f7';
        const secondAppId = '7b11d30a-ae6d-4ac4-9802-e0b6413f6b2d';
        const dateWithTwoApps = new Date('1987-07-01');
        const firstPage = repository.getByDate(dateWithTwoApps, 1);
        expect(firstPage === null || firstPage === void 0 ? void 0 : firstPage.length).toBe(1);
        expect((_c = firstPage === null || firstPage === void 0 ? void 0 : firstPage[0]) === null || _c === void 0 ? void 0 : _c.id).toBe(firstAppId);
        const secondPage = repository.getByDate(dateWithTwoApps, 1, 1);
        expect(secondPage === null || secondPage === void 0 ? void 0 : secondPage[0].id).toBe(secondAppId);
    }));
    test('given pagination params in getByVersion when called then works as expected', () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = yield ApplicationInMemoryRepo_1.ApplicationInMemoryRepo.initialize(__dirname + '/product_test.json');
        const expectedLastAppId = '6eb7ba91-0eb0-4818-b672-ecc5ff5d0d74';
        const expectedSecondPageFirstId = '605ec024-3bfd-41b2-987e-1b62f7f94117';
        const firstPage = repository.getByVersion('3.3.2', 2);
        expect(firstPage === null || firstPage === void 0 ? void 0 : firstPage.length).toBe(2);
        expect(firstPage === null || firstPage === void 0 ? void 0 : firstPage[1].id).toBe(expectedLastAppId);
        const secondPage = repository.getByVersion('3.3.2', 2, 2);
        expect(secondPage === null || secondPage === void 0 ? void 0 : secondPage[0].id).toBe(expectedSecondPageFirstId);
    }));
});
