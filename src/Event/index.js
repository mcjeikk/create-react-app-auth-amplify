import React, { Component } from 'react';
import './index.css'
import CalendappContext from '../CalendappContext';
import Modal from 'react-modal';
import { MdDangerous } from 'react-icons/md'
import { Collapse } from 'antd';
import { showNotification } from '../Utils'
const { Panel } = Collapse;

class AddEvent extends Component {

    static contextType = CalendappContext

    componentDidMount() {

        let { event, setEvent, actionEvent, getHoursDates } = this.context

        if (actionEvent === 'create') {
            this.clearEventForm()
            event.setTotalHours = getHoursDates(event.from, event.to)
            setEvent(event)

        } else if (actionEvent === 'edit') {

        }

    }

    fillEventForm() {

        let { event, setEvent } = this.context



    }

    clearEventForm() {

        let { event, setEvent } = this.context

        event.timezone = ''
        event.from = ''
        event.to = ''
        event.totalHours = ''
        event.title = ''
        event.notes = ''
        event.client = ''
        event.course = ''
        event.idInvoice = ''
        event.country = ''
        event.currency = ''
        event.costHour = ''
        event.totalInvoice = ''
        event.paymentCondition = ''
        event.paymentDate = ''
        event.sent = false
        event.paid = false

        setEvent(event)

    }

    render() {

        let { setShowModal, actionEvent,
            showModalConfirmDelete, setShowModalConfirmDelete,
            formatDate, getHoursDates,
            event, setEvent
        } = this.context

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
            event.timezone = event.target.value
            setTimezone(event.target.value)
            document.getElementById('timezone').classList.remove("EmptyField");
        }

        const onChangeFrom = (event) => {
            setFrom(event.target.value)
            document.getElementById('from').classList.remove("EmptyField");
        }

        const onChangeTo = (event) => {
            setTo(event.target.value)
            document.getElementById('to').classList.remove("EmptyField");
        }

