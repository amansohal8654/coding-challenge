import {calcRevenue, calcExpenses, calcGrossProfitMargin, calcNetProfitMargin, calcWorkingCapitalRatio} from "../service/calculate.service";

export async function revenue(){
    try {
        const revenue = await calcRevenue()
        return formatValue(revenue);
    } catch (err) {
        console.log(err)
    }
}

export async function expenses(){
    try {
        const expenses = await calcExpenses()
        return formatValue(expenses);
    } catch (err) {
        console.log(err)
    }
}

export async function grossProfitMargin(){
    try {
        const grossProfitMargin = await calcGrossProfitMargin();
        return Math.round(grossProfitMargin) + "%";
    } catch (err) {
        console.log(err)
    }
}

export async function netProfitMargin(){
    try {
        const netProfitMargin = await calcNetProfitMargin();
        return Math.round(netProfitMargin) + "%";
    } catch (err){
        console.log(err);
    }
}

export async function workingCapitalRatio(){
    try{
        const workingCapitalRatio = await calcWorkingCapitalRatio();
        return Math.round(workingCapitalRatio) + "%";
    } catch(err){
        console.log(err)
    }
}

function formatValue(value : number){
    const parts = value.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}