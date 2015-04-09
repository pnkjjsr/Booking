// you can enter your JS here!

$(document).ready(function () {
    $.ajax({
        method: "POST",
        url: "feed.json"
    })
            .done(function (feed) {
                var getHotelName = feed.hotels[0].name;
                var getHotelRating = feed.hotels[0].rating;
                var getAddress = feed.hotels[0].address.address + ", " +
                        feed.hotels[0].address.pincode + ", " +
                        feed.hotels[0].address.city + ", " +
                        feed.hotels[0].address.nation;
                var getPhotos = feed.hotels[0].photos;


                function hotels() {
                    this.addName = function (name) {
                        $(name).prepend(getHotelName);
                    };

                    this.addRating = function (rating) {
                        for (var i = 1; i <= getHotelRating; i++) {
                            $(rating).append("★");
                        }
                    };

                    this.addAddress = function (address) {
                        $(address).append(getAddress);
                    };

                    this.addPhotos = function (photos) {
                        var countPhotos = $(getPhotos).size();

                        for (var i = 0; i < countPhotos; i++) {
                            var getThumb = getPhotos[i].thumbnail;
                            var getUrl = getPhotos[i].large;

                            $(photos + " ul").append('<li class="one_photo"><a href="' + getUrl + '"><img src="' + getThumb + '" alt="description of photo 1" /></a></li>');
                        }
                    };
                }
                var obj_hotel = new hotels();
                obj_hotel.addName(".hotel_name");
                obj_hotel.addRating(".stars");
                obj_hotel.addAddress(".hotel_address");
                obj_hotel.addPhotos(".photos");
            });
});