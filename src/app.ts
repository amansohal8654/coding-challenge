import {revenue, expenses, grossProfitMargin, netProfitMargin, workingCapitalRatio} from "./controller/calculate.controller";

async function printCalculations() {
    const calculations = await Promise.all([await revenue(), await expenses(), await grossProfitMargin(), await netProfitMargin(), await workingCapitalRatio()]);
    console.log(`Revenue: $${calculations[0]}`);
    console.log(`Expenses: $${calculations[1]}`);
    console.log(`Gross Profit Margin: ${calculations[2]}%`);
    console.log(`Net Profit Margin: ${calculations[3]}%`);
    console.log(`Working Capital Ratio: ${calculations[4]}%`);
}   

printCalculations();