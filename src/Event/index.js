import React, { Component } from 'react';
import './index.css'
import CalendappContext from '../CalendappContext';
import Modal from 'react-modal';
import { MdDangerous } from 'react-icons/md'
import { Collapse, AutoComplete, Input } from 'antd';
import Utils from '../Utils'
import { CirclePicker } from 'react-color';


const { Search } = Input;
const { Panel } = Collapse;

class AddEvent extends Component {

    static contextType = CalendappContext

    componentDidMount() {

        let { event, events,
            setEvent, actionEvent,
            setAutocompleteClients,
            setAutocompleteCourses, setAutocompleteCountries
        } = this.context

        setAutocompleteClients(Utils.getAutoCompleteClients(events))
        setAutocompleteCourses(Utils.getAutoCompleteCourses(events))
        setAutocompleteCountries(Utils.getAutoCompleteCountries(events))

        if (actionEvent === 'create') {
            this.clearEventForm()
            event.total_hours = Utils.getHoursDates(event.start, event.end)
            setEvent(event)
        }

    }


    clearEventForm() {

        let { event, setEvent } = this.context

        event.timezone = ''
        event.title = ''
        event.notes = ''
        event.color = ''
        event.client.name = ''
        event.client.course = ''
        event.invoice.id_invoice = ''
        event.invoice.country = ''
        event.invoice.currency = ''
        event.invoice.cost_per_hour = ''
        event.invoice.total_invoice = ''
        event.invoice.payment_cond_days = ''
        event.invoice.payment_date = Utils.formatDate(new Date())
        event.invoice.sent = false
        event.invoice.paid = false

        setEvent(event)

    }

