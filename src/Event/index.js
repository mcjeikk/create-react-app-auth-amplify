import React, { Component } from 'react';
import './index.css'
import CalendappContext from '../CalendappContext';
import Modal from 'react-modal';
import { MdDangerous, MdAutoFixHigh } from 'react-icons/md'
import { Collapse } from 'antd';
import { showNotification, createEvent, deleteEvent, updateEvent, getEvents, formatDate} from '../Utils'
const { Panel } = Collapse;

class AddEvent extends Component {

    static contextType = CalendappContext

    componentDidMount() {

        let { event, setEvent, actionEvent, getHoursDates } = this.context

        if (actionEvent === 'create') {
            this.clearEventForm()
            event.totalHours = getHoursDates(event.from, event.to)
            setEvent(event)
        }

    }


    clearEventForm() {

        let { event, setEvent } = this.context

        event.timezone = ''
        event.title = ''
        event.notes = ''
        event.client.name = ''
        event.client.course = ''
        event.invoice.idInvoice = ''
        event.invoice.country = ''
        event.invoice.currency = ''
        event.invoice.costHour = ''
        event.invoice.totalInvoice = ''
        event.invoice.paymentCondition = ''
        event.invoice.paymentDate = ''
        event.invoice.sent = false
        event.invoice.paid = false

        setEvent(event)

    }

