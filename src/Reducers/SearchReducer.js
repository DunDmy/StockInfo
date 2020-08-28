
const initialState = {
	searchField: '',
	submitField: 'SPY',
    data: [{
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
    }],
    layout: {
        width: 1500,
        height: 700,
        font: { color: '#fff' },
        title: { text: 'Stock', xanchor: "left", x: 0 }, paper_bgcolor: '#FFFDE4', plot_bgcolor: '#FFFDE4', yaxis: { showgrid: true, color: '#000000' },
        xaxis: {
            zeroline: true, color: '#000000', showgrid: true, rangeslider: {
                visible: false
            }
        }
    }
}


export const searchStock = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_SEARCH_FIELD":
            return { ...state, searchField: action.payload };
		case "SUBMIT":
            //console.log("STOCK");
            //console.log(action.payload);
            return { ...state, data: action.payload };
        case "TEST":
            //console.log("TEST");
            return { ...state, data: action.payload };
		default:
			return initialState;
	}

};
