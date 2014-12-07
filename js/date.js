DateUtilities = {

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

        if(date.getHours() >= 20) {
            date.setHours(8 + 24);
            changed = true;
        }

        if(date.getDay() == 0) {
            date.setHours(date.getHours() + 24);
            changed = true;
        }

        return changed;
    }

};
