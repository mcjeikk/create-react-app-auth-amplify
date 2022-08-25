
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

export const createEvent = async (event) => {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify(event);

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

    let bodyContent = JSON.stringify(event);

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

export const getEvents = async (dateFrom, dateTo) => {

    if (dateFrom === undefined && dateTo === undefined) {
        let today = new Date()

        dateFrom = formatDate(today.addDays(-365))

        dateTo = formatDate(today.addDays(+365))

    }

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
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

    

    data.forEach(element => {

        console.log(element);

        let startDateLocal = changeTZ(element.start, element.timezone, moment.tz.guess())
        let endDateLocal = changeTZ(element.end, element.timezone, moment.tz.guess())

        console.log(element.start);
        console.log(startDateLocal);

        console.log(element.end);
        console.log(endDateLocal);

        element.start = startDateLocal.substring(0, 16);
        element.end = endDateLocal.substring(0, 16);

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