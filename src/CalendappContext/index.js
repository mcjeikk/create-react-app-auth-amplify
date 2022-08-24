import React, { Component } from 'react'

const CalendappContext = React.createContext()

class CalendappContextProvider extends Component {


    // Context state
    state = {
        events: [],
        showModal: false,
        showModalConfirmDelete: false,
        actionEvent: null,
        //EVENT FORM
        event: {
            timezone: '',
            from: '',
            to: '',
            totalHours: '',
            title: '',
            notes: '',
            //Client
            client: '',
            course: '',
            //Invoice
            idInvoice: '',
            country: '',
            currency: '',
            costHour: '',
            totalInvoice: '',
            paymentCondition: '',
            paymentDate: '',
            sent: false,
            paid: false,
            // pdfInvoice: '',
        },

    }

    formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    getHoursDates(from, to) {
        let date_from = new Date(from)
        let date_to = new Date(to)

        let days = Math.floor(Math.abs(date_to.getTime() - date_from.getTime()) / (1000 * 3600 * 24) + 1)
        let hours = Math.abs(date_from - date_to.addDays(-days + 1)) / 36e5
        //The subtraction returns the difference between the two dates in milliseconds. 
        //36e5 is the scientific notation for 60*60*1000, dividing by which converts the milliseconds difference into hours.

        let totalHours = (days * hours).toFixed(1)

        return (totalHours % 1 === 0) ? Math.round(totalHours) : totalHours

    }

    // Method to update state
    setEvent = (event) => {
        this.setState((prevState) => ({ event }))
    }

    setEvents = (events) => {
        this.setState((prevState) => ({ events }))
    }

    setShowModal = (showModal) => {
        this.setState((prevState) => ({ showModal }))
    }

    setShowModalConfirmDelete = (showModalConfirmDelete) => {
        this.setState((prevState) => ({ showModalConfirmDelete }))
    }

    setActionEvent = (actionEvent) => {
        this.setState((prevState) => ({ actionEvent }))
    }

    getEvents = async () => {

        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "start": "2022-01-01 08:00:00",
            "end": "2022-12-31 08:00:00"
        });

        let response = await fetch("https://c9ge3dujm1.execute-api.us-east-2.amazonaws.com/prod/search_event", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();

        this.setEvents(data);

    }

    render() {

        const { children } = this.props
        const { event, events, showModal,
            actionEvent, showModalConfirmDelete } = this.state
        const { setEvent, getEvents, setShowModal,
            setActionEvent, setShowModalConfirmDelete,
            formatDate, getHoursDates,
        } = this

        return (
            <CalendappContext.Provider value={{
                event, setEvent,
                events, getEvents,
                showModal, setShowModal,
                actionEvent, setActionEvent,
                showModalConfirmDelete, setShowModalConfirmDelete,
                formatDate, getHoursDates
            }}>
                {children}
            </CalendappContext.Provider>
        )
    }
}

export default CalendappContext

export { CalendappContextProvider }