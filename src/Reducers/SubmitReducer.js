

const initialState = {
	searchField: 'SPY'
}

export const submitStock = (state = initialState, action ) => {
	//console.log(initialState);
	//console.log(action);
	switch (action.type) {
		case "SUBMIT":
			return { ...state, searchField: action.payload };
		default:
			return initialState;
	}

};