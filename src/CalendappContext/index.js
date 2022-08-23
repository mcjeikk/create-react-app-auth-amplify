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
        timezone: '',
        from: '',
        to: '',
        title: '',
        notes: '',
        client: '',
        course: '',
        totalHours: '',
        costHour: '',
        paymentCondition: '',

    }

    // Method to update state
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

    setTimezone = (timezone) => {
        this.setState((prevState) => ({ timezone }))
    }

    setFrom = (from) => {
        this.setState((prevState) => ({ from }))
    }

    setTo = (to) => {
        this.setState((prevState) => ({ to }))
    }
    setTitle = (title) => {
        this.setState((prevState) => ({ title }))
    }
    setNotes = (notes) => {
        this.setState((prevState) => ({ notes }))
    }
    setClient = (client) => {
        this.setState((prevState) => ({ client }))
    }
    setCourse = (course) => {
        this.setState((prevState) => ({ course }))
    }

    setTotalHours = (totalHours) => {
        this.setState((prevState) => ({ totalHours }))
    }

    setCostHour = (costHour) => {
        this.setState((prevState) => ({ costHour }))
    }

    setPaymentCondition = (paymentCondition) => {
        this.setState((prevState) => ({ paymentCondition }))
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
        // console.log(data);

        this.setEvents(data);

    }

    render() {



        const { children } = this.props
        const { events, showModal, actionEvent, showModalConfirmDelete,
            timezone,
            from,
            to,
            title,
            notes,
            client,
            course,
            totalHours,
            costHour,
            paymentCondition,
        } = this.state
        const { getEvents, setShowModal, setActionEvent, setShowModalConfirmDelete,
            setTimezone, setFrom, setTo, setTitle,
            setNotes, setClient, setCourse, setTotalHours,
            setCostHour, setPaymentCondition
        } = this

        return (
            <CalendappContext.Provider value={{
                events, getEvents,
                showModal, setShowModal,
                actionEvent, setActionEvent,
                showModalConfirmDelete, setShowModalConfirmDelete,
                timezone, setTimezone,
                from, setFrom,
                to, setTo,
                title, setTitle,
                notes, setNotes,
                client, setClient,
                course, setCourse,
                totalHours, setTotalHours,
                costHour, setCostHour,
                paymentCondition, setPaymentCondition
            }}>
                {children}
            </CalendappContext.Provider>
        )
    }
}

export default CalendappContext

export { CalendappContextProvider }