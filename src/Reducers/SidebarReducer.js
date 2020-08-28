

const initialState = {
    graph: { status: true, data: [] },
    info: { status: false, data: [] },
    income: { status: false, data: [] },
    balance: { status: false, data: [] },
    cashflow: { status: false, data: [] }
}


export const updateSidebar = (state = initialState, action) => {
    switch (action.type) {
        case "GRAPH":
            return { ...state, graph: action.payload, info: false, income: false, balance: false, cashflow: false };
        case "INFO":
            return { ...state, info: action.payload, graph: false, income: false, balance: false, cashflow: false};
        case "INCOME":
            return { ...state, income: action.payload, graph: false, info: false, balance: false, cashflow: false};
        case "BALANCE":
            return { ...state, balance: action.payload, graph: false, income: false, info: false, cashflow: false};
        case "CASHFLOW":
            return { ...state, cashflow: action.payload, graph: false, income: false, balance: false, info: false };
        default:
            return initialState;
    }

};

