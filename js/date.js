DateUtilities = {

    roundToFollowingHalfHour : function(date) {
        //        date.setSeconds(0);

        if(date.getMinutes() < 30) {
            date.setMinutes(30);
        }
        if(date.getMinutes() > 30) {
            date.setMinutes(30);
            date.setHours(date.getHours() + 1);
        }
    }

};
