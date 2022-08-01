module.exports = {
    ObservationIntervals: {
        Raw: 'raw',
        Hour: 'hour',
        Day: 'day'
    },
    BuildWindow: function(end, hours) {
        const endCopy = new Date(end);

        endCopy.setMinutes(0, 0, 0); // clean time values are nice

        const start = new Date(endCopy);

        start.setHours(endCopy.getHours() - hours);

        return {
            start: start,
            end: endCopy
        };
    }
}