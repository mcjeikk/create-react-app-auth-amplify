import React, { Component } from 'react';
import './index.css'
import CalendappContext from '../CalendappContext';
import Modal from 'react-modal';
import { MdDangerous } from 'react-icons/md'
import { Collapse } from 'antd';

// import "antd/dist/antd.css";
const { Panel } = Collapse;

class AddEvent extends Component {

    static contextType = CalendappContext

    render() {

        let { setShowModal, actionEvent, showModalConfirmDelete, setShowModalConfirmDelete,
            timezone, setTimezone,
            from, setFrom,
            to, setTo,
            title, setTitle,
            notes, setNotes,
            client, setClient,
            course, setCourse,
            totalHours, setTotalHours,
            costHour, setCostHour,
            paymentCondition, setPaymentCondition } = this.context

        let titlev2 = ''

        const onClickCancel = (event) => {
            event.preventDefault()
            setShowModal(false)
        }

        const onClickDelete = (event) => {
            event.preventDefault()
            setShowModalConfirmDelete(true)
        }

        const onClickCancelConfirm = (event) => {
            event.preventDefault()
            setShowModalConfirmDelete(false)
        }

        const onChangeTimeZone = (event) => {
            setTimezone(event.target.value)
        }

        const onChangeFrom = (event) => {
            setFrom(event.target.value)
        }

        const onChangeTo = (event) => {
            setTo(event.target.value)
        }

        const onChangeTitle = (event) => {
            setTitle(event.target.value)
        }

        const onChangeNotes = (event) => {
            setNotes(event.target.value)
        }

        const onChangeClient = (event) => {
            setClient(event.target.value)
        }

        const onChangeCourse = (event) => {
            setCourse(event.target.value)
        }

        const onChangeTotalHours = (event) => {
            setTotalHours(event.target.value)
        }

        const onChangeCostHour = (event) => {
            setCostHour(event.target.value)
        }

        const onChangePaymentCondition = (event) => {
            setPaymentCondition(event.target.value)
        }

        const onClickCreate = async (event) => {
            event.preventDefault()

            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let item = {
                "timezone": timezone,
                "start": from,
                "end": to,
                "title": title,
                "notes": notes,
            }

            if (totalHours.length > 0) {
                item.total_hours = totalHours
            }

            if (course.length > 0) {
                item.course = course
            }

            if (client.length > 0) {
                item.client = {
                    name: client,
                    cost_per_hour: costHour,
                    // currency : currency,
                    payment_cond_days: paymentCondition,
                    // country : country
                    //email : []

                }
            }


            let bodyContent = JSON.stringify({
                "invoice": {
                    "id": "JSON-123",
                    "sent": "2022-08-06",
                    "payment_date": "2022-09-06",
                    "paid": true,
                    "total_invoice": 23456,
                    "url_invoice": "23456ertyu"
                }
            });

            // let response = await fetch("https://c9ge3dujm1.execute-api.us-east-2.amazonaws.com/prod/create_event", {
            //     method: "POST",
            //     body: bodyContent,
            //     headers: headersList
            // });

            // let data = await response.text();
            // console.log(data);

        }

        const customStyles = {
            content: {
                top: '30rem',
                // height: '30rem',
                // width: '100rem',
                // minWidth: '100%',
                // marginRight: '1rem',
                // marginLeft: '1rem',
                left: '3rem',
                right: '3rem',
                bottom: 'auto',
                padding: '0',
            }
        }

        return (

            <main className='MainContainerEvent'>

                <h2>Add Event</h2>

                <div className='ContainerEvent'>

                    <label htmlFor={'timezone'}>TimeZone</label>
                    <select name={"timezone"} id={"timezone"} value={timezone} onChange={onChangeTimeZone}>
                        <option defaultValue="America/Bogota" value={"America/Bogota"}>Colombia, Bogota</option>
                        <option value={"Europe/Madrid"}>Madrid, España</option>
                        <option value={"Pacific/Honolulu"}>Hawaii</option>
                        <option value={"Pacific/Marquesas"}>Taiohae</option>
                    </select>

                    <label htmlFor={'start'}>From</label>
                    <input name={"start"} type={"datetime-local"} value={from} onChange={onChangeFrom}></input>

                    <label htmlFor={'end'}>To</label>
                    <input name={"end"} type={"datetime-local"} value={to} onChange={onChangeTo}></input>

                    <label htmlFor={'title'}>Title</label>
                    <input name={"title"} type={"text"} required={true} value={title} onChange={onChangeTitle}></input>

                    <label htmlFor={'notes'} >Notes</label>
                    <textarea name={"notes"} rows="4" value={notes} onChange={onChangeNotes}></textarea>

                    <Collapse accordion defaultActiveKey={['1']} destroyInactivePanel={true} className={'CollapseCustom'}>
                        <Panel header="Client" key="1">
                            <label htmlFor={'client'}>Client</label>
                            <input name={"client"} type={"text"} placeholder={"Client"} value={client} onChange={onChangeClient}></input>

                            <label htmlFor={'course'}>Course</label>
                            <input name={"course"} type={"text"} placeholder={"Course"} value={course} onChange={onChangeCourse}></input>

                            <label htmlFor={'total_hours'}>Total Hours</label>
                            <input name={"total_hours"} type={"number"} placeholder={"Total Hours"} value={totalHours} onChange={onChangeTotalHours}></input>

                            <label htmlFor={'cost_per_hour'}>Cost/Hour</label>
                            <input name={"cost_per_hour"} type={"number"} placeholder={"Cost Per Hour"} value={costHour} onChange={onChangeCostHour}></input>

                            <label htmlFor={'payment_condition'}>Payment Condition</label>
                            <input name={"payment_condition"} type={"number"} placeholder={"Payment Condition in days"} value={paymentCondition} onChange={onChangePaymentCondition}></input>

                        </Panel>
                        <Panel header="Invoice" key="2">
                            <label htmlFor={'id_invoice'}>Number</label>
                            <input name={"id_invoice"} type={"text"} placeholder={"Invoice Number"} value={paymentCondition} onChange={onChangePaymentCondition}></input>

                            <label htmlFor={'sent'}>Sent</label>
                            <input name={"sent"} type={"checkbox"} value={paymentCondition} onChange={onChangePaymentCondition}></input>

                            <label htmlFor={'payment_date'}>Payment Date</label>
                            <input name={"payment_date"} type={"date"} value={paymentCondition} onChange={onChangePaymentCondition}></input>

                            <label htmlFor={'paid'}>Paid</label>
                            <input name={"paid"} type={"checkbox"} value={paymentCondition} onChange={onChangePaymentCondition}></input>

                            <label htmlFor={'total_invoice'}>Total Invoice</label>
                            <input name={"total_invoice"} type={"text"} placeholder={"Total"} value={paymentCondition} onChange={onChangePaymentCondition}></input>

                            <label htmlFor={'pdf_invoice'}>PDF</label>
                            <input name={"pdf_invoice"} type={"text"} placeholder={"Invoice Number"} value={paymentCondition} onChange={onChangePaymentCondition}></input>

                        </Panel>
                    </Collapse>




                </div>



                {actionEvent === 'create' && (
                    <div className='ButtonsAddEventContainer'>
                        <button className='CreateButton' onClick={onClickCreate}>Create Event</button>
                        <button className='CancelButton' onClick={onClickCancel}>Cancel</button>
                    </div>
                )}

                {actionEvent === 'edit' && (
                    <div className='ButtonsEditEventContainer'>
                        <button className='CreateButton'>Edit Event</button>
                        <button className='DeleteButton' onClick={onClickDelete}>Delete Event</button>
                        <button className='CancelButton' onClick={onClickCancel}>Cancel</button>
                    </div>
                )}

                <Modal
                    isOpen={showModalConfirmDelete}
                    style={customStyles}
                    ariaHideApp={false}>
                    <main className='ModalContainerConfirmDelete'>

                        <div className='ModalMessageConfirmation'>
                            <MdDangerous className='IconDanger' />
                            <p>You are about delete this event. <br /> Are you sure?</p>
                        </div>

                        <button className='CreateButton' >OK</button>
                        <button className='CancelButton' onClick={onClickCancelConfirm}>Cancel</button>

                    </main>
                </Modal>


            </main>


        );
    }



}

export default AddEvent;