        // eslint-disable-next-line no-extend-native
        Date.prototype.addDays = function (days) {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        const onBlurTo = (event) => {

            let totalHours = getHoursDates(from, to)
            setTotalHours(totalHours)
            document.getElementById('total_hours').classList.remove("EmptyField");
        }

        const onChangeTitle = (event) => {
            setTitle(event.target.value)
            document.getElementById('title').classList.remove("EmptyField");
        }

        const onChangeNotes = (event) => {
            setNotes(event.target.value)
        }

        const onChangeClient = (event) => {
            setClient(event.target.value)
        }

        const onChangeCourse = (event) => {
            setCourse(event.target.value)
            document.getElementById('course').classList.remove("EmptyField");
        }

        const onChangeTotalHours = (event) => {
            setTotalHours(event.target.value)
            document.getElementById('total_hours').classList.remove("EmptyField");
        }

        const onChangeCostHour = (event) => {
            setCostHour(event.target.value)
            document.getElementById('cost_per_hour').classList.remove("EmptyField");
        }

        const onBlurCostHour = (event) => {
            setTotalInvoice(costHour * totalHours)
            document.getElementById('total_invoice').classList.remove("EmptyField");
        }

        const onChangePaymentCondition = (event) => {
            setPaymentCondition(event.target.value)
            document.getElementById('payment_condition').classList.remove("EmptyField");
        }

        const onChangeIdInvoice = (event) => {
            setIdInvoice(event.target.value)
        }

        const onChangeCountry = (event) => {
            setCountry(event.target.value)
            document.getElementById('country').classList.remove("EmptyField");
        }

        const onBlurCountry = (event) => {
            setCurrency('USD')
            document.getElementById('currency').classList.remove("EmptyField");
        }

        const onChangeSent = (event) => {
            setSent(event.target.checked)
        }

        const onChangePaymentDate = (event) => {
            setPaymentDate(event.target.value)
            document.getElementById('payment_date').classList.remove("EmptyField");
        }

        const onBlurPaymentCondition = (event) => {
            let date_to = new Date(to)
            console.log(date_to.addDays(30));
            date_to = date_to.addDays(parseInt(paymentCondition))
            setPaymentDate(formatDate(date_to))
            document.getElementById('payment_date').classList.remove("EmptyField");

        }

        const onChangePaid = (event) => {
            setPaid(event.target.checked)
        }

        const onChangeTotalInvoice = (event) => {
            setTotalInvoice(event.target.value)
            document.getElementById('total_invoice').classList.remove("EmptyField");
        }

        const onChangeCurrency = (event) => {
            setCurrency(event.target.value)
            document.getElementById('currency').classList.remove("EmptyField");
        }

        const isValidEvent = () => {

            let validEvent = true

            if (timezone === '') {
                // showNotification('error', 'Time Zone empty', 4000)
                document.getElementById('timezone').classList.add("EmptyField");
                validEvent = false
            }

            if (from === '' || to === '') {
                // showNotification('error', 'Dates must not empty', 4000)
                document.getElementById('from').classList.add("EmptyField");
                document.getElementById('to').classList.add("EmptyField");
                validEvent = false
            }
            if (title === '') {
                // showNotification('error', 'Title empty', 4000)
                document.getElementById('title').classList.add("EmptyField");
                validEvent = false
            }
            if (client !== '') {

                if (course === '') {
                    // showNotification('error', 'Course Empty', 4000)
                    document.getElementById('course').classList.add("EmptyField");
                    validEvent = false
                }

            }

            if (idInvoice !== '') {

                if (country === '') {
                    // showNotification('error', 'Country Empty', 4000)
                    document.getElementById('country').classList.add("EmptyField");
                    validEvent = false
                }

                if (currency === '') {
                    // showNotification('error', 'Currency Empty', 4000)
                    document.getElementById('currency').classList.add("EmptyField");
                    validEvent = false
                }

                if (costHour === '') {
                    // showNotification('error', 'Cost Per Hour Empty', 4000)
                    document.getElementById('cost_per_hour').classList.add("EmptyField");
                    validEvent = false
                }

                if (totalInvoice === '') {
                    // showNotification('error', 'Total Invoice Empty', 4000)
                    document.getElementById('total_invoice').classList.add("EmptyField");
                    validEvent = false
                }

                if (paymentCondition === '') {
                    // showNotification('error', 'Payment Condition Empty', 4000)
                    document.getElementById('payment_condition').classList.add("EmptyField");
                    validEvent = false
                }

                if (paymentDate === 'NaN-NaN-NaN' || paymentDate === '') {
                    // showNotification('error', 'Payment Date Empty', 4000)
                    document.getElementById('payment_date').classList.add("EmptyField");
                    validEvent = false
                }

            }

            if (!validEvent) {
                showNotification('error', 'Check invalid fields', 4000)
            }
            return validEvent;
        }


        const onClickCreate = async (event) => {
            event.preventDefault()

            if (isValidEvent()) {

                let headersList = {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                }

                let item = {
                    timezone: timezone,
                    start: from,
                    end: to,
                    total_hours: totalHours,
                    title: title,
                    notes: notes,
                }

                if (client.length > 0) {
                    item.client = {
                        name: client,
                        course: course
                    }
                }


                if (idInvoice.length > 0) {
                    item.invoice = {
                        idInvoice: idInvoice,
                        country: country,
                        currency: currency,
                        cost_per_hour: costHour,
                        total_invoice: totalInvoice,
                        payment_cond_days: paymentCondition,
                        payment_date: paymentDate,
                        paid: paid,
                        sent: sent,
                        // url_invoice: pdfInvoice
                    }
                }

                let bodyContent = JSON.stringify(item);

                console.log(item)
                let response = await fetch("https://c9ge3dujm1.execute-api.us-east-2.amazonaws.com/prod/create_event", {
                    method: "POST",
                    body: bodyContent,
                    headers: headersList
                });

                let data = await response.json();
                console.log(data);

                showNotification('success', "asdasd")

                setShowModal(false)

            }



        }

        const customStyles = {
            content: {
                top: '30rem',
                // height: '10rem',
                // width: '100rem',
                // minWidth: '100%',
                // marginRight: '1rem',
                // marginLeft: '1rem',
                left: '3rem',
                right: '3rem',
                // bottom: 'auto',
                padding: '0',
                // overflowY : 'auto'
            }
        }

        return (

            <main className='MainContainerEvent' >

                <h2>Add Event</h2>

                <div className='ContainerEvent'>

                    <label htmlFor={'timezone'}>TimeZone</label>
                    <select required={true} name={"timezone"} id={"timezone"} value={timezone} onChange={onChangeTimeZone}>
                        <option disabled defaultValue="" value=''> -- select an option -- </option>
                        <option value={"America/Bogota"}>Colombia, Bogota</option>
                        <option value={"Europe/Madrid"}>Madrid, España</option>
                        <option value={"Pacific/Honolulu"}>Hawaii</option>
                        <option value={"Pacific/Marquesas"}>Taiohae</option>
                    </select>

                    <label htmlFor={'start'}>From</label>
                    <input required={true} id={'from'} name={"start"} type={"datetime-local"} value={from} onChange={onChangeFrom}></input>

                    <label htmlFor={'end'}>To</label>
                    <input required={true} id={'to'} name={"end"} type={"datetime-local"} value={to} onChange={onChangeTo} onBlur={onBlurTo}></input>

                    <label htmlFor={'total_hours'}>Total Hours</label>
                    <input required={true} id={'total_hours'} name={"total_hours"} type={"number"} placeholder={"Total Hours"} value={totalHours} onChange={onChangeTotalHours}></input>

                    <label htmlFor={'title'}>Title</label>
                    <input name={"title"} id={'title'} type={"text"} required={true} value={title} onChange={onChangeTitle}></input>

                    <label htmlFor={'notes'} >Notes</label>
                    <textarea name={"notes"} id={'notes'} rows="4" value={notes} onChange={onChangeNotes}></textarea>

                    <Collapse accordion defaultActiveKey={['1']} destroyInactivePanel={true} className={'CollapseCustom'}>
                        <Panel header="Client" key="1">
                            <label htmlFor={'client'}>Client</label>
                            <input name={"client"} type={"text"} placeholder={"Client"} value={client} onChange={onChangeClient}></input>

                            <label htmlFor={'course'}>Course</label>
                            <input name={"course"} id={'course'} type={"text"} placeholder={"Course"} value={course} onChange={onChangeCourse}></input>

                        </Panel>
                        <Panel header="Invoice" key="2">

                            <label htmlFor={'id_invoice'}>Number</label>
                            <div>
                                <input style={{ marginRight: '-3rem', }} name={"id_invoice"} type={"text"} placeholder={"Invoice Number"} value={idInvoice} onChange={onChangeIdInvoice} />
                                <button style={{ borderRadius: '8rem', border: 0 }}>Gen</button>
                            </div>

                            <label htmlFor={'country'}>Country</label>
                            <input name={"country"} id={"country"} type={"text"} placeholder={"Country"} value={country} onChange={onChangeCountry} onBlur={onBlurCountry}></input>


                            <label htmlFor={'currency'}>Currency</label>
                            <select name={"currency"} id={"currency"} value={currency} onChange={onChangeCurrency}>
                                <option disabled defaultValue="" value=''> -- select an option -- </option>
                                <option value={"USD"}>USD</option>
                                <option value={"EUR"}>EUR</option>
                                <option value={"COP"}>COP</option>
                            </select>
                            {/* <input name={"currency"} type={"text"} placeholder={"Currency"} value={currency} onChange={onChangeCurrency}></input> */}

                            <label htmlFor={'cost_per_hour'}>Cost/Hour</label>
                            <input name={"cost_per_hour"} id={"cost_per_hour"} type={"number"} placeholder={"Cost Per Hour"} value={costHour} onChange={onChangeCostHour} onBlur={onBlurCostHour}></input>

                            <label htmlFor={'total_invoice'}>Total Invoice</label>
                            <input name={"total_invoice"} id={"total_invoice"} type={"text"} placeholder={"Total"} value={totalInvoice} onChange={onChangeTotalInvoice}></input>

                            <label htmlFor={'payment_condition'}>Payment Condition</label>
                            <input name={"payment_condition"} id={"payment_condition"} type={"number"} placeholder={"Payment Condition in days"} value={paymentCondition} onChange={onChangePaymentCondition} onBlur={onBlurPaymentCondition}></input>

                            <label htmlFor={'payment_date'}>Payment Date</label>
                            <input name={"payment_date"} id={"payment_date"} type={"date"} value={paymentDate} onChange={onChangePaymentDate} ></input>

                            <label htmlFor={'sent'}>Sent</label>
                            <input name={"sent"} type={"checkbox"} value={sent} onChange={onChangeSent}></input>

                            <label htmlFor={'paid'}>Paid</label>
                            <input name={"paid"} type={"checkbox"} value={paid} onChange={onChangePaid}></input>

                        </Panel>
                    </Collapse>

                </div>



                {actionEvent === 'create' && (
                    <div className='ButtonsAddEventContainer'>
                        <button className='CreateButton' onClick={onClickCreate}>Create Event</button>
                        <button className='CancelButton' onClick={onClickCancel}>Cancel</button>
                    </div>
                )}

                {
                    actionEvent === 'edit' && (
                        <div className='ButtonsEditEventContainer'>
                            <button className='CreateButton'>Edit Event</button>
                            <button className='DeleteButton' onClick={onClickDelete}>Delete Event</button>
                            <button className='CancelButton' onClick={onClickCancel}>Cancel</button>
                        </div>
                    )
                }

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



            </main >




        );
    }



}

export default AddEvent;