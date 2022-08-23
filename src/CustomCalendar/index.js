import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';// a plugin!
import rrulePlugin from '@fullcalendar/rrule'
import CustomViewCalendarPlugin from '../CustomCalendarView'
import CalendappContext from '../CalendappContext';
import Modal from 'react-modal';
import AddEvent from '../Event';
import './index.css'


class CustomCalendar extends Component {

    static contextType = CalendappContext

    componentDidMount() {
        let value = this.context;
        /* perform a side-effect at mount using the value of UserContext */
        // console.log(value);
    }

    render() {

        let { events, getEvents, showModal, setShowModal, setActionEvent,
        } = this.context

        let action = null //create, edit

        const handleDateClick = (props) => {
            setActionEvent('create');
            setShowModal(true)
            // alert(handleDateClick)
            console.log('handleDateClick' + props);
        }

        const handleEventClick = (props) => {
            setActionEvent('edit');
            setShowModal(true)
            console.log('handleDateClick' + props);
        }

        const closeModal = (props) => {
            setShowModal(false)
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
                bottom: 'auto',
                padding: '0',
                // marginRight: '-50%',
                // transform: 'translate(-50%, -50%)',
            }
        }



        return (

            <div className="Calendar" >

                <FullCalendar
                    locale={'en'}
                    fixedWeekCount={false}
                    initialView='dayGridMonth'
                    // showNonCurrentDates={false}
                    plugins={[dayGridPlugin, interactionPlugin, listPlugin, CustomViewCalendarPlugin, rrulePlugin]}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    height={'auto'}
                    handleWindowResize={true}
                    editable={true}
                    viewDidMount={getEvents}
                    timeZone={"America/Bogota"}
                    // headerToolbar={{
                    //   start: 'title', // will normally be on the left. if RTL, will be on the right
                    //   center: '',
                    //   end: 'today,prev,next,timeGrid' // will normally be on the right. if RTL, will be on the left
                    // }}
                    headerToolbar={{ center: 'dayGridMonth,listWeek' }}
                    events={events}
                    eventDisplay={'block'}
                    eventTimeFormat={ // like '14:30:00'
                        {
                            "hour": '2-digit',
                            "minute": '2-digit',
                            "meridiem": "narrow" //Normally with a 12-hour clock the meridiem displays as A.M./P.M.
                        }
                    }
                // events={[
                // { display: 'background',  allDay : true, start: '2022-08-01 05:00:00', end: '2022-08-01 15:00:00', durationEditable: true },
                // ]}
                // events={[
                //     {
                //       title: 'my recurring event',
                //       rrule: {
                //         freq: 'weekly',
                //         dtstart: '2022-08-22T10:30:00',
                //         until: '2022-08-31'
                //       },
                //       exrule: { // will also accept an array of these objects
                //         freq: 'weekly',
                //         dtstart: '2022-08-01T10:30:00',
                //         until: '2022-08-22'
                //       }
                //     }
                //   ]}
                />


                <Modal
                    isOpen={showModal}
                    style={customStyles}
                    ariaHideApp={false}>
                    <AddEvent />

                </Modal>

            </div >

        );
    }



}

export default CustomCalendar;