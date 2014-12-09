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

    // TODO: handle time before opening
    nextOpenTime: function(date) {
        var changed = false;

        if(date.getHours() < 8) {
            date.setHours(8);
            changed = true;
        }

        if(date.getHours() >= 20) {
            date.setHours(8 + 24);
            changed = true;
        }

        if(date.getDay() == 0) {
            date.setHours(date.getHours() + 24);
            changed = true;
        }

        return changed;
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
