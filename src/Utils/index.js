
import { NotificationManager } from 'react-notifications';
import moment from 'moment-timezone';


// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
class Utils {

    static getEvents = async (user_email, dateFrom = new Date(), dateTo = new Date()) => {

        // if (typeof dateFrom === "object") {
        // dateFrom = this.formatDate(dateFrom.addDays(-365))
        // dateTo = this.formatDate(dateTo.addDays(+365))
        // }

        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "user_email": user_email,
        });

        console.log(bodyContent);

        let response = await fetch("https://c9ge3dujm1.execute-api.us-east-2.amazonaws.com/prod/search_events", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();

        let dateToday = moment()

        data.forEach(element => {

            if (element.isHoliday) {

                if (element.timezone === 'America/Bogota') {
                    element.title = element.title + " Colombia"
                } else if (element.timezone === 'Europe/Madrid') {
                    element.title = element.title + " Spain"
                }

                element.classNames = ['HolidayClass']
                // element.backgroundColor = '#FFFFE0'
                element.color = '#FFFFE0'
                // element.display = 'background'
                // element.allDay = true
                element.textColor = 'black'

                // console.log(element);

            } else {


                let startDateLocal = this.changeTZ(element.start, element.timezone, moment.tz.guess())
                let endDateLocal = this.changeTZ(element.end, element.timezone, moment.tz.guess())

                element.start = startDateLocal.substring(0, 16);
                element.end = endDateLocal.substring(0, 16);

            }

            if (element.invoice && !element.invoice.paid && moment(element.invoice.payment_date).isBefore(dateToday)) {
                element.color = '#E74C3C'
            } else if (element.invoice && !element.invoice.paid && moment(element.end).isBefore(dateToday)) {
                element.color = '#ef877c'
            } else if (moment(element.end).isBefore(dateToday)) {
                //past event
                element.color = '#87B0D9'
            } else if (!element.color && moment(element.end).isAfter(dateToday)) {
                //Future events
                element.color = '#3688D8'
            }

        });



        return data;

    }

    static hideEvents = (events) => {

        events.forEach(element => {

            element.display = 'background'
            element.allDay = true
            element.backgroundColor = '#a8acc9'
            element.title = ''
            element.start = moment(element.start).startOf('week').format()
            element.end = moment(element.start).endOf('week').add(1, 'days').format()

        });

        return events

    }

    static showNotification = (type, text, timeOut = 0) => {
        switch (type) {
            case 'info':
                NotificationManager.info(text);
                break;
            case 'success':
                NotificationManager.success('Success', text);
                break;
            case 'warning':
                NotificationManager.warning('Warning', text, timeOut);
                break;
            case 'error':
                NotificationManager.error(text, 'Error', timeOut);
                break;
            default:
                break;
        }
    }

    static createEvent = async (event) => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let item = this.buildEvent(event)

        let bodyContent = JSON.stringify(item);

        try {

            let response = await fetch("https://c9ge3dujm1.execute-api.us-east-2.amazonaws.com/prod/create_event", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            if (response.status === 200) {
                response = await response.json()
                this.showNotification('success', response.response_text)

            }
        } catch (error) {
            this.showNotification('error', 'Failed on service side')
        }

    }

    static updateEvent = async (event) => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let item = this.buildEvent(event)

        console.log(event);

        let bodyContent = JSON.stringify(item);

        let response = null

        try {

            response = await fetch("https://c9ge3dujm1.execute-api.us-east-2.amazonaws.com/prod/update_event", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            })

            if (response.status === 200) {
                response = await response.json()
                this.showNotification('success', response.response_text)

            }
        } catch (error) {
            this.showNotification('error', 'Failed on service side')
        }

    }

    static deleteEvent = async (event) => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify(event);

        try {

            let response = await fetch("https://c9ge3dujm1.execute-api.us-east-2.amazonaws.com/prod/delete_event", {
                method: "DELETE",
                body: bodyContent,
                headers: headersList
            });

            if (response.status === 200) {
                response = await response.json()
                this.showNotification('success', response.response_text)

            }
        } catch (error) {
            this.showNotification('error', 'Failed on service side')
        }

    }


    static changeTimeZone = (date, timeZone) => {
        if (typeof date === 'string') {
            return new Date(
                new Date(date).toLocaleString('en-US', {
                    timeZone,
                }),
            );
        }

        return new Date(
            date.toLocaleString('en-US', {
                timeZone,
            }),
        );
    }

    static formatDate = (date) => {
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

    static changeTZ = (date, timeZoneFrom, timeZoneTo) => {

        let date_ = moment.tz(date, timeZoneFrom)

        return moment.tz(date_, timeZoneTo).format()

    }

    static capitalizeFirstLetter = (word) => {

        if (word !== undefined && word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }


    }

    static moveUp = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    static buildEvent = (event) => {

        let item = {
            user_email: event.user_email,
            timezone: event.timezone,
            start: event.start,
            end: event.end,
            total_hours: event.total_hours,
            title: event.title,
            notes: event.notes,
            color: event.color,
        }

        if (event.id) {
            item.id = event.id
        }

        if (event.client.name.length > 0) {
            item.client = event.client
        }

        if (event.invoice.id_invoice.length > 0) {
            item.invoice = {
                id_invoice: event.invoice.id_invoice,
                country: event.invoice.country,
                currency: event.invoice.currency,
                cost_per_hour: event.invoice.cost_per_hour,
                total_invoice: event.invoice.total_invoice,
                payment_cond_days: event.invoice.payment_cond_days,
                payment_date: event.invoice.payment_date,
                paid: event.invoice.paid,
                sent: event.invoice.sent,
                // url_invoice: pdfInvoice
            }
        }

        return item
    }

    static getAutoCompleteClients(events) {

        let clients = events.filter(element => {
            return element.client && element.client.name
        }).map(element => element.client.name)

        return [...new Set(clients)].map(element => { return { "value": element } })

    }

    static getAutoCompleteCourses(events) {
        let courses = events.filter(element => {
            return element.client && element.client.course
        }).map(element => element.client.course)

        return [...new Set(courses)].map(element => { return { "value": element } })
    }

    static getAutoCompleteCountries(events) {
        let countries = events.filter(element => {
            return element.invoice && element.invoice.country
        }).map(element => element.invoice.country)

        return [...new Set(countries)].map(element => { return { "value": element } })
    }

    static getHoursDates(from, to) {
        let date_from = new Date(from)
        let date_to = new Date(to)

        let days = Math.floor(Math.abs(date_to.getTime() - date_from.getTime()) / (1000 * 3600 * 24) + 1)
        let hours = Math.abs(date_from - date_to.addDays(-days + 1)) / 36e5
        //The subtraction returns the difference between the two dates in milliseconds. 
        //36e5 is the scientific notation for 60*60*1000, dividing by which converts the milliseconds difference into hours.

        let total_hours = (days * hours).toFixed(1)

        return (total_hours % 1 === 0) ? Math.round(total_hours) : total_hours

    }

    static formatUSD = (number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
    }

    static translateEventByInvoice = (_event) => {

        let startDateLocal = Utils.changeTZ(_event.start, moment.tz.guess(), _event.timezone)
        let endDateLocal = Utils.changeTZ(_event.end, moment.tz.guess(), _event.timezone)

        return {
            id: _event.id,
            user_email: _event.user_email,
            timezone: _event.timezone,
            start: startDateLocal.substring(0, 16), //ex: 2022-08-10T09:00
            end: endDateLocal.substring(0, 16), //ex: 2022-08-10T09:00
            total_hours: _event.total_hours,
            title: _event.title,
            notes: _event.notes,
            color: _event.color,
            client: {
                name: _event.client ? _event?.client.name : '',
                course: _event.client ? _event?.client.course : '',
            },
            invoice: {
                id_invoice: _event.invoice ? _event.invoice.id_invoice : '',
                country: _event.invoice ? _event.invoice.country : '',
                currency: _event.invoice ? _event.invoice.currency : '',
                cost_per_hour: _event.invoice ? _event.invoice.cost_per_hour : '',
                total_invoice: _event.invoice ? _event.invoice.total_invoice : '',
                payment_cond_days: _event.invoice ? _event.invoice.payment_cond_days : '',
                payment_date: _event.invoice ? _event.invoice.payment_date : '',
                sent: _event.invoice ? _event.invoice.sent : false,
                paid: _event.invoice ? _event.invoice.paid : false,
            }
        }

    }

    static translateEvent = (_event) => {

        let startDateLocal = Utils.changeTZ(_event.start, moment.tz.guess(), _event.extendedProps.timezone)
        let endDateLocal = Utils.changeTZ(_event.end, moment.tz.guess(), _event.extendedProps.timezone)

        return {
            id: _event.id,
            user_email: _event.extendedProps.user_email,
            timezone: _event.extendedProps.timezone,
            start: startDateLocal.substring(0, 16), //ex: 2022-08-10T09:00
            end: endDateLocal.substring(0, 16), //ex: 2022-08-10T09:00
            total_hours: _event.extendedProps.total_hours,
            title: _event.title,
            notes: _event.extendedProps.notes,
            color: _event.backgroundColor,
            client: {
                name: _event.extendedProps.client ? _event.extendedProps?.client.name : '',
                course: _event.extendedProps.client ? _event.extendedProps?.client.course : '',
            },
            invoice: {
                id_invoice: _event.extendedProps.invoice ? _event.extendedProps.invoice.id_invoice : '',
                country: _event.extendedProps.invoice ? _event.extendedProps.invoice.country : '',
                currency: _event.extendedProps.invoice ? _event.extendedProps.invoice.currency : '',
                cost_per_hour: _event.extendedProps.invoice ? _event.extendedProps.invoice.cost_per_hour : '',
                total_invoice: _event.extendedProps.invoice ? _event.extendedProps.invoice.total_invoice : '',
                payment_cond_days: _event.extendedProps.invoice ? _event.extendedProps.invoice.payment_cond_days : '',
                payment_date: _event.extendedProps.invoice ? _event.extendedProps.invoice.payment_date : '',
                sent: _event.extendedProps.invoice ? _event.extendedProps.invoice.sent : false,
                paid: _event.extendedProps.invoice ? _event.extendedProps.invoice.paid : false,
            }
        }
    }



}

export default Utils; 