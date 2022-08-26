import * as accountData from "../../data.json"

// calculate Revenue for each account;
// This should be calculated by adding up all the values under "total_value" where the account_category field is set to "revenue"

export function calcRevenue(): Promise<number> {
    return new Promise((resolve, reject) => {
        if(accountData === undefined || accountData.data === undefined|| accountData.data?.length === 0) return reject("Data not found")
        let revenue = 0;
        for(const account of accountData.data){
            if(account.account_category.toLowerCase() === "revenue"){
                revenue += account.total_value;
            }
        }
        return resolve(revenue);
    })
}

// calculate expenses for each account
//This should be calculated by adding up all the values under total_value where the account_category field is set to expense

export function calcExpenses() : Promise<number> {
    return new Promise((resolve, reject) => {
        if(accountData === undefined || accountData.data === undefined|| accountData.data?.length === 0) return reject("Data not found")
        let expenses = 0;
        for(const account of accountData.data){
            if(account.account_category.toLowerCase() === "expense"){
                expenses += account.total_value;
            }
        }
        return resolve(expenses);
    })
}

//calculate gross profit margin for each account
//This is calculated in two steps: first by adding all the total_value fields where the account_type is set to sales 
//and the value_type is set to debit; then dividing that by the revenue value calculated earlier to generate a percentage value.

export async function calcGrossProfitMargin() : Promise<number> {
    const revenue = await calcRevenue();
    return new Promise((resolve, reject) => {
        if(accountData === undefined || accountData.data === undefined|| accountData.data?.length === 0) return reject("Data not found")
        let grossProfitMargin = 0;
        for(const account of accountData.data){
            if(account.account_type.toLowerCase() === "sales" && account.value_type.toLowerCase() === "debit"){
                grossProfitMargin += account.total_value
            }
        }
        return resolve((grossProfitMargin * 100) / revenue);
    })
}

// calculate net profit margin for each account
// This metric is calculated by subtracting the expenses value from the revenue value and dividing the remainder by revenue 
// to calculate a percentage.

export async function calcNetProfitMargin(){
    const expenses = await calcExpenses();
    const revenue = await calcRevenue();
    return ((expenses - revenue) * 100)/ revenue;
}

// calculate working Capital Ratio for each account
/* This is calculated dividing the assets by the liabilities creating a percentage value where assets are calculated by:

adding the total_value from all records where the account_category is set to assets, the value_type is set to debit, 
and the account_type is one of current, bank, or current_accounts_receivable
subtracting the total_value from all records where the account_category is set to assets, 
the value_type is set to credit, and the account_type is one of current, bank, or current_accounts_receivable
and liabilities are calculated by:

adding the total_value from all records where the account_category is set to liability, the value_type is set to credit, 
and the account_type is one of current or current_accounts_payable
subtracting the total_value from all records where the account_category is set to liability, the value_type is set to debit, 
and the account_type is one current or current_accounts_payable */

export function calcWorkingCapitalRatio() : Promise<number>{
    return new Promise((resolve, reject) => {
        if(accountData === undefined || accountData.data === undefined|| accountData.data?.length === 0) return reject("Data not found")
        const assets = calcAssets();
        const liability = calcLiability();
        return resolve((assets * 100) / liability)
    })
}

/* 
adding the total_value from all records where the account_category is set to liability, the value_type is set to credit, 
and the account_type is one of current or current_accounts_payable
subtracting the total_value from all records where the account_category is set to liability, the value_type is set to debit, 
and the account_type is one current or current_accounts_payable
*/

function calcLiability(){
    let liability = 0;
    for(const account of accountData.data){
        if( account.account_category.toLowerCase() === `liability` &&
        account.value_type.toLowerCase() === `credit` &&
        account.account_type.toLowerCase() === `current` ||
        account.account_type.toLowerCase() === `current_accounts_payable`){
            liability += account.total_value;
        }
    }
    
    let deductValue = 0
    for(const account of accountData.data){
        if( account.account_category.toLowerCase() === `liability` &&
        account.value_type.toLowerCase() === `debit` &&
        account.account_type.toLowerCase() === `current` ||
        account.account_type.toLowerCase() === `current_accounts_payable`){
            deductValue += account.total_value;
        }
    }
    return liability - deductValue;
}

/* 
adding the total_value from all records where the account_category is set to assets, the value_type is set to debit, 
and the account_type is one of current, bank, or current_accounts_receivable
subtracting the total_value from all records where the account_category is set to assets, 
the value_type is set to credit, and the account_type is one of current, bank, or current_accounts_receivable
*/
function calcAssets(){
    let assets = 0;
    for(const account of accountData.data){
        if(account.account_category.toLowerCase() === `assets` &&
        account.value_type.toLowerCase() === `debit` &&
        account.account_type.toLowerCase() === `current` ||
        account.account_type.toLowerCase() === `bank` ||
        account.account_type.toLowerCase() === `current_accounts_receivable`){
            assets += account.total_value;
        }
    }

    let deductValue = 0
    for(const account of accountData.data){
        if(
            account.account_category.toLowerCase() === `assets` &&
            account.value_type.toLowerCase() === `credit` &&
            account.account_type.toLowerCase() === `current` ||
            account.account_type.toLowerCase() === `bank` ||
            account.account_type.toLowerCase() === `current_accounts_receivable`
        ){
            deductValue += account.total_value;
        }
    }
    return assets - deductValue;
}
