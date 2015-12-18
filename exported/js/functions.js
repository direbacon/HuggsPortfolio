//Readying functions for user imputs
$(function() {
    console.log('Page is Loaded');
    smoothScroll(1000);
    aboutSwitch();
})


//Functions based on scroll position of window
$(window).scroll(function(){
    //Collect the top and bottom edge of browser window
    var wScrollT = $(this).scrollTop();
    var wScrollB = $(this).scrollTop() + $(window).height();
    var aboutT = $('.about-brk').offset().top;
    var portT = $('.portfolio-brk').offset().top;
    var resT = $('.resume-brk').offset().top;
    //console.log('Top of Window: ' +wScrollT);
    
    //Controlling Header's morph from full to compact and back
    if(wScrollT > ($('.landing').height() - 435)){
        $('header').addClass('compact');
    } else {
        $('header').removeClass('compact');
    }
    
    //Contorlling parallax effects of break images
    if(wScrollB > (aboutT-10)){
        $('.about-brk').css({'background-position':'center ' + -(((wScrollT - aboutT)/8)+($(window).width()/10)) + 'px'})
    }
    if(wScrollB > (portT-10)){
        $('.portfolio-brk').css({'background-position':'center ' + -(((wScrollT - portT)/8)+($(window).width()/10)) + 'px'})
    }
    if(wScrollB > (resT-10)){
        $('.resume-brk').css({'background-position':'center ' + -(((wScrollT - resT)/8)+($(window).width()/10)) + 'px'})
    }
})


//Controlling the scrolling of the page when clicking on a nav item 
function smoothScroll(dur) {
    $('a[href^="#"]').on('click', function(event){
        var target = $($(this).attr('href'));
        console.log('You just clicked: ' + target);
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
    console.log('Transition is ready');
    $('.personal').click(function(){
        console.log('Myself was clicked');
        $('.content').css('left', '0%');
        $('.others').hide(500);
        $('.testimonial').removeClass('active');
        $('.personal').addClass('active');
    });
    $('.testimonial').click(function(){
        console.log('Testimonial was clicked');
        $('.content').css('left', '-100%');
        $('.others').show();
        $('.personal').removeClass('active');
        $('.testimonial').addClass('active');
    });
}
