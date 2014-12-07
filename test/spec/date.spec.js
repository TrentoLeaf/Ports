'use strict';

describe("Date Utilities", function() {

    describe("Function 'roundToFollowingHalfHour'", function() {

        it("Before half hours", function() {
            var date = new Date();
            date.setMinutes(0);
            var hoursBefore = date.getHours();

            for(var i = 0; i < 30; i++) {
                var currentDate = new Date(date);
                currentDate.setMinutes(i);
                DateUtilities.roundToFollowingHalfHour(currentDate);
                expect(currentDate.getHours()).toBe(hoursBefore);
            }
        });

        it("Exactly half hours", function() {
            var date = new Date();
            date.setMinutes(30);
            var hoursBefore = date.getHours();

            for(var i = 0; i < 24; i++) {
                var currentDate = new Date(date);
                currentDate.setHours(currentDate.getHours() + i);
                DateUtilities.roundToFollowingHalfHour(currentDate);
                expect(currentDate.getHours()).toBe((hoursBefore + i) % 24);
            }
        });

        it("After half hours", function() {
            var date = new Date();
            date.setMinutes(31);
            var hoursBefore = date.getHours();

            for(var i = 0; i < 30; i++) {
                var currentDate = new Date(date);
                currentDate.setMinutes(date.getMinutes() + i);
                DateUtilities.roundToFollowingHalfHour(currentDate);
                expect(currentDate.getHours()).toBe(hoursBefore + 1);
            }
        });

    });
});
