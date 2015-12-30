//-----THINGS TO DO-----
//--Collect initial break.top and wWidth var values on page load
//--Place break height adjustment inside of window.width function
//--Update wWidth var when window.width function runs
//--Break img paralax needs to be it's own function, called by window.scroll and window.width





//Page load inits
$(function() {
    //Global Vars
    var wScrollT = $(this).scrollTop();
    var wScrollB = $(this).scrollTop() + $(window).height();
    var aboutT = $('.about-brk').offset().top;
    var portT = $('.portfolio-brk').offset().top;
    var resT = $('.resume-brk').offset().top;
    var wWidth = $(window).width()
    console.log('Page is Loaded');
    console.log('Top of Window: ' +wScrollT);
    console.log('Width of Window: ' +wWidth);
    
    //Loading Functions
    smoothScroll(1000);
    aboutSwitch();
    portCarousel();
    portSwitch();
    pieceLoad();
})


//Functions based on scroll position of window
$(window).scroll(function(){
    //Collect the top and bottom edge of browser window
    wScrollT = $(this).scrollTop();
    wScrollB = $(this).scrollTop() + $(window).height();
    aboutT = $('.about-brk').offset().top;
    portT = $('.portfolio-brk').offset().top;
    resT = $('.resume-brk').offset().top;
    //console.log('Top of Window: ' +wScrollT);
    
    //Controlling Header's morph from full to compact and back
    if(wScrollT > ($('.landing').height() - 435)){
        $('header').addClass('compact');
    } else {
        $('header').removeClass('compact');
    }
    
    //Contorlling parallax effects of break images
    if(wScrollB > (aboutT-10)){
        $('.about-brk').css({'background-position':'center ' + -(((wScrollT - aboutT)/8)+($(window).width()/17)) + 'px'})
    }
    if(wScrollB > (portT-10)){
        $('.portfolio-brk').css({'background-position':'center ' + -(((wScrollT - portT)/8)+($(window).width()/17)) + 'px'})
    }
    if(wScrollB > (resT-10)){
        $('.resume-brk').css({'background-position':'center ' + -(((wScrollT - resT)/8)+($(window).width()/17)) + 'px'})
    }
})


//Controlling the scrolling of the page when clicking on a nav item 
function smoothScroll(dur) {
    $('a[href^="#"]').on('click', function(event){
        var target = $($(this).attr('href'));
        //console.log('You just clicked: ' + target);
        if(target.length){
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, dur);
        }
    });
}

//Controlling the styles and content of the About section
function aboutSwitch() {
    //console.log('Transition is ready');
    $('.personal').click(function(){
        console.log('Myself was clicked');
        $('.about .content').css('left', '0%');
        $('.others').hide(500);
        $('.testimonial').removeClass('active');
        $('.personal').addClass('active');
    });
    $('.testimonial').click(function(){
        console.log('Testimonial was clicked');
        $('.about .content').css('left', '-100%');
        $('.others').show();
        $('.personal').removeClass('active');
        $('.testimonial').addClass('active');
    });
}


//Portfolio Carousel
function portCarousel() {
    $('.carouselInner ul li:first').before($('.carouselInner ul li:last'));
    var thumbWidth = $('.carouselInner ul li').outerWidth(true);
    var direction
    
    $('.scrollR').click(function(){
        direction = 'right';
        $('.carouselInner ul').css('left', -(thumbWidth *2) + 'px');
        setTimeout(leftReset,310);
    });
    $('.scrollL').click(function(){
        direction = 'left';
        $('.carouselInner ul').css('left', '0px');
        setTimeout(leftReset,310);
    });
    
    function leftReset(){
        $('.carouselInner ul').css('transition', 'none');
        if (direction === 'right'){
            $('.carouselInner ul li:last').after($('.carouselInner ul li:first'));
        }else{
            $('.carouselInner ul li:first').before($('.carouselInner ul li:last'));
        }
        $('.carouselInner ul').css('left', '-' + thumbWidth + 'px');
        setTimeout(function(){$('.carouselInner ul').css('transition', 'all .5s');},100);
    }
}

//Controlling the styles and content of the Portfolio section
function portSwitch() {
    //console.log('Transition is ready');
    $('.return').click(function(){
        console.log('Returning to Portfolio');
        $('.portfolio .content').css('left', '0%');
        $('.piece').hide(500);
    });
    $('.thumb').click(function(){
        $('.portfolio .content').css('left', '-100%');
        $('.piece').show();
    });
}

//Uses Ajax to populate the Piece section of the Portfolio
function pieceLoad(){
    $.ajaxSetup({ cache: true});
    $('.thumb').click(function(){
        var $this = $(this),
            newPiece = $this.data('piece'),
            spinner = '<div class="loader">Loading...</div>',
            newHTML = newPiece + '.html';
        $('.pieceLoad').html(spinner).load(newHTML);
        console.log('Viewing: '+newHTML);
    });
}

