export const initialInputsState = {
    revenue: 0,
    netProfit: 0,
    sde: 0,
    sellingPrice: 0,
};

export function inputsReducer(state: typeof initialInputsState, action: { type: any; payload: any; }) {
    switch (action.type) {
        case 'setRevenue':
            return { ...state, revenue: action.payload.revenue };
        case 'setNetProfit':
            return { ...state, netProfit: action.payload.netProfit };
        case 'setSde':
            return { ...state, sde: action.payload.sde };
        case 'setSellingPrice':
            return { ...state, sellingPrice: action.payload.sellingPrice };
        default:
            return state;
    }
}

