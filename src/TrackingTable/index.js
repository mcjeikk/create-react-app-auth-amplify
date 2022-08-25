import React, { Component } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import './index.css'
import CalendappContext from '../CalendappContext';


class TrackingTable extends Component {

    static contextType = CalendappContext

    render() {

        let { event, events, showModal,
            setShowModal, setActionEvent,
            setEvent, setEvents
        } = this.context


        const columns = [
            {
                title: 'Invoice',
                dataIndex: 'invoice',
                onFilter: (value, record) => record.address.startsWith(value),
                width: '15%'
            },
            {
                title: 'Payment Date',
                dataIndex: 'payment_date',
                sorter: (a, b) => { console.log(a); a.payment_date.startsWith(b) },
                width: '20%'
            },
            {
                title: 'Event',
                dataIndex: 'event',
                sorter: (a, b) => a.age - b.age,
                width: '10%'
            },
            {
                title: 'Client',
                dataIndex: 'client',
                sorter: (a, b) => a.age - b.age,
                width: '15%'
            },
        ];
        const data = [
            {
                key: '1',
                invoice: 'JSON-9434',
                client: 'GLOBAL',
                payment_date: '2020-08-22',
                event: 'Developing',
            },
            {
                key: '1',
                invoice: 'JSON-94',
                client: 'GLOBAL',
                payment_date: '2020-08-22',
                event: 'Developing',
            },
            {
                key: '1',
                invoice: 'JSON-94',
                client: 'GLOBAL',
                payment_date: '2020-08-22',
                event: 'Developing',
            },
            {
                key: '1',
                invoice: 'JSON-94',
                client: 'GLOBAL',
                payment_date: '2020-08-22',
                event: 'Developing',
            },
        ];

        return (

            <div className={'PrincipalContainerTableTracking'}>

                <h3>Pending Invoices</h3>

                <div className={'TableTackingContainer'}>
                    <Table className={'TableTacking'} columns={columns} dataSource={data} />
                </div>

            </div>


        );
    }



}

export default TrackingTable;