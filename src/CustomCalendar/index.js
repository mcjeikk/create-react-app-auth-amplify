import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';// a plugin!
import CalendappContext from '../CalendappContext';
import Modal from 'react-modal';
import Event from '../Event';
import './index.css'
import moment from 'moment-timezone';
import Utils from '../Utils'
import TrackingTable from '../TrackingTable'
class CustomCalendar extends Component {

    static contextType = CalendappContext

    constructor(props) {
        super(props)
        this.user = props.user
        this.myRefCalendar = React.createRef();
    }

    componentDidMount() {
        Utils.moveUp()

    }

    render() {

        let { event, events, showModal,
            setShowModal, setActionEvent,
            setEvent, setEvents, setAreHiddenEvents, areHiddenEvents, user, setUser
        } = this.context



        const handleDateClick = (props) => {
            setActionEvent('create');

            let selected_date = Utils.formatDate(props.date.setDate(props.date.getDate()))

            event.start = selected_date + "T08:00"
            event.end = selected_date + "T17:00"
            setEvent(event)
            setShowModal(true)
        }

        const handleEventClick = (props) => {
            setActionEvent('edit');
            let event = Utils.translateEvent(props.event)
            setEvent(event);
            setShowModal(true)
        }



        const getEvents_ = async () => {

            let user = {
                "email": this.user.attributes.email,
                "name": this.username
            }

            setUser(user);

            event.user_email = this.user.attributes.email
            setEvent(event)


            let today = new Date()
            let evs = await Utils.getEvents(this.user.attributes.email, Utils.formatDate(today.addDays(-365)), Utils.formatDate(today.addDays(+365)))
            setEvents(evs)

        }

        const eventDropMethod = async (props) => {
            // console.log(props);

            let event = Utils.translateEvent(props.event)
            setEvent(event)

            await Utils.updateEvent(event)

        }

        const eventContent = (props) => {
            return (
                <div style={{ padding: '0.2rem 0.2rem 0.2rem 0' }}>
                    <span style={{ marginRight: '0.2rem', fontWeight: 'bold' }}>{moment(props.event.start).format('HH:mm') + '-' + moment(props.event.end).format('HH:mm')}</span>
                    <span>{Utils.capitalizeFirstLetter(props.event.title)}</span>
                </div>
            )

        }

        const onClickHideEvents = async (props) => {
            props.preventDefault()

            if (areHiddenEvents) {
                getEvents_()
                setAreHiddenEvents(false)
            } else {
                let evs = [...Utils.hideEvents(events)]
                setEvents(evs)
                setAreHiddenEvents(true)
            }



        }

        return (

            <div className="Calendar" >

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

                {/* <button className={'buttonHideEvents'} onClick={onClickHideEvents}>{areHiddenEvents ? "Show events" : "Hide Events"}</button> */}

                {
                    // console.log(events.filter(element => element.invoice))
                    events.filter(element => element.invoice).length > 0 && (
                        <TrackingTable reference={this.myRefCalendar} />
                    )
                }



                <Modal
                    className={'ClassModalContainer'}
                    isOpen={showModal}
                    // style={customStyles}
                    ariaHideApp={false}>
                    <Event />

                </Modal>



            </div >

        );
    }



}

export default CustomCalendar;