    render() {

        let colors = ["#E74C3C", "#ef877c", "#9c27b0", "#673ab7", "#3f51b5", "#3688D8", "#87B0D9", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800"]

        let { setShowModal, actionEvent,
            showModalConfirmDelete, setShowModalConfirmDelete,
            event, setEvent, events, setEvents,
            setAutocompleteClients, autocompleteClients,
            setAutocompleteCourses, autocompleteCourses,
            setAutocompleteCountries, autocompleteCountries,
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
            event.start = _event.target.value
            setEvent(event)
            document.getElementById('from').classList.remove("EmptyField");
        }

        const onChangeTo = (_event) => {
            event.end = _event.target.value
            setEvent(event)
            document.getElementById('to').classList.remove("EmptyField");
        }

        const onBlurDates = (_event) => {
            event.total_hours = Utils.getHoursDates(event.start, event.end)
            setEvent(event)
            document.getElementById('total_hours').classList.remove("EmptyField");
        }

        const onChangeTotalHours = (_event) => {
            event.total_hours = _event.target.value
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

        const onChangeColors = (_event) => {
            event.color = _event.hex
            setEvent(event)
        }

        const onSelectClient = (value) => {
            event.client.name = value
            setEvent(event)
        }

        const onSelectCourse = (value) => {
            event.client.course = value
            setEvent(event)
        }

        const onSelectCountry = (value) => {
            event.invoice.country = value
            setEvent(event)
        }

        const onChangeIdInvoice = (_event) => {
            event.invoice.id_invoice = _event.target.value
            setEvent(event)
        }

        const onClickGenIDInvoice = (_event) => {
            // _event.preventDefault()  

            let elements_with_invoices = events.filter(element => element.invoice !== undefined)
            //if have invoices
            if (elements_with_invoices.length > 0) {

                let invoices_with_dash = [...elements_with_invoices.filter(element => element.invoice.id_invoice.includes('-'))]

                let invoices_with_numbers = [...elements_with_invoices.filter(element => Number.isInteger(element.invoice.id_invoice))]

                if (invoices_with_dash.length > 0) {

                    let id_invoices = invoices_with_dash.map(element => element.invoice.id_invoice)

                    id_invoices = id_invoices.sort(
                        (a, b) => {
                            return parseInt(a.split('-')[1]) - parseInt(b.split('-')[1])
                        }
                    )

                    let last_id = id_invoices.at(-1);

                    event.invoice.id_invoice = last_id.split('-')[0] + '-' + (parseInt(last_id.split('-')[1]) + 1)

                    setEvent(event)

                    // console.log(Number.isInteger(last_id));

                } else if (invoices_with_numbers.length > 0) {

                    //Only numbers
                    let id_invoices = invoices_with_numbers.map(element => element.invoice.id_invoice)

                    let last_id = id_invoices.sort().at(-1)

                    event.invoice.id_invoice = parseInt(last_id) + 1

                    setEvent(event)

                    // console.log(Number.isInteger(last_id));

                }

            } else {

                event.invoice.id_invoice = "1"

                setEvent(event)

            }


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
            event.invoice.cost_per_hour = _event.target.value
            setEvent(event)
            document.getElementById('cost_per_hour').classList.remove("EmptyField");
        }

        const onBlurCostHour = (_event) => {
            event.invoice.total_invoice = event.invoice.cost_per_hour * event.total_hours
            setEvent(event)
            document.getElementById('total_invoice').classList.remove("EmptyField");
        }

        const onChangeTotalInvoice = (_event) => {
            event.invoice.total_invoice = _event.target.value
            setEvent(event)
            document.getElementById('total_invoice').classList.remove("EmptyField");
        }

        const onChangePaymentCondition = (_event) => {
            event.invoice.payment_cond_days = _event.target.value
            setEvent(event)
            document.getElementById('payment_condition').classList.remove("EmptyField");
        }

        const onBlurPaymentCondition = (_event) => {
            let date_to = new Date(event.end)
            date_to = date_to.addDays(parseInt(event.invoice.payment_cond_days))
            event.invoice.payment_date = Utils.formatDate(date_to)
            setEvent(event)
            document.getElementById('payment_date').classList.remove("EmptyField");
        }

        const onChangePaymentDate = (_event) => {
            event.invoice.payment_date = _event.target.value
            setEvent(event)
            document.getElementById('payment_date').classList.remove("EmptyField");
        }

        const onChangeSent = (_event) => {
            event.invoice.sent = _event.target.checked
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

            if (event.start === '' || event.end === '') {
                // showNotification('error', 'Dates must not empty', 4000)
                document.getElementById('from').classList.add("EmptyField");
                document.getElementById('to').classList.add("EmptyField");
                validEvent = false
            }
            if (event.title === '') {

                if (event.client.name !== '' && event.client.course) {
                    event.title = event.client.name + "-" + event.client.course
                    setEvent(event)
                } else {
                    document.getElementById('title').classList.add("EmptyField");
                    validEvent = false
                }

            }

            if (event.invoice.id_invoice !== '') {

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

                if (event.invoice.cost_per_hour === '') {
                    // showNotification('error', 'Cost Per Hour Empty', 4000)
                    document.getElementById('cost_per_hour').classList.add("EmptyField");
                    validEvent = false
                }

                if (event.invoice.total_invoice === '') {
                    // showNotification('error', 'Total Invoice Empty', 4000)
                    document.getElementById('total_invoice').classList.add("EmptyField");
                    validEvent = false
                }

                if (event.invoice.payment_cond_days === '') {
                    // showNotification('error', 'Payment Condition Empty', 4000)
                    document.getElementById('payment_condition').classList.add("EmptyField");
                    validEvent = false
                }

                if (event.invoice.payment_date === 'NaN-NaN-NaN' || event.invoice.payment_date === '') {
                    // showNotification('error', 'Payment Date Empty', 4000)
                    document.getElementById('payment_date').classList.add("EmptyField");
                    validEvent = false
                }

            }

            if (!validEvent) {
                Utils.showNotification('error', 'Check invalid fields', 4000)
            }
            return validEvent;
        }

        const onClickDuplicate = async (_event) => {
            _event.preventDefault()

            if (isValidEvent()) {

                await Utils.createEvent(event)
                setShowModal(false)

                let events = await Utils.getEvents(event.user_email)
                setEvents(events)

                Utils.moveUp()

            }

        }

        const onClickEdit = async (_event) => {
            _event.preventDefault()

            if (isValidEvent()) {

                await Utils.updateEvent(event)
                setShowModal(false)

                let events = await Utils.getEvents(event.user_email)
                setEvents(events)

                // Utils.moveUp()

            }

        }

        const onClickDelete = (_event) => {
            _event.preventDefault()
            setShowModalConfirmDelete(true)

            Utils.moveUp()

        }

        const onClickDeleteConfirm = async (_event) => {
            _event.preventDefault()

            setShowModalConfirmDelete(false)
            setShowModal(false)
            await Utils.deleteEvent(event)

            let events = await Utils.getEvents(event.user_email)
            setEvents(events)

            Utils.moveUp()

        }

        const onClickCreate = async (_event) => {
            _event.preventDefault()

            if (isValidEvent()) {

                setShowModal(false)

                await Utils.createEvent(event)

                let events = await Utils.getEvents(event.user_email)
                setEvents(events)

                Utils.moveUp()

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

        const onSearchClients = (value) => {

            let filterOnSearch = (element, index) => element.value.toUpperCase().startsWith(value.toUpperCase())

            setAutocompleteClients(Utils.getAutoCompleteClients(events).filter(filterOnSearch))

            // console.log(value);
            event.client.name = value
            setEvent(event)

        };



        const onSearchCourses = (value) => {

            let filterOnSearch = (element, index) => element.value.toUpperCase().startsWith(value.toUpperCase())

            setAutocompleteCourses(Utils.getAutoCompleteCourses(events).filter(filterOnSearch))

            // console.log(value);
            event.client.course = value
            setEvent(event)

        };

        const onSearchCountries = (value) => {

            let filterOnSearch = (element, index) => element.value.toUpperCase().startsWith(value.toUpperCase())

            setAutocompleteCountries(Utils.getAutoCompleteCountries(events).filter(filterOnSearch))

            // console.log(value);
            event.invoice.country = value
            setEvent(event)

            if (document.getElementById('country').classList.contains("EmptyField")) {
                document.getElementById('country').classList.remove("EmptyField");
            }

        };

        return (

            <main className='MainContainerEvent' >

                {actionEvent === 'edit' && (
                    <h2>Edit Event</h2>
                )}

                {
                    actionEvent === 'create' && (
                        <h2>Create Event</h2>
                    )
                }

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
                    <input required={true} id={'from'} name={"start"} type={"datetime-local"} value={event.start} onBlur={onBlurDates} onChange={onChangeFrom}></input>

                    <label htmlFor={'end'}>To</label>
                    <input required={true} id={'to'} name={"end"} type={"datetime-local"} value={event.end} onChange={onChangeTo} onBlur={onBlurDates}></input>

                    <label htmlFor={'total_hours'}>Total Hours</label>
                    <input required={true} id={'total_hours'} name={"total_hours"} type={"number"} placeholder={"Total Hours"} value={event.total_hours} onChange={onChangeTotalHours}></input>

                    <label htmlFor={'title'}>Title</label>
                    <input name={"title"} id={'title'} type={"text"} placeholder={"Event Title"} required={true} value={event.title} onChange={onChangeTitle}></input>

                    <label htmlFor={'notes'} >Notes</label>
                    <textarea name={"notes"} id={'notes'} rows="4" placeholder={"Event Notes"} value={event.notes} onChange={onChangeNotes}></textarea>

                    <label htmlFor={'color'} >Color</label>
                    <CirclePicker width={'auto'} colors={colors} color={event.color} onChangeComplete={onChangeColors} />

                    <Collapse accordion defaultActiveKey={['1']} destroyInactivePanel={true} className={'CollapseCustom'} >
                        <Panel header="Client" key="1">
                            <label htmlFor={'client'}>Client</label>
                            {/* <input name={"client"} type={"text"} placeholder={"Client"} value={event.client.name} onChange={onChangeClient}></input> */}
                            <AutoComplete
                                options={autocompleteClients}
                                // style={{ width: 200 }}
                                onSelect={onSelectClient}
                                value={event.client.name}
                                onSearch={onSearchClients}
                                placeholder="Client"
                            />

                            <label htmlFor={'course'}>Course</label>
                            {/* <input name={"course"} id={'course'} type={"text"} placeholder={"Course"} value={event.client.course} onChange={onChangeCourse}></input> */}
                            <AutoComplete
                                options={autocompleteCourses}
                                // style={{ width: 200 }}
                                onSelect={onSelectCourse}
                                value={event.client.course}
                                onSearch={onSearchCourses}
                                placeholder="Course"
                            />

                        </Panel>
                        <Panel header="Invoice" key="2">

                            <label htmlFor={'id_invoice'}>Number</label>

                            <Search placeholder="Number of Invoice" enterButton value={event.invoice.id_invoice} onChange={onChangeIdInvoice} onSearch={onClickGenIDInvoice} />

                            <label htmlFor={'country'}>Country</label>
                            {/* <input name={"country"} id={"country"} type={"text"} placeholder={"Country"} value={event.invoice.country} onChange={onSearchCountry} onBlur={onBlurCountry}></input> */}
                            <AutoComplete
                                id={"country"}
                                onBlur={onBlurCountry}
                                options={autocompleteCountries}
                                // style={{ width: 200 }}
                                onSelect={onSelectCountry}
                                value={event.invoice.country}
                                onSearch={onSearchCountries}
                                placeholder="Country"
                            />

                            <label htmlFor={'currency'}>Currency</label>
                            <select name={"currency"} id={"currency"} value={event.invoice.currency} onChange={onChangeCurrency}>
                                <option disabled defaultValue="" value=''> -- select an option -- </option>
                                <option value={"USD"}>USD</option>
                                <option value={"EUR"}>EUR</option>
                                <option value={"COP"}>COP</option>
                            </select>

                            <label htmlFor={'cost_per_hour'}>Cost/Hour</label>
                            <input name={"cost_per_hour"} id={"cost_per_hour"} type={"number"} placeholder={"Cost Per Hour"} value={event.invoice.cost_per_hour} onChange={onChangeCostHour} onBlur={onBlurCostHour}></input>

                            <label htmlFor={'total_invoice'}>Total Invoice</label>
                            <input name={"total_invoice"} id={"total_invoice"} type={"number"} placeholder={"Total"} value={event.invoice.total_invoice} onChange={onChangeTotalInvoice}></input>

                            <label htmlFor={'payment_condition'}>Payment Condition</label>
                            <input name={"payment_condition"} id={"payment_condition"} type={"number"} placeholder={"Payment Condition in days"} value={event.invoice.payment_cond_days} onChange={onChangePaymentCondition} onBlur={onBlurPaymentCondition}></input>

                            <label htmlFor={'payment_date'}>Payment Date</label>
                            <input name={"payment_date"} id={"payment_date"} type={"date"} value={event.invoice.payment_date} onChange={onChangePaymentDate} ></input>

                            <label htmlFor={'sent'}>Sent</label>
                            <input name={"sent"} type={"checkbox"} checked={event.invoice.sent} onChange={onChangeSent}></input>

                            <label htmlFor={'paid'}>Paid</label>
                            <input name={"paid"} type={"checkbox"} checked={event.invoice.paid} onChange={onChangePaid}></input>

                        </Panel>
                    </Collapse>

                </div>



                {
                    actionEvent === 'create' && (
                        <div className='ButtonsAddEventContainer'>
                            <button className='CreateButton' onClick={onClickCreate}>Create Event</button>
                            <button className='CancelButton' onClick={onClickCancel}>Cancel</button>
                        </div>
                    )
                }

                {
                    actionEvent === 'edit' && (
                        <div className='ButtonsEditEventContainer'>
                            <button className='CreateButton' onClick={onClickEdit}>Edit Event</button>
                            <button className='DuplicateButton' onClick={onClickDuplicate}>Duplicate Event</button>
                            <button className='CancelButton' onClick={onClickCancel}>Cancel</button>
                            <button className='DeleteButton' onClick={onClickDelete}>Delete Event</button>
                        </div>

                    )
                }

                <Modal
                    isOpen={showModalConfirmDelete}
                    style={customStyles}
                    ariaHideApp={false}
                    className={'ModalDeleteConfirmation'}>

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