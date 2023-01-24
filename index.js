function checkCashRegister(price, cash, cid) {
   var changeDue = cash - price;
   var totalCid = 0;
   var change = [];
   var currency = {
     "PENNY": 0.01,
     "NICKEL": 0.05,
     "DIME": 0.1,
     "QUARTER": 0.25,
     "ONE": 1,
     "FIVE": 5,
     "TEN": 10,
     "TWENTY": 20,
     "ONE HUNDRED": 100
   };
 
   // calculate total cash in drawer
   for (var i = 0; i < cid.length; i++) {
     totalCid += cid[i][1];
   }
 
   totalCid = Math.round(totalCid * 100) / 100;
 
   // check for exact change
   if (totalCid === changeDue) {
     return { status: "CLOSED", change: cid };
   }
 
   // check for insufficient funds
   if (totalCid < changeDue) {
     return { status: "INSUFFICIENT_FUNDS", change: [] };
   }
 
   // calculate change
   for (var j = cid.length - 1; j >= 0; j--) {
     var coinName = cid[j][0];
     var coinTotal = cid[j][1];
     var coinValue = currency[coinName];
     var coinAmount = 0;
 
     while (changeDue >= coinValue && coinTotal > 0) {
       changeDue -= coinValue;
       coinTotal -= coinValue;
       coinAmount += coinValue;
       changeDue = Math.round(changeDue * 100) / 100;
     }
 
     if (coinAmount > 0) {
       change.push([coinName, coinAmount]);
     }
   }
 
   // check for unable to give exact change
   if (changeDue > 0) {
     return { status: "INSUFFICIENT_FUNDS", change: [] };
   }
 
   // return change
   return { status: "OPEN", change: change };
 }
 
 checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);