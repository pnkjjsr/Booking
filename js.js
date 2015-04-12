// you can enter your JS here!

$(document).ready(function () {
    $.ajax({
        method: "POST",
        url: "feed.json" // Include Json by AJAX.
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


                var obj_hotel = new hotels();  // Use HOTELS as a CLASS and below define proerty. Basically OOPS javascript.
                obj_hotel.addName(".hotel_name");
                obj_hotel.addRating(".stars");
                obj_hotel.addAddress(".hotel_address");
                obj_hotel.addPhotos(".photos");
                obj_hotel.addDesc(".description");
                obj_hotel.addFacilities(".facilities");
                obj_hotel.addRooms(".rooms_table");
//                obj_hotel.addReviews(".reviews_list");  // Reviews without pagination
                obj_hotel.addPagination(".pagination", 5, ".reviews_list"); // Reviews with pagination



                function hotels() { // define HOTEL class

                    //  add name property
                    this.addName = function (name) {
                        $(name).prepend(getHotelName);
                    };

                    // add rating property
                    this.addRating = function (rating) {
                        for (var i = 1; i <= getHotelRating; i++) {
                            $(rating).append("★");
                        }
                    };

                    // add address property
                    this.addAddress = function (address) {
                        $(address).append(getAddress);
                    };

                    // add photos thumb property
                    this.addPhotos = function (photos) {
                        var countPhotos = $(getPhotos).size();

                        for (var i = 0; i < countPhotos; i++) {
                            var getThumb = getPhotos[i].thumbnail;
                            var getUrl = getPhotos[i].large;
                            var getAlt = getPhotos[i].alt;
                            $(photos + " ul").append('<li class="one_photo"><img src="' + getThumb + '" alt="' + getAlt + '" /></li>');
                        }

                        $(photos + " ul li").click(function () {
                            var getIndex = $(this).index();

                            $(photos).pj_lightbox({// using below define Custom Method here.
                                indexVal: getIndex
                            });
                        });
                    };

                    //  add description property
                    this.addDesc = function (desc) {
                        $(desc).append(getDesc);
                    };

                    //  add facilities property
                    this.addFacilities = function (facilities) {
                        var countFacilities = $(getFacilities).size();

                        for (var i = 0; i < countFacilities; i++) {
                            var getFacility = getFacilities[i];

                            $(facilities + " ul").append('<li>' + getFacility + '</li>');
                        }
                    };

                    //  add rooms property
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

                    // add reviews property without pagination
                    this.addReviews = function (reviews) {
                        var countReviews = $(getReviews).size();

                        for (var i = 0; i < countReviews; i++) {
                            var getScore = getReviews[i].score;
                            var getReview = getReviews[i].review;
                            var getUser = getReviews[i].user;

                            $(reviews).append('<li class="one_review"><strong class="review_score">' + getScore + '</strong><blockquote class="review_content">' + getReview + '<cite>' + getUser + '</cite></blockquote></li>');
                        }
                    };

                    //  add reviews property with pagination
                    this.addPagination = function (pagination, item, review) {
                        var countReviews = $(getReviews).size();
                        var countPage = countReviews / item;

                        //  add pagination Html in the page
                        for (var i = 1; i <= countPage; i++) {
                            $(pagination).append('<li>' + i + '</li>');
                        }

                        // Pagination
                        function getPageClick(click) {
                            var start = item * (click);
                            var end = item * (click + 1);

                            for (var i = start; i < end; i++) {
                                var getScore = getReviews[i].score;
                                var getReview = getReviews[i].review;
                                var getUser = getReviews[i].user;

                                $(review).append('<li class="one_review"><strong class="review_score">' + getScore + '</strong><blockquote class="review_content">' + getReview + '<cite>' + getUser + '</cite></blockquote></li>');
                            }
                        }
                        getPageClick(0);

                        // Getting page number.
                        $(pagination + " li").click(function () {
                            var getClick = $(this).index();
                            $(review + " li").remove();
                            $(pagination + " li").removeClass('active');
                            $(this).addClass('active');
                            getPageClick(getClick);
                        });
                    };
                }
            });

    // Lighbox Custome Method
    $.getJSON("feed.json", function (feed) { // Include JSON direct in file without AJAX.
        (function () {
            jQuery.fn.extend({
                pj_lightbox: function (options) {  // Define custome method.
                    var defaults = {
                        indexVal: '',
                        lightBox: '.lightbox',
                        animationTime: 1000,
                        intervalTime: 5000
                    };
                    var options = $.extend(true, {}, defaults, options);

                    var interval = Interval();
                    var getIndex = options.indexVal;
                    var imageUrl = feed.hotels[0].photos;
                    var imageAlt = feed.hotels[0].photos;
                    var countImage = ($(feed.hotels[0].photos).size()) - 1;

                    // First gallery image by click
                    $(options.lightBox).show();

                    function singlePhotos() {
                        $(options.lightBox + " .gallery img").remove();
                        $(options.lightBox + " .gallery").append('<img src="' + imageUrl[getIndex].large + '" alt="" />');
                        $(options.lightBox + " .gallery .caption p").text(imageAlt[getIndex].alt);
                    }
                    singlePhotos();

                    //Slider Interval
                    function Interval() {
                        intr = setInterval(function () {
                            autoRotate();
                        }, options.intervalTime);
                        return intr;
                    }

                    // Autorotate Function
                    function autoRotate() {
                        getIndex = getIndex + 1;
                        if ((getIndex - 1) === countImage) {
                            getIndex = 0;
                        }

                        $(options.lightBox + " .gallery img").fadeOut(options.animationTime);
                        $(options.lightBox + " .gallery").prepend('<img src="' + imageUrl[getIndex].large + '" alt="" />');
                        $(options.lightBox + " .gallery .caption p").text(imageUrl[getIndex].alt);
                    }

                    // Next
                    (function nextImage() {
                        $(options.lightBox + " .gallery .next").click(function () {
                            clearInterval(interval);
                            autoRotate();
                            interval = Interval();
                        });
                    })();

                    // Prev
                    (function prevImage() {
                        $(options.lightBox + " .gallery .prev").click(function () {
                            clearInterval(interval);
                            getIndex = getIndex - 2;
                            if (getIndex === -2) {
                                getIndex = 12;
                            }
                            autoRotate();
                            interval = Interval();
                        });
                    })();


                    // Close Lightbox and Stop Interval
                    (function close() {
                        $(options.lightBox + " .close").click(function () {
                            clearInterval(interval);
                            $(options.lightBox).hide();
                        });
                    })();
                }
            });
        })(jQuery);

    });
});