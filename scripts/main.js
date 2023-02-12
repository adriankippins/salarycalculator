function salaryCalc() {
 
let hourlyRate = parseFloat( document.getElementById("hr").value || 0 ); //get Hourly rate from user or use 0 if text box is empty.
let hoursWorked = parseFloat( document.getElementById("hw").value || 0); //get hours worked form user r use 0 if text box is empty.

let grossPay = Math.round(hourlyRate * hoursWorked); //Gross Pay Calculation.

let deductions = PAYE(grossPay).map(Math.round) //Call PAYE function and map the returned array to the Math.round() function the round the returned values.
//let deductionsRounded = deductions.map(Math.round)
let taxes = deductions[0]; //Taxes is in index 0 of the returned array.
let nis = deductions[1];  //Insurance is in index 1 of the returned array.
let totalDeductions = nis + taxes //Total Desuctions = Insurance plus taxes.
let netPay = grossPay - totalDeductions //Net Salary calculation

//Push rounded values to corrensponding HTML boxes.
document.getElementById("gp").value = grossPay;
document.getElementById("nis").value = nis;
document.getElementById("tax").value = taxes;
document.getElementById("td").value = totalDeductions;
document.getElementById("net").value = netPay;

}

//Insurance Function
function NIS(x) {

    let y;

    if (x <= 280000) {
        y = x * 0.056;
    
    } else {
        y = 280000 * 0.056;
    }

    return y;
}

//Taxes Function
function PAYE(z) {
    let nontax;
    let taxable;
    let tax28;
    let tax40;
    let totalTax = 0; //This one needed to have a value of 0 in case all the other boxes were blank.
    let nis = NIS(z);
    
    if (z > 75000 && z <= 225000) {
        nontax = 75000;
        taxable = z - nis - nontax;
        totalTax = taxable * 0.28;
        return [totalTax, nis];

    } else if (z > 225000) {
        nontax = z / 3;
        
        if ((z - nontax + nis) < 0) {
            taxable = 0;
         
        } else {
            taxable = z - nontax - nis;

        }
        
        
        if (taxable <= 150000) {
            tax28 = taxable * 0.28;

        } else {
            tax28 = 150000 * 0.28;

        }
            
        if (taxable - 150000 > 0) {
            tax40 = (taxable - 150000) * 0.40;

        } else {
            tax40 = tax40;
        }

        totalTax = tax28 + tax40;
        
        return [totalTax, nis];

    } else {
    
        return [totalTax, nis]; //taxes and insurance returned as an array.
    }
}