DateUtilities = {

    OPEN: 8,
    CLOSE: 20,

    addDay : function(date, days) {
        date.setHours(date.getHours() + 24*days);
    },

    roundToFollowingHalfHour : function(date) {
        date.setMilliseconds(0);
        date.setSeconds(0);

        if(date.getMinutes() < 30) {
            date.setMinutes(30);
        }

        if(date.getMinutes() > 30) {
            date.setMinutes(30);
            date.setHours(date.getHours() + 1);
        }
    },

    nextOpenDay : function(date) {
        if(date.getHours() >= this.CLOSE) {
            this.addDay(date, 1);
        }
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(30);
        date.setHours(7);
    }

};
