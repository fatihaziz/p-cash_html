var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].className = slides[i].className.replace(" show", "");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].className += " show";
    dots[slideIndex - 1].className += " active";

    // Effect for Background Move
    var minX = -370;
    var maxX = 100
    var totalX = maxX - minX;
    var range = totalX / slides.length * (slideIndex);

    $('.bg').animate({
        'background-position-x': maxX - range,
        specialEasing: {
            'background-position-x': "easeOutBounce",
        },
    }, 300, function() {
        $('.next').click(function() {

        });
    });
}

// Pagination Script
var table = '#brokers-table'
var maxRows = 5;
var totalRows = $(table + ' tbody tr').length
var trnum = 0;
$(table + '  tr:gt(0)').each(function() {
    trnum++
    $(this).prepend('<td><h5 class="dark b">' + trnum + '</h5></td>');
    if (trnum > maxRows) {
        $(this).hide()
    }
    if (trnum <= maxRows) {
        $(this).show()
    }
})

if (totalRows > maxRows) {
    var pagenum = Math.ceil(totalRows / maxRows)
    for (var i = 1; i <= pagenum;) {
        $('.pagination').append('<li class="page-item" data-page="' + i + '">\<span class="page-link">' + i++ + '</span>\</li>').show()
    }
}
$('.pagination li:first-child').addClass('active')

var maxNum = $('.pagination li').length;
var pageNum = 1;

if (totalRows > maxRows) {
    $('.pagination').append('<li class="page-item paging next">\<span class="page-link"><i class="icon arrow_carrot-2right"></i></span>\</li>').show()
    $('.pagination').prepend('<li class="page-item paging prev">\<span class="page-link"><i class="icon arrow_carrot-2left"></i></span>\</li>').show()
}

$('.pagination').on('change', function() {
    if (pageNum == maxNum) {}
})
$('.pagination li.paging').on('click', function() {
    typeNav = $(this).attr('class');
    var beforeChange = pageNum;
    if (typeNav == "page-item paging next") {
        pageNum++;
    } else {
        pageNum--;
    }

    scrollTo("#broker-list");

    if (pageNum >= maxNum + 1 || pageNum < 1) {
        pageNum = beforeChange;
        return false;
    }
    var trIndex = 0;
    $('.pagination li').removeClass('active')
    var currentNum = pageNum;
    $('.pagination li').eq(currentNum).addClass('active')
    $(table + ' tr:gt(0)').each(function() {
        trIndex++
        if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
            $(this).hide()
        } else {
            $(this).show()
        }
    })
});

function scrollTo(to) {

    var scrollTo = $(to).offset().top;
    $('html, body').animate({
        scrollTop: scrollTo
    }, 100);
}

$('.pagination li:not(.paging)').on('click', function() {
    scrollTo("#broker-list");

    pageNum = $(this).attr('data-page');
    var trIndex = 0;
    $('.pagination li').removeClass('active')
    var currentNum = pageNum;
    $('.pagination li').eq(currentNum).addClass('active')
    $(table + ' tr:gt(0)').each(function() {
        trIndex++
        if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
            $(this).hide()
        } else {
            $(this).show()
        }
    })
})

$(".scroll").on('click', function() {
    scrollTo("#broker-list");

    return false;
});


// New Windows Brokers Form
$('.table tbody tr').click(function(event) {
    event.preventDefault();
    var filename = $(this).attr('data-name');

    $('.download').attr('data-target', filename);

    var closebtn = $('aside .close');
    var closeicon = $('aside .close .arrow_carrot-2left');
    if (closebtn) {
        closebtn.removeClass('hidden');
        closeicon.addClass('arrow_carrot-2right');
        closeicon.filter('.arrow_carrot-2left').removeClass('arrow_carrot-2left');
    }
    $('aside').addClass('visible');
    $('aside .btn').click(function() {

    });


    PopupCenter($(this).attr("data-id"), $(this).attr("data-name"), 600, 600);
    // window.open($(this).attr("data-id"), "popupWindow", "width=600,height=600,scrollbars=yes,resizable=no");
});

$('.download').click(function(e) {
    e.preventDefault;
    window.open("manuals/download/" + $(this).attr('data-target'), '_blank');
    return false;
});

$('.close').click(function() {
    closeSide();
});

function closeSide() {
    var aside = $('aside');
    if (aside.hasClass('visible')) {

        $('aside').removeClass('visible');
        var closebtn = $('aside .close');
        var closeicon = $('aside .close .arrow_carrot-2right');
        if (closebtn) {
            closeicon.addClass('arrow_carrot-2left');
            closeicon.filter('.arrow_carrot-2right').removeClass('arrow_carrot-2right');
        }
    } else {
        $('aside').addClass('visible');
        var closebtn = $('aside .close');
        var closeicon = $('aside .close .arrow_carrot-2left');
        if (closebtn) {
            closebtn.removeClass('hidden');
            closeicon.addClass('arrow_carrot-2right');
            closeicon.filter('.arrow_carrot-2left').removeClass('arrow_carrot-2left');
        }

    }
}


function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

$('[data-toggle="tooltip"]').tooltip();