    render() {

        let { setShowModal, actionEvent,
            showModalConfirmDelete, setShowModalConfirmDelete,
             getHoursDates,
            event, setEvent, events, setEvents
        } = this.context

        const onClickCancel = (_event) => {
            _event.preventDefault()
            setShowModal(false)
        }



        const onClickCancelConfirm = (_event) => {
            _event.preventDefault()
            setShowModalConfirmDelete(false)
        }



        const onChangeTimeZone = (_event) => {
            event.timezone = _event.target.value
            setEvent(event)
            document.getElementById('timezone').classList.remove("EmptyField");
        }

        const onChangeFrom = (_event) => {
            event.from = _event.target.value
            setEvent(event)
            document.getElementById('from').classList.remove("EmptyField");
        }

        const onChangeTo = (_event) => {
            event.to = _event.target.value
            setEvent(event)
            document.getElementById('to').classList.remove("EmptyField");
        }

        const onBlurDates = (_event) => {
            event.totalHours = getHoursDates(event.from, event.to)
            setEvent(event)
            document.getElementById('total_hours').classList.remove("EmptyField");
        }

        const onChangeTotalHours = (_event) => {
            event.totalHours = _event.target.value
            setEvent(event)
            document.getElementById('total_hours').classList.remove("EmptyField");
        }

        const onChangeTitle = (_event) => {
            event.title = _event.target.value
            setEvent(event)
            document.getElementById('title').classList.remove("EmptyField");
        }

        const onChangeNotes = (_event) => {
            event.notes = _event.target.value
            setEvent(event)
        }

        const onChangeClient = (_event) => {
            event.client.name = _event.target.value
            setEvent(event)
        }

        const onChangeCourse = (_event) => {
            event.client.course = _event.target.value
            setEvent(event)
            document.getElementById('course').classList.remove("EmptyField");
        }

        const onChangeIdInvoice = (_event) => {
            event.invoice.idInvoice = _event.target.value
            setEvent(event)
        }

        const onClickGenIDInvoice = (_event) => {
            _event.preventDefault()

            // console.log([...events]);

            let element = [...events].find(event => event.hasOwnProperty('invoice'))

            if (element.invoice.id_invoice.includes('-')) {
                let invoice = element.invoice.id_invoice.split('-')

                event.invoice.idInvoice = invoice[0] + '-' + (parseInt(invoice[1]) + 1)

            }

            else if (Number(element.invoice.id_invoice)) {
                event.invoice.idInvoice = parseInt(element.invoice.id_invoice)+1
            }

            setEvent(event)



        }

        const onChangeCountry = (_event) => {
            event.invoice.country = _event.target.value
            setEvent(event)
            document.getElementById('country').classList.remove("EmptyField");
        }

        const onBlurCountry = (_event) => {
            event.invoice.currency = 'USD'
            setEvent(event)
            document.getElementById('currency').classList.remove("EmptyField");
        }

        const onChangeCurrency = (_event) => {
            event.invoice.currency = _event.target.value
            setEvent(event)
            document.getElementById('currency').classList.remove("EmptyField");
        }

        const onChangeCostHour = (_event) => {
            event.invoice.costHour = _event.target.value
            setEvent(event)
            document.getElementById('cost_per_hour').classList.remove("EmptyField");
        }

        const onBlurCostHour = (_event) => {
            event.invoice.totalInvoice = event.invoice.costHour * event.totalHours
            setEvent(event)
            document.getElementById('total_invoice').classList.remove("EmptyField");
        }

        const onChangeTotalInvoice = (_event) => {
            event.invoice.totalInvoice = _event.target.value
            setEvent(event)
            document.getElementById('total_invoice').classList.remove("EmptyField");
        }

        const onChangePaymentCondition = (_event) => {
            event.invoice.paymentCondition = _event.target.value
            setEvent(event)
            document.getElementById('payment_condition').classList.remove("EmptyField");
        }

        const onBlurPaymentCondition = (_event) => {
            let date_to = new Date(event.to)
            date_to = date_to.addDays(parseInt(event.invoice.paymentCondition))
            event.invoice.paymentDate = formatDate(date_to)
            setEvent(event)
            document.getElementById('payment_date').classList.remove("EmptyField");
        }

        const onChangePaymentDate = (_event) => {
            event.invoice.paymentDate = _event.target.value
            setEvent(event)
            document.getElementById('payment_date').classList.remove("EmptyField");
        }

        const onChangeSent = (_event) => {
            event.invoice.paymentDate = _event.target.checked
            setEvent(event)
        }

        const onChangePaid = (_event) => {
            event.invoice.paid = _event.target.checked
            setEvent(event)
        }

        const isValidEvent = () => {

            let validEvent = true

            if (event.timezone === '') {
                // showNotification('error', 'Time Zone empty', 4000)
                document.getElementById('timezone').classList.add("EmptyField");
                validEvent = false
            }

            if (event.from === '' || event.to === '') {
                // showNotification('error', 'Dates must not empty', 4000)
                document.getElementById('from').classList.add("EmptyField");
                document.getElementById('to').classList.add("EmptyField");
                validEvent = false
            }
            if (event.title === '') {

                if (event.client.name !== '' && event.client.course) {
                    event.title = event.client.name + " - " + event.client.course
                    setEvent(event)
                }   else {
                    document.getElementById('title').classList.add("EmptyField");
                    validEvent = false
                }
                
            }
            
            if (event.client.name !== '') {

                if (event.client.course === '') {
                    // showNotification('error', 'Course Empty', 4000)
                    document.getElementById('course').classList.add("EmptyField");
                    validEvent = false
                }

            }

            if (event.invoice.idInvoice !== '') {

                if (event.invoice.country === '') {
                    // showNotification('error', 'Country Empty', 4000)
                    document.getElementById('country').classList.add("EmptyField");
                    validEvent = false
                }

                if (event.invoice.currency === '') {
                    // showNotification('error', 'Currency Empty', 4000)
                    document.getElementById('currency').classList.add("EmptyField");
                    validEvent = false
                }

                if (event.invoice.costHour === '') {
                    // showNotification('error', 'Cost Per Hour Empty', 4000)
                    document.getElementById('cost_per_hour').classList.add("EmptyField");
                    validEvent = false
                }

                if (event.invoice.totalInvoice === '') {
                    // showNotification('error', 'Total Invoice Empty', 4000)
                    document.getElementById('total_invoice').classList.add("EmptyField");
                    validEvent = false
                }

                if (event.invoice.paymentCondition === '') {
                    // showNotification('error', 'Payment Condition Empty', 4000)
                    document.getElementById('payment_condition').classList.add("EmptyField");
                    validEvent = false
                }

                if (event.invoice.paymentDate === 'NaN-NaN-NaN' || event.invoice.paymentDate === '') {
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


        const buildEvent = () => {

            let item = {
                timezone: event.timezone,
                start: event.from,
                end: event.to,
                total_hours: event.totalHours,
                title: event.title,
                notes: event.notes,
            }

            if (event.id) {
                item.id = event.id
            }

            if (event.client.name.length > 0) {
                item.client = event.client
            }

            if (event.invoice.idInvoice.length > 0) {
                item.invoice = {
                    id_invoice: event.invoice.idInvoice,
                    country: event.invoice.country,
                    currency: event.invoice.currency,
                    cost_per_hour: event.invoice.costHour,
                    total_invoice: event.invoice.totalInvoice,
                    payment_cond_days: event.invoice.paymentCondition,
                    payment_date: event.invoice.paymentDate,
                    paid: event.invoice.paid,
                    sent: event.invoice.sent,
                    // url_invoice: pdfInvoice
                }
            }

            return item
        }

        const onClickEdit = async (_event) => {
            _event.preventDefault()

            if (isValidEvent()) {

                let item = buildEvent()

                // console.log(item);

                await updateEvent(item)
                setShowModal(false)
                setEvents(await getEvents())

            }

        }

        const onClickDelete = (_event) => {
            _event.preventDefault()
            setShowModalConfirmDelete(true)

        }

        const onClickDeleteConfirm = async (_event) => {
            _event.preventDefault()

            setShowModalConfirmDelete(false)
            setShowModal(false)
            await deleteEvent(event)
            setEvents(await getEvents())
        }


        const onClickCreate = async (_event) => {
            _event.preventDefault()

            if (isValidEvent()) {

                let item = buildEvent()

                setShowModal(false)

                await createEvent(item)

                setEvents(await getEvents())

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
                    <select required={true} name={"timezone"} id={"timezone"} value={event.timezone} onChange={onChangeTimeZone}>
                        <option disabled defaultValue="" value=''> -- select an option -- </option>
                        <option value={"America/Bogota"}>Bogota, Colombia</option>
                        <option value={"Europe/Madrid"}>Madrid, España</option>
                        <option value={"America/Mexico_City"}>Mexico</option>
                        <option value={"America/Santiago"}>Santiago, Chile</option>
                        <option value={"America/Argentina/Buenos_Aires"}>Buenos Aires, Argentina</option>
                    </select>

                    <label htmlFor={'start'}>From</label>
                    <input required={true} id={'from'} name={"start"} type={"datetime-local"} value={event.from} onBlur={onBlurDates} onChange={onChangeFrom}></input>

                    <label htmlFor={'end'}>To</label>
                    <input required={true} id={'to'} name={"end"} type={"datetime-local"} value={event.to} onChange={onChangeTo} onBlur={onBlurDates}></input>

                    <label htmlFor={'total_hours'}>Total Hours</label>
                    <input required={true} id={'total_hours'} name={"total_hours"} type={"number"} placeholder={"Total Hours"} value={event.totalHours} onChange={onChangeTotalHours}></input>

                    <label htmlFor={'title'}>Title</label>
                    <input name={"title"} id={'title'} type={"text"} required={true} value={event.title} onChange={onChangeTitle}></input>

                    <label htmlFor={'notes'} >Notes</label>
                    <textarea name={"notes"} id={'notes'} rows="4" value={event.notes} onChange={onChangeNotes}></textarea>

                    <Collapse accordion defaultActiveKey={['1']} destroyInactivePanel={true} className={'CollapseCustom'}>
                        <Panel header="Client" key="1">
                            <label htmlFor={'client'}>Client</label>
                            <input name={"client"} type={"text"} placeholder={"Client"} value={event.client.name} onChange={onChangeClient}></input>

                            <label htmlFor={'course'}>Course</label>
                            <input name={"course"} id={'course'} type={"text"} placeholder={"Course"} value={event.client.course} onChange={onChangeCourse}></input>

                        </Panel>
                        <Panel header="Invoice" key="2">

                            <label htmlFor={'id_invoice'}>Number</label>
                            <div className='buttonInsideInput'>
                                <input name={"id_invoice"} type={"text"} placeholder={"Invoice Number"} value={event.invoice.idInvoice} onChange={onChangeIdInvoice} />
                                <button className={'buttonGenerateIDInvoice'} onClick={onClickGenIDInvoice}><MdAutoFixHigh size={'3rem'}/></button>
                            </div>

                            <label htmlFor={'country'}>Country</label>
                            <input name={"country"} id={"country"} type={"text"} placeholder={"Country"} value={event.invoice.country} onChange={onChangeCountry} onBlur={onBlurCountry}></input>


                            <label htmlFor={'currency'}>Currency</label>
                            <select name={"currency"} id={"currency"} value={event.invoice.currency} onChange={onChangeCurrency}>
                                <option disabled defaultValue="" value=''> -- select an option -- </option>
                                <option value={"USD"}>USD</option>
                                <option value={"EUR"}>EUR</option>
                                <option value={"COP"}>COP</option>
                            </select>
                            {/* <input name={"currency"} type={"text"} placeholder={"Currency"} value={currency} onChange={onChangeCurrency}></input> */}

                            <label htmlFor={'cost_per_hour'}>Cost/Hour</label>
                            <input name={"cost_per_hour"} id={"cost_per_hour"} type={"number"} placeholder={"Cost Per Hour"} value={event.invoice.costHour} onChange={onChangeCostHour} onBlur={onBlurCostHour}></input>

                            <label htmlFor={'total_invoice'}>Total Invoice</label>
                            <input name={"total_invoice"} id={"total_invoice"} type={"text"} placeholder={"Total"} value={event.invoice.totalInvoice} onChange={onChangeTotalInvoice}></input>

                            <label htmlFor={'payment_condition'}>Payment Condition</label>
                            <input name={"payment_condition"} id={"payment_condition"} type={"number"} placeholder={"Payment Condition in days"} value={event.invoice.paymentCondition} onChange={onChangePaymentCondition} onBlur={onBlurPaymentCondition}></input>

                            <label htmlFor={'payment_date'}>Payment Date</label>
                            <input name={"payment_date"} id={"payment_date"} type={"date"} value={event.invoice.paymentDate} onChange={onChangePaymentDate} ></input>

                            <label htmlFor={'sent'}>Sent</label>
                            <input name={"sent"} type={"checkbox"} value={event.invoice.sent} onChange={onChangeSent}></input>

                            <label htmlFor={'paid'}>Paid</label>
                            <input name={"paid"} type={"checkbox"} value={event.invoice.paid} onChange={onChangePaid}></input>

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
                            <button className='CreateButton' onClick={onClickEdit}>Edit Event</button>
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

                        <button className='CreateButton' onClick={onClickDeleteConfirm}>OK</button>
                        <button className='CancelButton' onClick={onClickCancelConfirm}>Cancel</button>

                    </main>
                </Modal>



            </main >




        );
    }



}

export default AddEvent;