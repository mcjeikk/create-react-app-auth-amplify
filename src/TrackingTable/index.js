import React, { Component } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import './index.css'
import CalendappContext from '../CalendappContext';
import Utils from '../Utils'
import moment from 'moment-timezone';

class TrackingTable extends Component {

    static contextType = CalendappContext

    constructor(props) {
        super(props)
        this.reference = props.reference

    }

    render() {

        let { events, setEvent, setShowModal, setActionEvent } = this.context

        const dateToday = moment()

        const clickInvoiceID = (event) => {

            let ev = events.filter(element => element.id === event.id)[0]

            console.log(ev);

            ev = Utils.translateEventByInvoice(ev)

            setEvent(ev);

            let cal = this.reference.current.getApi()
            cal.gotoDate(event.end)

            setActionEvent('edit');

            setShowModal(true)

        }

        const columnsPendingInvoices = [
            {
                title: 'Invoice',
                key: 'invoice.id_invoice',
                dataIndex: 'id_invoice',
                sorter: (a, b) => {

                    a = a.invoice.id_invoice
                    b = b.invoice.id_invoice

                    if (a.includes('-') && b.includes('-')) {
                        return parseInt(a.split('-')[1]) - parseInt(b.split('-')[1])
                    } else if (Number.isInteger(a) && Number.isInteger(b)) {
                        return parseInt(a) - parseInt(b)
                    } else {
                        return a.invoice.payment_date.localeCompare(b.invoice.payment_date)
                    }

                },

                width: '20%',

                render: (text, record, index) => {
                    return (
                        <a onClick={() => clickInvoiceID(record)}>{record.invoice.id_invoice}</a>
                    )
                },
            },
            {
                title: 'Total',
                key: 'total_invoice',
                dataIndex: 'name',
                sorter: (a, b) => a.invoice.total_invoice - b.invoice.total_invoice,
                width: '15%',
                render: (text, record, index) => {

                    if (record.invoice) {
                        return (
                            <span>{Utils.formatUSD(record.invoice.total_invoice)}</span>
                        )
                    } else {
                        return ('')
                    }

                },
            },
            {
                title: 'Client',
                key: 'client',
                dataIndex: 'name',
                sorter: (a, b) => a.client.name.localeCompare(b.client.name),

                width: '15%',
                render: (text, record, index) => {

                    if (record.client) {
                        return (
                            <span>{record.client.name.toUpperCase()}</span>
                        )
                    } else {
                        return ('')
                    }

                },
            },
            {
                title: 'Payment Date',
                key: 'invoice.payment_date',
                dataIndex: 'payment_date',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => { return a.invoice.payment_date.localeCompare(b.invoice.payment_date) },
                width: '20%',
                render: (text, record, index) => {
                    return record.invoice.payment_date
                },
            },
            {
                title: 'Event',
                key: 'event',
                dataIndex: 'event',
                width: '10%',
                render: (text, record, index) => {
                    return record.title.toUpperCase()
                },
            },


        ];

        const columnsPaidInvoices = [
            {
                title: 'Invoice',
                key: 'invoice.id_invoice',
                dataIndex: 'id_invoice',
                sorter: (a, b) => {

                    a = a.invoice.id_invoice
                    b = b.invoice.id_invoice

                    if (a.includes('-') && b.includes('-')) {
                        return parseInt(a.split('-')[1]) - parseInt(b.split('-')[1])
                    } else if (Number.isInteger(a) && Number.isInteger(b)) {
                        return parseInt(a) - parseInt(b)
                    } else {
                        return a.invoice.payment_date.localeCompare(b.invoice.payment_date)
                    }

                },

                width: '20%',

                render: (text, record, index) => {
                    return (
                        <a onClick={() => clickInvoiceID(record)}>{record.invoice.id_invoice}</a>
                    )
                },
            },
            {
                title: 'Total',
                key: 'total_invoice',
                dataIndex: 'name',
                sorter: (a, b) => a.invoice.total_invoice - b.invoice.total_invoice,
                width: '15%',
                render: (text, record, index) => {
                    if (record.invoice) {
                        return (
                            <span>{Utils.formatUSD(record.invoice.total_invoice)}</span>
                        )
                    } else {
                        return ('')
                    }

                },
            },
            {
                title: 'Client',
                key: 'client',
                dataIndex: 'name',
                sorter: (a, b) => a.client.name.localeCompare(b.client.name),

                width: '15%',
                render: (text, record, index) => {

                    if (record.client) {
                        return (
                            <span>{record.client.name.toUpperCase()}</span>
                        )
                    } else {
                        return ('')
                    }

                },
            },
            {
                title: 'Payment Date',
                key: 'invoice.payment_date',
                dataIndex: 'payment_date',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => { return a.invoice.payment_date.localeCompare(b.invoice.payment_date) },
                width: '20%',
                render: (text, record, index) => {
                    return record.invoice.payment_date
                },
            },
            {
                title: 'Event',
                key: 'event',
                dataIndex: 'event',
                width: '10%',
                render: (text, record, index) => {
                    return record.title.toUpperCase()
                },
            },


        ];

        return (

            <div className={'PrincipalContainerTableTracking'}>

                <h3>Pending Invoices</h3>

                <div className={'TableTackingContainer'}>
                    <Table
                        rowKey={(row) => row.id}
                        rowClassName={(record, index) => {
                            if (moment(record.invoice.payment_date).isBefore(dateToday)) {
                                return 'MarkInvoice'
                            }
                            return null
                        }}
                        pagination={false}
                        className={'TableTacking'}
                        columns={columnsPendingInvoices}
                        dataSource={events.filter(element => element.invoice && !element.invoice.paid)}
                        summary={() => {

                            let summary = []
                            let rows = []
                            let totalInvoices = 0

                            let invoices = events.filter(element => element.invoice && !element.invoice.paid)

                            let months = invoices.map(element => moment(element.invoice.payment_date).format())

                            months = months.sort();

                            //get unique months
                            months = [...new Set(months.map(element => moment(element).format('MMMM YYYY')))]

                            months.forEach(month => {

                                let totalMonth = invoices.map(element => moment(element.invoice.payment_date).format('MMMM YYYY') === month ? parseInt(element.invoice.total_invoice) : 0)

                                totalMonth = parseInt(totalMonth.reduce((accumulator, currentValue) => {
                                    return accumulator + currentValue
                                }));

                                let info = {
                                    month,
                                    totalMonth
                                }

                                summary.push(info)
                                totalInvoices += totalMonth

                            });

                            summary.forEach(element => {

                                rows.push(
                                    <Table.Summary.Row key={element['month']}>
                                        <Table.Summary.Cell index={0}><b>Total {element['month']}</b></Table.Summary.Cell>
                                        <Table.Summary.Cell index={4}><b>{Utils.formatUSD(element['totalMonth'])}</b></Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )


                            });



                            return (
                                <Table.Summary fixed>

                                    {rows}

                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0}><b>Summary</b></Table.Summary.Cell>
                                        <Table.Summary.Cell index={4}><b>{Utils.formatUSD(totalInvoices)}</b></Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>

                            )
                        }}
                    />

                </div>

                <h3>Paid Invoices</h3>

                <div className={'TableTackingContainer'}>
                    <Table
                        rowKey={(row) => row.id}
                        pagination={false}
                        className={'TableTacking'}
                        columns={columnsPaidInvoices}
                        dataSource={events.filter(element => element.invoice && element.invoice.paid)}
                        summary={() => {

                            let summary = []
                            let rows = []
                            let totalInvoices = 0

                            let invoices = events.filter(element => element.invoice && element.invoice.paid)

                            let months = invoices.map(element => moment(element.invoice.payment_date).format())

                            months = months.sort();

                            //get unique months
                            months = [...new Set(months.map(element => moment(element).format('MMMM YYYY')))]

                            months.forEach(month => {

                                let totalMonth = invoices.map(element => moment(element.invoice.payment_date).format('MMMM YYYY') === month ? parseInt(element.invoice.total_invoice) : 0)

                                totalMonth = totalMonth.reduce((accumulator, currentValue) => {
                                    return accumulator + currentValue
                                });

                                let info = {
                                    month,
                                    totalMonth
                                }

                                summary.push(info)
                                totalInvoices += totalMonth

                            });

                            summary.forEach(element => {

                                rows.push(
                                    <Table.Summary.Row key={element['month']}>
                                        <Table.Summary.Cell index={0}><b>Total {element['month']}</b></Table.Summary.Cell>
                                        <Table.Summary.Cell index={4}><b>{Utils.formatUSD(element['totalMonth'])}</b></Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )


                            });

                            const a = [...new Set(rows.map((row) => row.key.split(" ")[1]))]

                            return (
                                <Table.Summary fixed>

                                    {rows}

                                    {a.map((year) => {

                                        let totalYear = summary.filter((element) => element.month.split(" ")[1] === year)

                                        totalYear = totalYear.map((element) => element.totalMonth)

                                        totalYear = totalYear.reduce((accumulator, currentValue) => {
                                            return accumulator + currentValue
                                        });

                                        return (<Table.Summary.Row key={year}>
                                            <Table.Summary.Cell index={0}><b>Summary {year}</b></Table.Summary.Cell>
                                            <Table.Summary.Cell index={4}><b>{Utils.formatUSD(totalYear)}</b></Table.Summary.Cell>
                                        </Table.Summary.Row>)

                                    })}

                                    <Table.Summary.Row >
                                        <Table.Summary.Cell index={0}><b>Total</b></Table.Summary.Cell>
                                        <Table.Summary.Cell index={4}><b>{Utils.formatUSD(totalInvoices)}</b></Table.Summary.Cell>
                                    </Table.Summary.Row>


                                </Table.Summary>

                            )
                        }}
                    />

                </div>





            </div>


        );
    }



}

export default TrackingTable;