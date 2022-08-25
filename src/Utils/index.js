
import { NotificationManager } from 'react-notifications';

import moment from 'moment-timezone';

export const showNotification = (type, text, timeOut = 0) => {
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

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


const buildEvent = (event) => {

    let item = {
        user_email : event.user_email,
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


export const createEvent = async (event) => {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let item  = buildEvent(event)

    let bodyContent = JSON.stringify(item);

    try {

        let response = await fetch("https://c9ge3dujm1.execute-api.us-east-2.amazonaws.com/prod/create_event", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        if (response.status === 200) {
            response = await response.json()
            showNotification('success', response.response_text)

        }
    } catch (error) {
        showNotification('error', 'Failed on service side')
    }

}

export const updateEvent = async (event) => {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let item  = buildEvent(event)

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
            showNotification('success', response.response_text)

        }
    } catch (error) {
        showNotification('error', 'Failed on service side')
    }

}

export const deleteEvent = async (event) => {
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
            showNotification('success', response.response_text)

        }
    } catch (error) {
        showNotification('error', 'Failed on service side')
    }

}

export const getEvents = async (user_email, dateFrom=new Date(), dateTo=new Date()) => {

    if (typeof dateFrom === "object"){
        dateFrom = formatDate(dateFrom.addDays(-365))
        dateTo = formatDate(dateTo.addDays(+365))
    }

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        "user_email": user_email,
        "start": dateFrom + ' 00:00:00',
        "end": dateTo + ' 00:00:00',
        // "start": "2022-01-01 08:00:00",
        // "end": "2022-12-31 08:00:00"
    });

    let response = await fetch("https://c9ge3dujm1.execute-api.us-east-2.amazonaws.com/prod/search_events", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.json();

    let dateToday = new Date()

    data.forEach(element => {

        let startDateLocal = changeTZ(element.start, element.timezone, moment.tz.guess())
        let endDateLocal = changeTZ(element.end, element.timezone, moment.tz.guess())

        element.start = startDateLocal.substring(0, 16);
        element.end = endDateLocal.substring(0, 16);

        if (element.invoice && dateToday > new Date(element.invoice.payment_date)){
            element.color = '#E74C3C'
        }


    });

    return data;

}

export const changeTimeZone = (date, timeZone) => {
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

export const formatDate = (date) => {
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

export const changeTZ = (date, timeZoneFrom, timeZoneTo) => {

    let date_ = moment.tz(date, timeZoneFrom)

    return moment.tz(date_, timeZoneTo).format()

}

export const capitalizeFirstLetter = (word) => {

    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

}