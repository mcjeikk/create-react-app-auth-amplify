import React, { Component } from 'react'
import Utils from '../Utils'

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
            user: '',
            timezone: '',
            start: '',
            end: '',
            total_hours: '',
            title: '',
            notes: '',
            client: {
                name: '',
                course: '',
            },
            invoice: {
                id_invoice: '',
                country: '',
                currency: '',
                cost_per_hour: '',
                total_invoice: '',
                payment_cond_days: '',
                payment_date: Utils.formatDate(new Date()),
                sent: false,
                paid: false,
                // pdfInvoice: '',
            }
        },

        autocompleteClients: [],
        autocompleteCourses: [],
        autocompleteCountries: []

    }





    // Method to update state
    setEvent = (event) => {
        this.setState((prevState) => ({ event }))
    }

    setEvents = (events) => {
        this.setState((prevState) => ({ events }))
    }

    setAutocompleteClients = (autocompleteClients) => {
        this.setState((prevState) => ({ autocompleteClients }))
    }

    setAutocompleteCourses = (autocompleteCourses) => {
        this.setState((prevState) => ({ autocompleteCourses }))
    }

    setAutocompleteCountries = (autocompleteCountries) => {
        this.setState((prevState) => ({ autocompleteCountries }))
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

    render() {

        const { children } = this.props
        const { event, events, showModal,
            actionEvent, showModalConfirmDelete,
            autocompleteClients,
            autocompleteCourses,
            autocompleteCountries
        } = this.state
        const { setEvent, setShowModal,
            setActionEvent, setShowModalConfirmDelete,
            setEvents,
            setAutocompleteClients,
            setAutocompleteCourses,
            setAutocompleteCountries
        } = this

        return (
            <CalendappContext.Provider value={{
                event, setEvent,
                events, setEvents,
                showModal, setShowModal,
                actionEvent, setActionEvent,
                showModalConfirmDelete, setShowModalConfirmDelete,
                setAutocompleteClients, autocompleteClients,
                setAutocompleteCourses, autocompleteCourses,
                setAutocompleteCountries, autocompleteCountries,

            }}>
                {children}
            </CalendappContext.Provider>
        )
    }
}

export default CalendappContext

export { CalendappContextProvider }