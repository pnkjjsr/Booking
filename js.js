// you can enter your JS here!

$(document).ready(function () {
    $.ajax({
        method: "POST",
        url: "feed.json"
    })
            .done(function (feed) {
                function hotels(name) {
                    this.addName = function () {
                        $(name).prepend(feed.hotels[0].name);
                    };
                }
                var obj_hotel = new hotels(".hotel_name");
                obj_hotel.addName();
            });
});