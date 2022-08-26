import {calcRevenue, calcExpenses, calcGrossProfitMargin, calcNetProfitMargin, calcWorkingCapitalRatio} from "../service/calculate.service";

describe("test calcRevenue", () => {
    test("should check calcRevenue by using existing data in data.json file", async () => {
        const result = await calcRevenue();
        expect(result).toEqual(32431);
        expect(result).toBeTruthy();
    });
});

describe("test calcExpenses", () => {
    test("should check Expenses by using existing data in data.json file", async () => {
        const result = await calcExpenses();
        expect(result).toEqual(36529.68);
        expect(result).toBeTruthy();
    });
});

describe("test calcGrossProfitMargin", () => {
    test("should check Gross Profit Margin by using existing data in data.json file", async () => {
        const result = await calcGrossProfitMargin();
        expect(result).toEqual(0);
    });
});

describe("test calcNetProfitMargin", () => {
    test("should check calcNetProfitMargin by using existing data in data.json file", async () => {
        const result = await calcNetProfitMargin();
        expect(result).toEqual(12.638154851839289);
    });
});

describe("test calcWorkingCapitalRatio", () => {
    test("should check calcWorkingCapitalRatio by using existing data in data.json file", async () => {
        const result = await calcWorkingCapitalRatio();
        expect(result).toEqual(0);
    });
});