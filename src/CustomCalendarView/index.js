import { sliceEvents, createPlugin } from '@fullcalendar/core';

const CustomViewConfig = {

    classNames: ['custom-view'],

    content: function (props) {
        console.log(props);
        let segs = sliceEvents(props, false); // allDay=true
        let html =
            '<div class="view-title">' +
            props.dateProfile.currentRange.start.toUTCString() +
            '</div>' +
            '<div class="view-events">' +
            segs.length + ' events' +
            '</div>'

        return { html: html }
    }

}

export default createPlugin({
    views: {
        custom: CustomViewConfig
    }
});