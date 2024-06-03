"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetAllApplicationsUseCase_1 = require("../../../src/application/useCase/GetAllApplicationsUseCase");
const application_1 = require("../../../src/entity/application");
const ts_mockito_1 = require("ts-mockito");
let mockedRepo = (0, ts_mockito_1.mock)();
describe('Controller behaviour', () => {
    test('Given no params, then calls to repo with default and returns', () => {
        const repo = (0, ts_mockito_1.instance)(mockedRepo);
        const useCase = new GetAllApplicationsUseCase_1.GetAllApplicationsUseCase(repo);
        (0, ts_mockito_1.when)(mockedRepo.getAll((0, ts_mockito_1.anyNumber)(), (0, ts_mockito_1.anyNumber)())).thenReturn([new application_1.Application('', '', '', '', '', '')]);
        const response = useCase.execute(1, 2);
        expect(response === null || response === void 0 ? void 0 : response.length).toBe(1);
    });
});
