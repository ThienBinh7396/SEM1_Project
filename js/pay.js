$(function() {
    $("header .container .banner .checkoutSteps .checkout .content .item form label input:not([type='radio'])").addClass("current").parent().append("<div class='report'>This is a required field.</div>");

    $("header .container .banner .checkoutSteps .checkout .content .item form.order label input").click(function() {
        $("header .container .banner .checkoutSteps .checkout .content .item form.register label input").addClass("current");

        $("header .container .banner .checkoutSteps .checkout .content .item form.register label").show();
        if ($(this).parent().index() == 0) {
            $("header .container .banner .checkoutSteps .checkout .content .item form.register label:nth-child(4)").hide().children().removeClass("current");
        }
        if ($(this).parent().index() == 2) {
            $("header .container .banner .checkoutSteps .checkout .content .item form.register label:nth-child(3)").hide().children().removeClass("current");
            $("header .container .banner .checkoutSteps .checkout .content .item form.register label:nth-child(4)").hide().children().removeClass("current");

        }
    });

    $("header .container .banner .checkoutSteps .checkout .content .item form.payment label input").click(function() {
        $("header .container .banner .checkoutSteps .checkout .content .item form.payment .image").slideUp();
        $(this).parent().next().slideDown();

    })

    $("header .container .banner .checkoutSteps .checkout .content .item form input[type='email']").blur(function() {
        if (!isEmail($("input[type='email']").val())) {
            $(this).siblings('.report').text("Valid email address is:  ex@domain.").fadeIn();

            checkVal = 1;

            setTimeout(function() {
                $("input[type='email']").siblings('.report').hide().text("This is a required field.");
            }, 1000);
        }
    })

    $("header .container .banner .checkoutSteps .checkout:not(:last-child) .content .bottom button").click(function() {
        var i = parseInt($(this).attr("value"));
        var checkVal = 0;
        $("header .container .banner .checkoutSteps .checkout:nth-child(" + (i - 1) + ") .content .form .item form input").each(function(index, el) {
            if ($(this).val() == "" && $(this).hasClass('current')) {
                $(this).siblings('.report').fadeIn();
                checkVal = 1;

                setTimeout(function() {
                    $("header .container .banner .checkoutSteps .checkout .report").fadeOut();
                }, 1000);



            }
            if ($(this).is("[type='email']") && !isEmail($("input[type='email']").val())) {
                $(this).siblings('.report').text("Valid email address is:  ex@domain.").fadeIn();

                checkVal = 1;

                setTimeout(function() {
                $("input[type='email']").siblings('.report').hide().text("This is a required field.");
            }, 1000);
            }
        });



        if (checkVal == 0) {
            showContent(i);
        }
        if (i == 3) {
            $("header .container .banner .checkoutSteps .checkout .content .item form.ship label input").each(function(index, el) {
                $("header .container .banner .checkoutSteps .checkout .content .item form.pay label:nth-child(" + ($(this).parent().index() + 1) + ") input").val($(this).val());
            });
        }
    })
    $("header .container .banner .checkoutSteps .checkout:first-child .content .bottom button").click(function() {
        var checkForm = 0;

        $("header .container .banner .checkoutSteps .checkout:first-child .content .form .item form input").each(function(index, el) {
            if ($(this).val() == "" && $(this).hasClass('current')) {
                checkForm = 1;
            }
        });

        if (!isEmail($("input[type='email']").val())) {
            checkForm = 1;
        }

        if (checkForm == 0) {
            $("header .container .banner .checkoutSteps .checkout:first-child").append("<div class='info row'><ul class='col'><li class='strong'>You are checking out using the email:</li><li>" +
                $("header .container .banner .checkoutSteps .checkout:first-child .content .form .item form input[type='email']").val() + "</li><ul></div>");

        }

    })

    $("header .container .banner .checkoutSteps .checkout:nth-child(2) .content .bottom button").click(function() {
        var checkForm = 0;

        $("header .container .banner .checkoutSteps .checkout:first-child .content .form .item form input").each(function(index, el) {
            if ($(this).val() == "" && $(this).hasClass('current')) {
                checkForm = 1;
            }
        });


        if (checkForm == 0) {
            var contructInfo = "<div class='info row'><ul class='col'>";
            for (var i = 2; i < 6; i++) {
                if (i == 2) {
                    contructInfo += "<li>" + $("header .container .banner .checkoutSteps .checkout:nth-child(2) .content .form .item form.ship label:nth-child(1) input[type='text']").val() + " " +
                        $("header .container .banner .checkoutSteps .checkout:nth-child(2) .content .form .item form.ship label:nth-child(2) input[type='text']").val() + "</li>";
                } else {
                    contructInfo += "<li>" + $("header .container .banner .checkoutSteps .checkout:nth-child(2) .content .form .item form.ship label:nth-child(" + i + ") input[type='text']").val() + "</li>";
                }
            }
            contructInfo += "</ul><ul class='col'><li class='strong'>Shipping:</li><li>" + $("header .container .banner .checkoutSteps .checkout:nth-child(2) .content .form .item form.shipping input:checked").parent().text() + "</li></ul></div>";

            $("header .container .banner .checkoutSteps .checkout:nth-child(2)").append(contructInfo);
        }
    })


    $("header .container .banner .checkoutSteps .checkout:not(:last-child) h4").click(function() {
        if ($(this).parent().hasClass("before")) {
            var z = parseInt($(this).parent().index()) + 1;
            showContent(z);
            $("header .container .banner .checkoutSteps .checkout:not(:nth-child(" + (z - 1) + ") ) .info").remove();
        }
    })

    function showContent(index) {
        $("header .container .banner .checkoutSteps .checkout .content").slideUp();
        $("header .container .banner .checkoutSteps .checkout").removeClass("active").addClass("before");
        $("header .container .banner .checkoutSteps .checkout:nth-child(" + index + ")").addClass("active").removeClass("before");
        $("header .container .banner .checkoutSteps .checkout:nth-child(" + (index + 1) + ")").removeClass("before");
        $("header .container .banner .checkoutSteps .checkout:nth-child(" + (index + 2) + ")").removeClass("before");
        $("header .container .banner .checkoutSteps .checkout:nth-child(" + index + ") .content").slideDown();

    }

    function isEmail(emailStr) {
        var emailPat = /^(.+)@(.+)$/
        var specialChars = "\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
        var validChars = "\[^\\s" + specialChars + "\]"
        var quotedUser = "(\"[^\"]*\")"
        var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
        var atom = validChars + '+'
        var word = "(" + atom + "|" + quotedUser + ")"
        var userPat = new RegExp("^" + word + "(\\." + word + ")*$")
        var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$")
        var matchArray = emailStr.match(emailPat)
        if (matchArray == null) {
            return false
        }
        var user = matchArray[1]
        var domain = matchArray[2]

        // See if "user" is valid
        if (user.match(userPat) == null) {
            return false
        }
        var IPArray = domain.match(ipDomainPat)
        if (IPArray != null) {
            // this is an IP address
            for (var i = 1; i <= 4; i++) {
                if (IPArray[i] > 255) {
                    return false
                }
            }
            return true
        }
        var domainArray = domain.match(domainPat)
        if (domainArray == null) {
            return false
        }

        var atomPat = new RegExp(atom, "g")
        var domArr = domain.match(atomPat)
        var len = domArr.length

        if (domArr[domArr.length - 1].length < 2 ||
            domArr[domArr.length - 1].length > 3) {
            return false
        }

        // Make sure there's a host name preceding the domain.
        if (len < 2) {
            return false
        }

        // If we've gotten this far, everything's valid!
        return true;
    }
});