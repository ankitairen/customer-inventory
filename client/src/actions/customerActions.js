export const GET_CUSTOMERS = 'GET CUSTOMERS'
export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS'
export const GET_CUSTOMERS_FAILURE = 'GET_CUSTOMERS_FAILURE'
export const GET_CUSTOMER_ADDRESS = 'GET CUSTOMER ADDRESS'
export const GET_CUSTOMER_ADDRESS_SUCCESS = 'GET_CUSTOMER_ADDRESS_SUCCESS'
export const GET_CUSTOMER_ADDRESS_FAILURE = 'GET_CUSTOMER_ADDRESS_FAILURE'

export const getCustomers = () => ({ type: GET_CUSTOMERS })

export const getCustomersSuccess = customers => ({
    type: GET_CUSTOMERS_SUCCESS,
    payload: customers,
})
export const getCustomersFailure = () => ({ type: GET_CUSTOMERS_FAILURE })

export function fetchCustomers() {
    return async dispatch => {
        dispatch(getCustomers())
        try {
            const response = await fetch('/api/customers/customer-details')
            const data = await response.json()

            dispatch(getCustomersSuccess(data.data))
        } catch (error) {
            dispatch(getCustomersFailure())
        }
    }
}

export const getCustomerAddress = (customerId) => ({
    type: GET_CUSTOMER_ADDRESS,
    payload: customerId
})

export const getCustomerAddressSuccess = customerAddress => ({
    type: GET_CUSTOMER_ADDRESS_SUCCESS,
    payload: customerAddress,
})
export const getCustomerAddressFailure = () => ({ type: GET_CUSTOMER_ADDRESS_FAILURE })

export function fetchCustomerAddress(customerId) {
    return async dispatch => {
        dispatch(getCustomerAddress(customerId))
        try {
            const response = await fetch(`/api/customers/${customerId}`)
            const data = await response.json()

            dispatch(getCustomerAddressSuccess(data))
        } catch (error) {
            dispatch(getCustomerAddressFailure())
        }
    }
}