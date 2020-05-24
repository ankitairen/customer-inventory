import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchCustomers, fetchCustomerAddress } from '../actions/customerActions'

import { Table } from '../components/Table';

import { customersTableHeadings, customerAddressTableHeadings } from '../utils/constants'

const CustomersContainer = ({ dispatch, loading, hasErrors, customers, selectedCustomer, customerAddress }) => {
    useEffect(() => {
        dispatch(fetchCustomers())
    }, [dispatch])

    const handleCustomerRowClick = (customerId) => {
        dispatch(fetchCustomerAddress(customerId))
    }

    const renderCustomers = () => {
        return (
            <Table
                tableData={customers}
                tableHeadings={customersTableHeadings}
                tableCaption={"Customers Table"}
                primaryKey={"customerId"}
                clickHandler={handleCustomerRowClick}
                tableStyle={{ cursor: "pointer" }}
            />
        )
    }

    const renderCustomerAddress = () => {
        return (
            <Table
                tableData={customerAddress}
                tableHeadings={customerAddressTableHeadings}
                tableCaption={`Customer - ${selectedCustomer} - Address Table`}
                primaryKey={"customerId"}
            />
        )
    }
    return (
        <Fragment>
            {!!customers.length && renderCustomers()}
            {!!customerAddress.length && renderCustomerAddress()}
        </Fragment>
    );
}

const mapStateToProps = state => ({
    loading: state.customer.loading,
    hasErrors: state.customer.hasErrors,
    customers: state.customer.customers,
    selectedCustomer: state.customer.selectedCustomer,
    customerAddress: state.customer.customerAddress
})

export default connect(mapStateToProps)(CustomersContainer)
