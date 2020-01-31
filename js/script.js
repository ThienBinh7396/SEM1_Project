$(document).ready(function() {

    $("header .container .menu-controll nav.navbar button div").text($("header .container .menu-controll nav .collapse ul li a.actived").text());

    //controll search bar
    var check = true,
        formCheck; // This variable is used to check the number of products found

    // controll dropdown menu 
    $("header .container .menu-controll nav .collapse ul li.down").click(function() {
        if (check) {
            $(this).find("li").css({
                height: '38px',
                margin: '2px 0 0 0'
            });
            $(this).find("a").css({
                display: "block"
            })
            $(this).find("i").removeClass("fa-sort-down");
            $(this).find("i").addClass("fa-sort-up");
            $(this).find("i").css({
                transform: 'translate(20px,35%)'
            })
        } else {
            $(this).find("li").css({
                height: '0px',
                margin: '0'
            });
            $(this).find("a").css({
                display: "none"
            })
            $(this).find("i").addClass("fa-sort-down");
            $(this).find("i").removeClass("fa-sort-up");
            $(this).find("i").css({
                transform: 'translate(20px,0%)'
            })
        }
        check = !check;
    })
    // slide banner use frame work flux.js
    window.f = new flux.slider('#slider', {
        autoplay: true,
        pagination: false
    });

    // content top review 
    var constructReview = "";

    for (var i = 0; i < 12; i++) {
        constructReview += '<div class="top-review-product"> <img src = "' +
            data[i + 3].img[0] + '"> <p>' + data[i + 3].name.slice(0, 17) +
            '</p> <p class="user-rate" value="' + data[i + 3].detail.Rate + '"></p>' +
            '<p>(1 review)</p> </div>'
    }

    $("header .container .banner .top-review").append(constructReview);

    //slide top review use slick.js

    $("header .container .banner .top-review").slick({
        autoplay: true,
        autoplaySpeed: 5000,
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        speed: 4000

    })

    //insert content into show product

    for (var i = 0; i < data.length; i++) {
        $(".main-content .container .content .listProduct").append(
            '<div class = "product" type = "' + data[i].type + '" brand = "' + data[i].brand + '" index = "' + i + '"> <div class = "before"><img src = "' +
            data[i].img[0] + '" class= "main-image"> <h3>' +
            data[i].name + ' </h3> <p class = "cost" > <span> £ ' +
            data[i].cost + '</span> ex VAT </p> <div class="zoom-in" title = "zoom in" index = "' + i +
            '"><i class="fas fa-search-plus"></i></div> <div class = "buy-now" title = "buy now" index = "' + i +
            '" ><i class="fas fa-cart-arrow-down"></i> </div> </div> <div class = "after" value = "true">' +
            addP(data, i) + ' <p>Pro No: <span>' + data[i].proNo +
            '</span></p><a href="" class = "btn"><span class="txt">more information</span><span class="round"><i class = "fas fa-chevron-right"></i></span> </a> </div> </div>'
        );
    }


    function addP(type, index) {
        var text = "";
        for (var i = 0; i < type[index].info.length; i++) {
            text += "<p>" + type[index].info[i] + "</p>";
        }
        return text;
    }

    //display product

    function findProduct(key, type) {
        var text = new RegExp(key, "i");
        var select = $(".main-content .container .content .listProduct .product");
        formCheck = 0;

        select.hide();

        if (type == "attr") {
            for (var i = 0; i < select.length; i++) {
                if (text.test(select.eq(i).attr("type"))) {
                    select.eq(i).show({
                        effect: "clip"
                    });
                } else {
                    select.eq(i).hide({
                        effect: "clip"
                    });
                }
            }
        } else
        if (type == "text") {
            $(".main-content .container .content ul li").removeClass("active");
            $(".main-content .container .content ul li").eq(0).addClass("active");

            for (var i = 0; i < select.length; i++) {
                if (text.test(select.eq(i).find('h3').text())) {
                    select.eq(i).show({
                        effect: "clip"
                    });
                    formCheck++;
                } else {
                    select.eq(i).hide({
                        effect: "clip"
                    });
                }
            }
        } else
        if (type == "" && key == "") {
            select.show();
        }

    }

    // display products have type ,is the type of product the user has clicked on the catagories list
    $(" .main-content .container .content nav.navbar button div").text($(".main-content .container .content ul li.active").text());
    $(".main-content .container .content ul li").click(function() {

        $(".main-content .container .content ul li").removeClass("active");
        $(this).addClass("active");
        if ($(this).index() == 0) {
            findProduct("", "");
        } else {
            findProduct($(this).text(), "attr");
        }
        $(" .main-content .container .content nav.navbar button div").text($(this).text());

    })

    // Suggestions appear when entered in search form

    var options = "<ul>";
    for (var i = 0; i < data.length; i++) {
        options += "<li>" + data[i].name + "</li>";
    }
    options += "</ul>";


    $("header .container .menu-controll nav .collapse ul li:last-child .form").append(options);

    $("header .container .menu-controll nav .collapse ul li:last-child .form input").mouseleave(function() {
        if ($(this).val() == "") {
            $("header .container .menu-controll nav .collapse ul li:last-child .form ul li").hide();
            $("header .container .menu-controll nav .collapse ul li:last-child .form ul").hide();
        }
    })

    $("header .container .menu-controll nav .collapse ul li:last-child .form input").keyup(function() {
        var li = $("header .container .menu-controll nav .collapse ul li:last-child .form ul li");

        li.hide();

        li.each(function() {
            var text = new RegExp($("header .container .menu-controll nav .collapse ul li:last-child .form input").val(), "igm");
            if (text.test($(this).text())) {
                $("header .container .menu-controll nav .collapse ul li:last-child .form ul").show();
                $(this).fadeIn("fast");
            }
        });
    })

    // show product is found when the user enters the search field
    $("header .container .menu-controll nav .collapse ul li:last-child .form ul li").click(function() {
        $('html, body').animate({
            scrollTop: $(".main-content .container .content").offset().top - 30
        }, 600);
        $("header .container .menu-controll nav .collapse ul li:last-child .form ul li").hide();
        findProduct($(this).text(), "text");
    })

    $("header .container .menu-controll nav .collapse ul li:last-child .form a").click(function(event) {
        // If the formCheck = 0, report 'no product found' is displayed, the formCheck # 0 scroll to the information and display the product found.


        if (formCheck != 0) {   
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 30
            }, 433);
        } else {
            $("header .container .menu-controll nav .collapse ul li:last-child .form .report").show("clip");
            setTimeout(function() {
                $("header .container .menu-controll nav .collapse ul li:last-child .form .report").fadeOut();

            }, 1500);
        }
        findProduct($("header .container .menu-controll nav .collapse ul li:last-child .form input").val(), "text");

        return false;
    });


    // display product of a brand
    $("header .container .menu-controll nav .collapse ul li.down ul li a").click(function(event) {
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 100
        }, 500);

        findProduct($(this).text(), "text");
        return false;
    });

    $(".main-content .container .sidebar .group:nth-child(1) h3").click(function() {
        findProduct("", "");
    })


    // hover effect

    $(".main-content .container .content .listProduct .product .after").click(function(event) {
        $(".main-content .container .content .listProduct .product .after").css({
            bottom: "100%",
        })
        $(".main-content .container .content .listProduct .product:not(:nth-child(" + ($(this).parents(".product").index() + 1) + ")) .after").attr("value", "true");
        var val = $(this).attr("value");
        if (val == "true") {
            val = "false";
            $(this).css({
                bottom: "0"
            })

        } else {
            val = "true";
            $(this).css({
                bottom: "100%"
            })
        }
        $(this).attr("value", val);

    });


    // zoom image effect when hover image ( function zoom() called below)
    function zoom() {
        $(".main-content .container .content .productDetail .slideProduct .image .item").each(function(index, el) {
            $(this).hover(function() {
                $(".main-content .container .content .productDetail .zoom").show();
            }, function() {
                $(".main-content .container .content .productDetail .zoom").hide();
            })
            $(this).mousemove(function() {

                var pos = $(this).offset();
                var x = event.pageX - pos.left - 75;
                var y = event.pageY - pos.top - 75;

                if (x < 0) x = 0;
                if (x > $(this).width() - 150) x = $(this).width() - 150;
                if (y < 0) y = 0;
                if (y > $(this).height() - 150) y = $(this).height() - 150;


                $(this).children(".move").css({
                    top: y + 'px',
                    left: x + 'px'
                });

                var zoomSrc = $(this).find("img").attr('src');
                var zoomWidth = $(this).find("img").width();
                var zoomHeight = $(this).find("img").height();

                $(".main-content .container .content .productDetail .zoom").css({
                    'background': "url('" + zoomSrc + "') no-repeat",
                    'background-size': zoomWidth * 3 + "px " + zoomHeight * 3 + "px",
                    'background-position': -x * 3 + "px " + -y * 3 + "px"
                })
                if( $(window).width() < 768){
                    $(".main-content .container .content .productDetail .slideProduct .image .item").click(function(event) {
                    $(this).children('.hover').show();
                });
                } else{
                    $(".main-content .container .content .productDetail .slideProduct .image .item").click(function(event) {
                    $(this).children('.hover').hide();
                });    
                }
                $(".main-content .container .content .productDetail .slideProduct .image .item").mouseleave(function(event) {
                    $(this).children('.hover').hide();
                });
                $(".main-content .container .content .productDetail .slideProduct .image .item").parents(".productDetail").find(".slick-current").find(".hover").css({
                    'background': "url('" + zoomSrc + "') no-repeat",
                    'background-size': $(".main-content .container .content .productDetail .slideProduct .image .item").width() * 2 + "px " + $(".main-content .container .content .productDetail .slideProduct .image .item").height() * 2 + "px",
                    'background-position': -(event.pageX - pos.left) + "px " + -(event.pageY - pos.top) + "px"
                });
            });
            $(this).hover(function() {
                $(this).children(".move").show();
            }, function() {
                $(this).children(".move").hide();
            });
        });
    }

    // controll showProduct

    var currentProduct; // currentProduct is the product want to show more detail infomation
    var amountClick = 0; 
    // check first click on top review , if the fisrt time click on top reivew, call showProductDetail()
    // if amountClick # 0 , stop slick slide in showProductDetail then call showProductDetail()

    $(".main-content .container .content .listProduct .product .after a").click(function(event) {
        event.preventDefault();
        showProductDetail($(this).parents(".product").attr("index"));
    });
    $("header .container .banner .top-review .top-review-product p:nth-child(2)").click(function() {
        if ($(".top-review").hasClass("page")) {
            window.location.assign('home2.html')
        } else {
            if (amountClick == 1) {
                $(".main-content .container .content .productDetail .slideProduct").slick('unslick'); // stop slick slide
            }
            showProductDetail($(this).parents(".slick-slide").index());
            amountClick = 1;
        }
    })

    $(".main-content .container .content .listProduct .product .before .zoom-in").click(function() {
        showProductDetail($(this).attr("index"));
    })

    // showProductDetail get the productID of the product that the user wants to see then change the content of the product detail display
    function showProductDetail(productID) {
        $('html, body').animate({
            scrollTop: $(".main-content .container .content").offset().top - 30
        }, 343);

        $(".main-content .container .content .listProduct").slideUp("slow");

        $("#main-content ul.categories").hide({
            effect: "fade",
            easing: "linear",
            duration: 600,
            direction: "left"
        });

        currentProduct = productID;

        $(".main-content .container .content .productDetail nav ol li:last-child").text(data[productID].type); // Displays the type of product that the user is viewing
        for (var j = 0; j < 3; j++) {
            $(".main-content .container .content .productDetail .slideProduct .main-img").eq(j).children().children("img").attr("src", data[productID].img[j]);

        } // change source of image slideshow

        $('.main-content .container .content .productDetail .information h3').text(data[productID].name); // name of product

        $('.main-content .container .content .productDetail .information p:nth-child(2) b').text(data[productID].brand); //manufacturer

        $('.main-content .container .content .productDetail .information p:nth-child(3) span').text(data[productID].availability); //availability

        $('.main-content .container .content .productDetail .information p:nth-child(4) span').text("£" + data[productID].cost + " ex VAT"); //cost

        $(".main-content .container .content .productDetail .information table").empty();


        var construct = ""; // this variable is used contain construct product details sheet

        for (x in data[productID].detail) {
            if (x == "Rate") {
                construct += "<tr><td>" + x + "</td><td class = 'user-rate' value = '" + data[productID].detail[x] + "'> </td></tr>";
            } else {
                construct += "<tr><td>" + x + "</td><td>" + data[productID].detail[x] + "</td></tr>";
            }
        }

        $(".main-content .container .content .productDetail .information table").append(construct);
        rate();


        $(".main-content .container .content .productDetail").show({
            effect: "drop",
            easing: "linear",
            duration: 600,
            direction: "right"
        });

        zoom(); // call zoom() function above


        // slide show product used slick.js
        $(".main-content .container .content .productDetail .slideProduct").slick({
            autoplay: true,
            autoplaySpeed: 7500,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            arrows: false,
            initialSlide: 0,
            lazyLoad: 'progressive'
        });

        $(".main-content .container .content .productDetail .slideProduct ul.slick-dots li").each(function(index, el) {
            var src = $(".main-content .container .content .productDetail .slideProduct .image").eq(index + 1).find("img").attr('src');
            $(this).css({
                background: "url('" + src + "') no-repeat center",
                "background-size": "100% 97%"


            });
        });

       // set min height div has class content when displaying product details and when resizing the window because div class productDetail has absolute position
        // and the div has display relaitive position = none (except div nav and div have class cover), so the height of div class content = 60px;

        $(".main-content .container .content").css("min-height",$(".main-content .container .content .productDetail .col").height() + 5);
        $(window).resize(function(){
            $(".main-content .container .content").css("min-height",$(".main-content .container .content .productDetail .col").height() + 5);
        })
    }

    // display table compare product
    $(".main-content .container .content .productDetail .information form button[name = 'compare']").click(function(event) {
        event.preventDefault();

        $(".main-content .container .content .compare").show({
            effect: "clip",
            duration: 600
        });

        $(".main-content .container .content .compare table").empty();


        var arr = [currentProduct]; // this array contains id of current product and id of orthers have same type ( 4 product)

        for (var i = 0; i < data.length; i++) {
            if (data[i].type == data[currentProduct].type && arr.length < 4 && i != currentProduct) {
                arr.push(i);
            }
        }

        var table = "<tr><td></td>"; // this variable contains contruct of product comparison table
        for (var i = 0; i < 4; i++) {
            table += "<td><img src='" + data[arr[i]].img[0] + "' </td>";
        } // the first row of table contains image of product

        table += "</tr>";

        for (x in data[currentProduct].detail) {
            if (x != "Asin") {
                var txt = "<td>" + x + "</td>";
                for (var i = 0; i < 4; i++) {
                    if (x == "Rate") {
                        txt += "<td class = 'user-rate' value = '" + data[arr[i]].detail[x] + " '></td>";
                    } else {
                        txt += "<td>" + data[arr[i]].detail[x] + "</td>";
                    }
                }
                table += "<tr>" + txt + "</tr>";
            }

        } // orther row of table contains the product's attributes and its value

        table += "<tr><td>Price</td>";
        for (var i = 0; i < 4; i++) {
            table += "<td> £ " + data[i].cost + " ex VAT </td>";
        }
        table += "</tr>";

        $(".main-content .container .content .compare table").append(table);

        rate();

    });

    // controll display page compare product
    $(".main-content .container .content .compare").click(function() {
        $(this).hide({
            effect: "clip",
            duration: 600
        });
        $('html, body').animate({
            scrollTop: $(".main-content .container .content").offset().top - 30
        }, 343);

        rate();

    })
    $(".main-content .container .content .productDetail nav ol, .main-content .container .content .productDetail .back-to-home").click(function() {
        $(".main-content .container .content .productDetail .slideProduct").slick('unslick'); // stop slick slide

        $('html, body').animate({
            scrollTop: $(".main-content .container .content").offset().top - 30
        }, 600);

        $(".main-content .container .content .listProduct").show();

        status = true;
        $("#main-content ul.categories").show({
            effect: "fade",
            easing: "linear",
            duration: 600,
            direction: "left"
        });

        $(".main-content .container .content .productDetail").hide({
            effect: "drop",
            easing: "linear",
            duration: 600,
            direction: "right"
        });
        return false;
    })
    // div rate

    rate();

    function rate() {
        $(".user-rate").each(function(index, el) {

            $(this).empty();

            var num = Number($(this).attr("value"));
            $(this).append("<div class='box'><div class = 'rating' style = 'width : " + num / 5 * 100 + "%' ></div></div>");
        })
    }

    // add li brand logo
    var listBrand = "";
    var posLogo = 0;
    for (var i = 0; i < 14; i++) {
        if (posLogo > 680) posLogo = 0;
        listBrand += "<div class='item' ><img style =' background-position : left " + -posLogo + "px '></div>";
        posLogo += 85;

    }
    $(".brand_logo .container .row .col .brand_logo").append(listBrand);

    // slide show list brand use slick.js ( width responsive)
    $(".brand_logo .container .row .col .brand_logo").slick({
        autoplay: true,
        dots: false,
        autoplaySpeed: 4000,
        slidesToShow: 9,
        slidesToScroll: 1,
        infinite: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    autoplay: true,
                    dots: false,
                    autoplaySpeed: 4000,
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    autoplay: true,
                    dots: false,
                    autoplaySpeed: 4000,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    autoplay: true,
                    dots: false,
                    autoplaySpeed: 4000,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
            
        ]
    })

    // Basket 
    $(".main-content .container .content .icon-basket").click(function() {
        checkBasket = false;
        showBasket();
        checkBasket = true;
    })

    var checkBasket = false; // if checkBasket has value = false , click on "add to basket" or "buy now" buttton the basket will be displayed and vice versa
     $(".main-content .container .content .basket .hidden").click(function() {
        showBasket();
    });

    $(".main-content .container .content .basket .top").click(function() {
        checkBasket = true;
        showBasket();
    })

    function showBasket() {
        if (checkBasket) {
            $(".main-content .container .content .basket .hidden").show();
            $(".main-content .container .content .basket .hidden").children().removeClass("fa-caret-right").addClass("fa-caret-left");
            $(".main-content .container .content .basket").css({
                right: "-320px"
            });
        } else {
            $(".main-content .container .content .basket .hidden").children().addClass("fa-caret-right").removeClass("fa-caret-left");

            if ($(window).width() < 348) {
                $(".main-content .container .content .basket .hidden").hide();
            } else {
                $(".main-content .container .content .basket .hidden").show();

            }


            $(window).resize(function() {
                if ($(window).width() < 348) {
                    $(".main-content .container .content .basket .hidden").hide();
                } else {
                    $(".main-content .container .content .basket .hidden").show();

                }
            })
            $(".main-content .container .content .basket").css({
                right: "0px"
            });

        }
        checkBasket = !checkBasket;
    }
    // Update basket

    var buy = 0; // amount product bought
    var basket = {
        dt: [],
        update: function(index, Qty) {
            var item = {
                img: data[index].img[0],
                name: data[index].name,
                amount: Qty,
                unitPrice: data[index].cost,
                price: (data[index].cost * Qty),
                pos: index
            }
            buy++;
            this.dt.push(item);
        },
        updateTable: function() {
            var table = $(".main-content .container .content .basket .my-basket .bill .cover table");
            table.empty();
            for (var i = 0; i < this.dt.length; i++) {
                if (i == 0) {
                    table.append('<tr><td></td><td>Name</td><td style="padding-left : 6px"> Price</td></tr>');
                }
                table.append("<tr><td><img src = '" + this.dt[i].img + "'> </td> <td>" + this.dt[i].name + "</td><td><input type='number' value='" + this.dt[i].amount + "'> <span>" + this.dt[i].price.toFixed(2) + "</span><div class='hide' value='" + i + "'>x</div></td>");
            }

            if (this.dt.length == 0) table.append('<tr></tr><tr><td style="width: 100% !important; font-size: 14px;padding-top: 30px;text-align: center;text-transform: uppercase;color: #000;font-weight: 700;"> your basket empty</td></tr>');
            $(".main-content .container .content .icon-basket span").text(buy);
        },
        removeProduct: function(index) {
            buy--;
            if (buy < 0) buy = 0;
            this.dt.splice(index, 1);
            this.updateTable();
        },
        totalPrice: function() {
            var total = 0;
            for (var i = 0; i < this.dt.length; i++) {
                total += this.dt[i].price;
            }
            $(".main-content .container .content .basket .my-basket .bill .cost span").html("&#163; " + total.toFixed(2));
        }
    }

    $(".main-content .container .content .productDetail .information form button[name='basket']").click(function(event) {
        event.preventDefault();
        var Qty = Number($(this).siblings('label').children().val());
        showCart(Qty);

    }); // show the basket when click basket button 

    $(".main-content .container .content .listProduct .product .before .buy-now").click(function() {
        currentProduct = $(this).attr("index");
        showCart(1);
    });

    function showCart(Qty) {
        var checkUpdate = 1;
        for (var j = 0; j < basket.dt.length; j++) {
            if (basket.dt[j].pos == currentProduct) {
                basket.dt[j].amount = (Qty + Number(basket.dt[j].amount));
                basket.dt[j].price += (data[currentProduct].cost * Qty);
                checkUpdate = 0;
                break;
            }
        }
        if (checkUpdate == 1) {
            basket.update(currentProduct, Qty);
        }
        basket.updateTable();

        checkBasket = false;
        showBasket();
        checkBasket = true;

        basket.totalPrice();

    }


    // Control the number of products you want to buy

    $(".main-content .container .content .basket .my-basket .bill .cover table").mouseenter(function(event) {
        // delete products do not want to buy anymore
        $(".main-content .container .content .basket .my-basket .bill .cover table tr td .hide").click(function(event) {
            basket.removeProduct($(this).attr('value'));
            basket.totalPrice();
        })
        
        $(".main-content .container .content .basket .my-basket .bill .cover table tr td input").keyup(function() {
            var a = $(this).parents("tr").index() - 1;
            basket.dt[a].amount = $(this).val();
            basket.dt[a].price = basket.dt[a].amount * basket.dt[a].unitPrice;

            $(this).siblings("span").text(basket.dt[a].price.toFixed(2));
            basket.totalPrice();
        })
        $(".main-content .container .content .basket .my-basket .bill .cover table tr td input").click(function(event) {
            var a = $(this).parents("tr").index() - 1;
            basket.dt[a].amount = $(this).val();
            basket.dt[a].price = basket.dt[a].amount * basket.dt[a].unitPrice;

            $(this).siblings("span").text(basket.dt[a].price.toFixed(2));
            basket.totalPrice();
        });
    });


});