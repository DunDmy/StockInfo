const axios = require('axios')


// search field
export const setSearchField = (text) => (
{
	type: 'CHANGE_SEARCH_FIELD',
	payload: text
	})

// submit field
const setSubmitField = (data) => ({
    type: 'SUBMIT',
    payload: data
})


export const search = (text) => {
    var data = []
   var stock = text;
    return dispatch => {
        axios
            .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo`)
            .then(res => {
                data = fetchData(res.data);
                    dispatch(setSubmitField(data));
            })
            .catch(err => {
                console.log(err);
            })
    }

}

// search field
export const initial_load = () => {
    var data = []
   var stock = 'SPY';
    return dispatch => {
        axios
            .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo`)
            .then(res => {
                data = fetchData(res.data);
                dispatch(setSubmitField(data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}


 function fetchData(result) {
    // ploty data format for candlestick graph
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
   //create a new data structure for ploty
                Object.entries(result["Time Series (Daily)"]).forEach((entry) => {
                    //var key = Object.keys(entry[1])
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
