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
                var getDesc = feed.hotels[0].description;
                var getFacilities = feed.hotels[0].facilities;
                var getRooms = feed.hotels[0].rooms;
                var getReviews = feed.hotels[0].reviews;

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

                    this.addDesc = function (desc) {
                        $(desc).append(getDesc);
                    };

                    this.addFacilities = function (facilities) {
                        var countFacilities = $(getFacilities).size();

                        for (var i = 0; i < countFacilities; i++) {
                            var getFacility = getFacilities[i];

                            $(facilities + " ul").append('<li>' + getFacility + '</li>');
                        }
                    };

                    this.addRooms = function (rooms) {
                        var countRooms = $(getRooms).size();

                        for (var i = 0; i < countRooms; i++) {
                            var getName = getRooms[i].name;
                            var getOccupancy = getRooms[i].occupancy;
                            var getCurrency = getRooms[i].currency;
                            var getPrice = getRooms[i].price;
                            var getType = getRooms[i].type;

                            $(rooms + " tbody").append('<tr><td class="room_name">' + getName + '</th><td class="room_occupancy">' + getOccupancy + '</th><td class="room_price">' + getCurrency + getPrice + '</th><td class="room_quantity"><select name="room[' + getType + ']"><option value="0" selected="selected">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></th></tr>');
                        }
                    };

                    this.addReviews = function (reviews) {
                        var countReviews = $(getReviews).size();

                        for (var i = 0; i < countReviews; i++) {
                            var getScore = getReviews[i].score;
                            var getReview = getReviews[i].review;
                            var getUser = getReviews[i].user;

                            $(reviews).append('<li class="one_review"><strong class="review_score">' + getScore + '</strong><blockquote class="review_content">' + getReview + '<cite>' + getUser + '</cite></blockquote></li>');
                        }
                    };

                }
                var obj_hotel = new hotels();
                obj_hotel.addName(".hotel_name");
                obj_hotel.addRating(".stars");
                obj_hotel.addAddress(".hotel_address");
                obj_hotel.addPhotos(".photos");
                obj_hotel.addDesc(".description");
                obj_hotel.addFacilities(".facilities");
                obj_hotel.addRooms(".rooms_table");
                obj_hotel.addReviews(".reviews_list");
            });
});