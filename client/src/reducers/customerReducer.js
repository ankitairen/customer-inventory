import * as actions from '../actions/customerActions'

export const initialState = {
    customers: [],
    customerAddress: [],
    loading: false,
    hasErrors: false,
    selectedCustomer: ''
}

export default function customerReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_CUSTOMERS:
            return { ...state, loading: true }
        case actions.GET_CUSTOMERS_SUCCESS:
            return { ...state, customers: action.payload, loading: false, hasErrors: false }
        case actions.GET_CUSTOMERS_FAILURE:
            return { ...state, loading: false, hasErrors: true }
        case actions.GET_CUSTOMER_ADDRESS:
            return { ...state, loading: true, selectedCustomer: action.payload }
        case actions.GET_CUSTOMER_ADDRESS_SUCCESS:
            return { ...state, customerAddress: action.payload, loading: false, hasErrors: false }
        case actions.GET_CUSTOMER_ADDRESS_FAILURE:
            return { ...state, loading: false, hasErrors: true }
        default:
            return state
    }
}
