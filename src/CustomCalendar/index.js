import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';// a plugin!
import rrulePlugin from '@fullcalendar/rrule'
import CustomViewCalendarPlugin from '../CustomCalendarView'
import CalendappContext from '../CalendappContext';
import Modal from 'react-modal';
import Event from '../Event';
import './index.css'
import moment from 'moment-timezone';
import { getEvents, formatDate, changeTZ, updateEvent, capitalizeFirstLetter } from '../Utils'
import TrackingTable from '../TrackingTable'


class CustomCalendar extends Component {

    static contextType = CalendappContext

    static user_email = null

    constructor(props) {
        super(props)
        this.user_email = props.user.attributes.email
        this.myRefCalendar = React.createRef();
    }

    componentDidMount() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    render() {

        let { event, events, showModal,
            setShowModal, setActionEvent,
            setEvent, setEvents
        } = this.context



        const handleDateClick = (props) => {
            setActionEvent('create');

            let selected_date = formatDate(props.date.setDate(props.date.getDate()))

            event.from = selected_date + "T08:00"
            event.to = selected_date + "T17:00"
            setEvent(event)
            setShowModal(true)
        }

        const handleEventClick = (props) => {
            setActionEvent('edit');
            let event = translateEvent(props.event)
            setEvent(event);
            setShowModal(true)
        }

        const translateEvent = (_event) => {

            let startDateLocal = changeTZ(_event.start, moment.tz.guess(), _event.extendedProps.timezone)
            let endDateLocal = changeTZ(_event.end, moment.tz.guess(), _event.extendedProps.timezone)

            return {
                id: _event.id,
                user_email: _event.extendedProps.user_email,
                timezone: _event.extendedProps.timezone,
                from: startDateLocal.substring(0, 16), //ex: 2022-08-10T09:00
                to: endDateLocal.substring(0, 16), //ex: 2022-08-10T09:00
                totalHours: _event.extendedProps.total_hours,
                title: _event.title,
                notes: _event.extendedProps.notes,
                client: {
                    name: _event.extendedProps.client ? _event.extendedProps?.client.name : '',
                    course: _event.extendedProps.client ? _event.extendedProps?.client.course : '',
                },
                invoice: {
                    idInvoice: _event.extendedProps.invoice ? _event.extendedProps.invoice.id_invoice : '',
                    country: _event.extendedProps.invoice ? _event.extendedProps.invoice.country : '',
                    currency: _event.extendedProps.invoice ? _event.extendedProps.invoice.currency : '',
                    costHour: _event.extendedProps.invoice ? _event.extendedProps.invoice.cost_per_hour : '',
                    totalInvoice: _event.extendedProps.invoice ? _event.extendedProps.invoice.total_invoice : '',
                    paymentCondition: _event.extendedProps.invoice ? _event.extendedProps.invoice.payment_cond_days : '',
                    paymentDate: _event.extendedProps.invoice ? _event.extendedProps.invoice.payment_date : '',
                    sent: _event.extendedProps.invoice ? _event.extendedProps.invoice.sent : false,
                    paid: _event.extendedProps.invoice ? _event.extendedProps.invoice.paid : false,
                }
            }
        }

        const customStyles = {
            content: {
                top: '5rem',
                // height: '30rem',
                // width: '100%',
                // marginLeft: "1rem",
                // marginRight: "1rem",
                left: '1rem',
                right: '1rem',
                // bottom: 'auto',
                padding: '0',
                // marginRight: '-50%',
                // transform: 'translate(-50%, -50%)',
            }
        }


        const getEvents_ = async () => {

            event.user_email = this.user_email
            setEvent(event)

            let today = new Date()

            let evs = getEvents(this.user_email, formatDate(today.addDays(-365)), formatDate(today.addDays(+365)))

            // console.log(await evs);

            setEvents(await evs)

        }

        const eventDropMethod = async (props) => {
            // console.log(props);

            let event = translateEvent(props.event)
            setEvent(event)

            await updateEvent(event)

            console.log(event);

        }

        const eventContent = (props) => {
            // console.log(props);
            return (
                <div style={{ padding: '0.2rem 0.2rem 0.2rem 0' }}>
                    <span style={{ marginRight: '0.2rem', fontWeight: 'bold' }}>{props.timeText}</span>
                    <span style={{}} >{capitalizeFirstLetter(props.event.title)}</span>
                </div>
            )

        }

        const buttonCLic = (props) => {
            
            let cal = this.myRefCalendar.current.getApi()

            // console.log(cal.next());
            console.log(cal.gotoDate("2022-06-05"));

        }


        return (

            <div className="Calendar" >

                {/* <button onClick={buttonCLic}>asdasdsad</button> */}

                <FullCalendar
                    ref={this.myRefCalendar}
                    locale={'en'}
                    fixedWeekCount={false}
                    initialView='dayGridMonth'
                    eventDrop={eventDropMethod}
                    eventContent={eventContent}
                    plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    height={'auto'}
                    handleWindowResize={true}
                    editable={true}
                    viewDidMount={getEvents_}
                    headerToolbar={{
                      start: 'title', // will normally be on the left. if RTL, will be on the right
                    //   center: '',
                    //   end: 'today,prev,next' //  will normally be on the right. if RTL, will be on the left
                    }}
                    // headerToolbar={{ center: 'dayGridMonth,listWeek' }}
                    events={events}
                    eventDisplay={'block'}
                    eventTimeFormat={ // like '14:30:00'
                        {
                            "hour": '2-digit',
                            "minute": '2-digit',
                            "meridiem": "narrow" //Normally with a 12-hour clock the meridiem displays as A.M./P.M.
                        }
                    }
                />

                <TrackingTable/>



                <Modal
                    isOpen={showModal}
                    style={customStyles}
                    ariaHideApp={false}>
                    <Event />

                </Modal>



            </div >

        );
    }



}

export default CustomCalendar;