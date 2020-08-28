const axios = require('axios');

const setGraph = (pl) => ({
	type: 'GRAPH',
	payload: { status: true, data: pl }
})

const setInfo = (pl) => ({
	type: 'INFO',
	payload: { status: true, data: pl }
})

const setIncome = (pl) => ({
	type: 'INCOME',
	payload: { status: true, data: pl }
})

const setBalance = (pl) => ({
	type: 'BALANCE',
	payload: { status: true, data: pl }
})

const setCashflow = (pl) => ({
	type: 'CASHFLOW',
	payload: { status: true, data: pl }
})

export const sidebar_Action = (action, stock) => {
    var data = []
	if (action === 'GRAPH') {
		console.log(stock);
		return dispatch => {
			axios
				.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo`)
				.then(res => {
					console.log(res.data);
					data = parseGraphData(res.data);
					dispatch(setGraph(data));
				})
				.catch(err => {
					console.log(err);
				})
		}
	} else if (action === 'INFO') {
		return dispatch => {
			axios
				.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`)
				.then(res => {
					data = parseGenInfoData(res.data);
					dispatch(setInfo(data));
				})
				.catch(err => {
					console.log(err);
				})
		}
	} else if (action === 'INCOME') {
		return dispatch => {
			axios
				.get(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo`)
				.then(res => {
					data = parseIncomeData(res.data);
					dispatch(setIncome(data));
				})
				.catch(err => {
					console.log(err);
				})
		}
	} else if (action === 'BALANCE') {
		return dispatch => {
			axios
				.get(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo`)
				.then(res => {
					data = parseBalanceData(res.data);
					dispatch(setBalance(data));
				})
				.catch(err => {
					console.log(err);
				})
		}
	} else if (action === 'CASHFLOW'){
		return dispatch => {
			axios
				.get(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=IBM&apikey=demo`)
				.then(res => {
					data = parseCashData(res.data);
					dispatch(setCashflow(data));
				})
				.catch(err => {
					console.log(err);
				})
		}
    }

}

function parseGenInfoData(result) {
	var new_data = [
		{
			"Symbol": result["Symbol"],
			"About": result["Description"]
        },
		{
			"Sector": result["Sector"],
			"Book Value": result["BookValue"],
			"EPS": result["EPS"],
			"PERatio": result["PERatio"],
			"PEGRatio": result["PEGRatio"],
			"Full Time Employees": result["FullTimeEmployees"],
			"Dividend Per Share": result["DividendPerShare"],
			"DividendYield": result["DividendYield"],
			"Quarterly Revenue Growth YOY": result["QuarterlyRevenueGrowthYOY"],
			"Quarterly Earnings Growth YOY": result["QuarterlyEarningsGrowthYOY"],
			"Market Capitalization": result["MarketCapitalization"],
			"Analyst Target Price": result["AnalystTargetPrice"],
			"52 Week High": result["52WeekHigh"],
			"52 Week Low": result["52WeekLow"]
        }
	];
	return new_data;
}

function parseGraphData(result) {
	
	var x = []
	var close = []
	var high = []
	var low = []
	var open = []
	var new_data = [{
		x: [],
		close: [],
		decreasing: { line: { color: '#FF0000' } },
		high: [],
		increasing: { line: { color: '#228B22' } },
		line: { color: 'rgba(31,119,180,1)' },
		low: [],
		open: [],
		type: 'candlestick',
		xaxis: 'x',
		yaxis: 'y'
	}]

	Object.entries(result["Time Series (Daily)"]).forEach((entry) => {
	
		x.push(entry[0])
		close.push(entry[1]['4. close'])
		open.push(entry[1]['1. open'])
		high.push(entry[1]['2. high'])
		low.push(entry[1]['3. low'])
	})
	new_data[0].x = x
	new_data[0].open = open
	new_data[0].close = close
	new_data[0].high = high
	new_data[0].low = low
	return new_data;

}

function parseIncomeData(result) {
	var new_data = 
		{
			"Symbol": result["symbol"],
			"Annual Report": [],
			"Quarterly Report": [],
		};
	result["annualReports"].forEach(function (attribute) {
		var annual_income_obj = {
			"Fiscal Date Ending": attribute["fiscalDateEnding"],
			"Reported Currency": attribute["reportedCurrency"],
			"Total Revenue": attribute["totalRevenue"],
			"Total Operating Expense": attribute["totalOperatingExpense"],
			"Cost Of Revenue": attribute["costOfRevenue"],
			"Gross Profit": attribute["grossProfit"],
			"Ebit": attribute["ebit"],
			"Net Income": attribute["netIncome"],
			"Research And Development": attribute["researchAndDevelopment"],
			"Effect Of Accounting Charges": attribute["effectOfAccountingCharges"],
			"Income Before Tax": attribute["incomeBeforeTax"],
			"Minority Interest": attribute["minorityInterest"],
			"Selling General Administrative": attribute["sellingGeneralAdministrative"],
			"Other Non Operating Income": attribute["otherNonOperatingIncome"],
			"Operating Income": attribute["operatingIncome"],
			"Other Operating Expense": attribute["otherOperatingExpense"],
			"Interest Expense": attribute["interestExpense"],
			"Tax Provision": attribute["taxProvision"],
			"Interest Income": attribute["interestIncome"],
			"Net Interest Income": attribute["netInterestIncome"],
			"Extraordinary Items": attribute["extraordinaryItems"],
			"Non Recurring": attribute["nonRecurring"],
			"Other Items": attribute["otherItems"],
			"Income Tax Expense": attribute["incomeTaxExpense"],
			"Total Other Income Expense": attribute["totalOtherIncomeExpense"],
			"Discontinued Operations": attribute["discontinuedOperations"],
			"Net Income From Continuing Operations": attribute["netIncomeFromContinuingOperations"],
			"Net Income Applicable To Common Shares": attribute["netIncomeApplicableToCommonShares"],
			"Preferred Stock And Other Adjustments": attribute["preferredStockAndOtherAdjustments"]
		};
		//console.log(annual_income_obj);
		new_data["Annual Report"].push(annual_income_obj);
	})

	result["quarterlyReports"].forEach(function (attribute) {
		var quarterly_income_obj = {
			"Fiscal Date Ending": attribute["fiscalDateEnding"],
			"Reported Currency": attribute["reportedCurrency"],
			"Total Revenue": attribute["totalRevenue"],
			"Total Operating Expense": attribute["totalOperatingExpense"],
			"Cost Of Revenue": attribute["costOfRevenue"],
			"Gross Profit": attribute["grossProfit"],
			"Ebit": attribute["ebit"],
			"Net Income": attribute["netIncome"],
			"Research And Development": attribute["researchAndDevelopment"],
			"Effect Of Accounting Charges": attribute["effectOfAccountingCharges"],
			"Income Before Tax": attribute["incomeBeforeTax"],
			"Minority Interest": attribute["minorityInterest"],
			"Selling General Administrative": attribute["sellingGeneralAdministrative"],
			"Other Non Operating Income": attribute["otherNonOperatingIncome"],
			"Operating Income": attribute["operatingIncome"],
			"Other Operating Expense": attribute["otherOperatingExpense"],
			"Interest Expense": attribute["interestExpense"],
			"Tax Provision": attribute["taxProvision"],
			"Interest Income": attribute["interestIncome"],
			"Net Interest Income": attribute["netInterestIncome"],
			"Extraordinary Items": attribute["extraordinaryItems"],
			"Non Recurring": attribute["nonRecurring"],
			"Other Items": attribute["otherItems"],
			"Income Tax Expense": attribute["incomeTaxExpense"],
			"Total Other Income Expense": attribute["totalOtherIncomeExpense"],
			"Discontinued Operations": attribute["discontinuedOperations"],
			"Net Income From Continuing Operations": attribute["netIncomeFromContinuingOperations"],
			"Net Income Applicable To Common Shares": attribute["netIncomeApplicableToCommonShares"],
			"Preferred Stock And Other Adjustments": attribute["preferredStockAndOtherAdjustments"]
		};
		//console.log(annual_income_obj);
		new_data["Quarterly Report"].push(quarterly_income_obj);
	})
	//new_data.push(result["Sector"]);
	return new_data;
}

function parseBalanceData(result) {
	var new_data =
	{
		"Symbol": result["symbol"],
		"Annual Report": [],
		"Quarterly Report": [],
	};
	result["annualReports"].forEach(function (attribute) {
		console.log(attribute);
		var annual_income_obj = {
			"Fiscal Date Ending": attribute["fiscalDateEnding"],
			"Reported Currency": attribute["reportedCurrency"],
			"Total Assets": attribute["totalAssets"],
			"Intangible Assets": attribute["intangibleAssets"],
			"Earning Assets": attribute["earningAssets"],
			"Other Current Assets": attribute["otherCurrentAssets"],
			"Total Liabilities": attribute["totalLiabilities"],
			"Total Shareholder Equity": attribute["totalLiabilities"],
			"Deferred Long Term Liabilities": attribute["deferredLongTermLiabilities"],
			"Other Current Liabilities": attribute["otherCurrentLiabilities"],
			"Common Stock": attribute["commonStock"],
			"Retained Earnings": attribute["retainedEarnings"],
			"Other Liabilities": attribute["otherLiabilities"],
			"Goodwill": attribute["goodwill"],
			"Other Assets": attribute["otherAssets"],
			"Cash": attribute["cash"],
			"Total Current Liabilities": attribute["totalCurrentLiabilities"],
			"Short Term Debt": attribute["shortTermDebt"],
			"Current Long Term Debt": attribute["currentLongTermDebt"],
			"Other Shareholder Equity": attribute["otherShareholderEquity"],
			"Property Plant Equipment": attribute["propertyPlantEquipment"],
			"Total Current Assets": attribute["totalCurrentAssets"],
			"Long Term Investments": attribute["longTermInvestments"],
			"Net Tangible Assets": attribute["netTangibleAssets"],
			"Short Term Investments": attribute["shortTermInvestments"],
			"Net Receivables": attribute["netReceivables"],
			"Long Term Debt": attribute["longTermDebt"],
			"Inventory": attribute["inventory"],
			"Accounts Payable": attribute["accountsPayable"],
			"Total Permanent Equity": attribute["totalPermanentEquity"],
			"Additional Paid In Capital": attribute["additionalPaidInCapital"],
			"Common Stock Total Equity": attribute["commonStockTotalEquity"],
			"Preferred Stock Total Equity": attribute["preferredStockTotalEquity"],
			"Retained Earnings Total Equity": attribute["retainedEarningsTotalEquity"],
			"Treasury Stock": attribute["treasuryStock"],
			"Accumulated Amortization": attribute["accumulatedAmortization"],
			"Other Non Currrent Assets": attribute["otherNonCurrrentAssets"],
			"Deferred Long Term Asset Charges": attribute["deferredLongTermAssetCharges"],
			"Total Non Current Assets": attribute["totalNonCurrentAssets"],
			"Capital Lease Obligations": attribute["capitalLeaseObligations"],
			"Total Long Term Debt": attribute["totalLongTermDebt"],
			"Other Non Current Liabilities": attribute["otherNonCurrentLiabilities"],
			"Total Non Current Liabilities": attribute["totalNonCurrentLiabilities"],
			"Negative Goodwill": attribute["negativeGoodwill"],
			"Warrants": attribute["warrants"],
			"Preferred Stock Redeemable": attribute["preferredStockRedeemable"],
			"Capital Surplus": attribute["capitalSurplus"],
			"Liabilities And Shareholder Equity": attribute["liabilitiesAndShareholderEquity"],
			"Cash And Short Term Investments": attribute["cashAndShortTermInvestments"],
			"Accumulated Depreciation": attribute["accumulatedDepreciation"], 
			"Common Stock Shares Outstanding": attribute["commonStockSharesOutstanding"]
		};
		//console.log(annual_income_obj);
		new_data["Annual Report"].push(annual_income_obj);
	})

	result["quarterlyReports"].forEach(function (attribute) {
		console.log(attribute);
		var quarterly_income_obj = {
			"Fiscal Date Ending": attribute["fiscalDateEnding"],
			"Reported Currency": attribute["reportedCurrency"],
			"Total Assets": attribute["totalAssets"],
			"Intangible Assets": attribute["intangibleAssets"],
			"Earning Assets": attribute["earningAssets"],
			"Other Current Assets": attribute["otherCurrentAssets"],
			"Total Liabilities": attribute["totalLiabilities"],
			"Total Shareholder Equity": attribute["totalLiabilities"],
			"Deferred Long Term Liabilities": attribute["deferredLongTermLiabilities"],
			"Other Current Liabilities": attribute["otherCurrentLiabilities"],
			"Common Stock": attribute["commonStock"],
			"Retained Earnings": attribute["retainedEarnings"],
			"Other Liabilities": attribute["otherLiabilities"],
			"Goodwill": attribute["goodwill"],
			"Other Assets": attribute["otherAssets"],
			"Cash": attribute["cash"],
			"Total Current Liabilities": attribute["totalCurrentLiabilities"],
			"Short Term Debt": attribute["shortTermDebt"],
			"Current Long Term Debt": attribute["currentLongTermDebt"],
			"Other Shareholder Equity": attribute["otherShareholderEquity"],
			"Property Plant Equipment": attribute["propertyPlantEquipment"],
			"Total Current Assets": attribute["totalCurrentAssets"],
			"Long Term Investments": attribute["longTermInvestments"],
			"Net Tangible Assets": attribute["netTangibleAssets"],
			"Short Term Investments": attribute["shortTermInvestments"],
			"Net Receivables": attribute["netReceivables"],
			"Long Term Debt": attribute["longTermDebt"],
			"Inventory": attribute["inventory"],
			"Accounts Payable": attribute["accountsPayable"],
			"Total Permanent Equity": attribute["totalPermanentEquity"],
			"Additional Paid In Capital": attribute["additionalPaidInCapital"],
			"Common Stock Total Equity": attribute["commonStockTotalEquity"],
			"Preferred Stock Total Equity": attribute["preferredStockTotalEquity"],
			"Retained Earnings Total Equity": attribute["retainedEarningsTotalEquity"],
			"Treasury Stock": attribute["treasuryStock"],
			"Accumulated Amortization": attribute["accumulatedAmortization"],
			"Other Non Currrent Assets": attribute["otherNonCurrrentAssets"],
			"Deferred Long Term Asset Charges": attribute["deferredLongTermAssetCharges"],
			"Total Non Current Assets": attribute["totalNonCurrentAssets"],
			"Capital Lease Obligations": attribute["capitalLeaseObligations"],
			"Total Long Term Debt": attribute["totalLongTermDebt"],
			"Other Non Current Liabilities": attribute["otherNonCurrentLiabilities"],
			"Total Non Current Liabilities": attribute["totalNonCurrentLiabilities"],
			"Negative Goodwill": attribute["negativeGoodwill"],
			"Warrants": attribute["warrants"],
			"Preferred Stock Redeemable": attribute["preferredStockRedeemable"],
			"Capital Surplus": attribute["capitalSurplus"],
			"Liabilities And Shareholder Equity": attribute["liabilitiesAndShareholderEquity"],
			"Cash And Short Term Investments": attribute["cashAndShortTermInvestments"],
			"Accumulated Depreciation": attribute["accumulatedDepreciation"],
			"Common Stock Shares Outstanding": attribute["commonStockSharesOutstanding"]
		};
		//console.log(annual_income_obj);
		new_data["Quarterly Report"].push(quarterly_income_obj);
	})
	//new_data.push(result["Sector"]);
	console.log(new_data);
	return new_data;
}

function parseCashData(result) {
	var new_data =
	{
		"Symbol": result["symbol"],
		"Annual Report": [],
		"Quarterly Report": [],
	};
	result["annualReports"].forEach(function (attribute) {
		var annual_income_obj = {
			"Fiscal Date Ending": attribute["fiscalDateEnding"],
			"Reported Currency": attribute["reportedCurrency"],
			"Investments": attribute["investments"],
			"Change In Liabilities": attribute["changeInLiabilities"],
			"Cashflow From Investment": attribute["cashflowFromInvestment"],
			"Other Cashflow From Investment": attribute["otherCashflowFromInvestment"],
			"Net Borrowings": attribute["netBorrowings"],
			"Cashflow From Financing": attribute["cashflowFromFinancing"],
			"other Cashflow From Financing": attribute["otherCashflowFromFinancing"],
			"Change In Operating Activities": attribute["changeInOperatingActivities"],
			"Net Income": attribute["netIncome"],
			"Change In Cash": attribute["changeInCash"],
			"Operating Cashflow": attribute["operatingCashflow"],
			"Other Operating Cashflow": attribute["otherOperatingCashflow"],
			"Depreciation": attribute["depreciation"],
			"Dividend Payout": attribute["dividendPayout"],
			"Stock Sale And Purchase": attribute["stockSaleAndPurchase"],
			"Change In Inventory": attribute["changeInInventory"],
			"Change In Account Receivables": attribute["changeInAccountReceivables"],
			"Change In Net Income": attribute["changeInNetIncome"],
			"Capital Expenditures": attribute["capitalExpenditures"],
			"Change In Receivables": attribute["changeInReceivables"],
			"Change In Exchange Rate": attribute["changeInExchangeRate"],
			"Change In Cash And Cash Equivalents": attribute["changeInCashAndCashEquivalents"]
		};
		new_data["Annual Report"].push(annual_income_obj);
	})

	result["quarterlyReports"].forEach(function (attribute) {
		var quarterly_income_obj = {
			"Fiscal Date Ending": attribute["fiscalDateEnding"],
			"Reported Currency": attribute["reportedCurrency"],
			"Investments": attribute["investments"],
			"Change In Liabilities": attribute["changeInLiabilities"],
			"Cashflow From Investment": attribute["cashflowFromInvestment"],
			"Other Cashflow From Investment": attribute["otherCashflowFromInvestment"],
			"Net Borrowings": attribute["netBorrowings"],
			"Cashflow From Financing": attribute["cashflowFromFinancing"],
			"other Cashflow From Financing": attribute["otherCashflowFromFinancing"],
			"Change In Operating Activities": attribute["changeInOperatingActivities"],
			"Net Income": attribute["netIncome"],
			"Change In Cash": attribute["changeInCash"],
			"Operating Cashflow": attribute["operatingCashflow"],
			"Other Operating Cashflow": attribute["otherOperatingCashflow"],
			"Depreciation": attribute["depreciation"],
			"Dividend Payout": attribute["dividendPayout"],
			"Stock Sale And Purchase": attribute["stockSaleAndPurchase"],
			"Change In Inventory": attribute["changeInInventory"],
			"Change In Account Receivables": attribute["changeInAccountReceivables"],
			"Change In Net Income": attribute["changeInNetIncome"],
			"Capital Expenditures": attribute["capitalExpenditures"],
			"Change In Receivables": attribute["changeInReceivables"],
			"Change In Exchange Rate": attribute["changeInExchangeRate"],
			"Change In Cash And Cash Equivalents": attribute["changeInCashAndCashEquivalents"]
		};
		new_data["Quarterly Report"].push(quarterly_income_obj);
	})
	return new_data;
}