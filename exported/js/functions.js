$(function() {
    console.log('Page is Loaded');
    smoothScroll(1000);
    aboutSwitch();
})

$(window).scroll(function(){
    //Collect the top and bottom edge of browser window
    var wScrollT = $(this).scrollTop();
    var wScrollB = $(this).scrollTop() + $(window).height();
    console.log('Top of Window: ' +wScrollT);
    //Transform header to compact version once off of landing page
    if(wScrollT > ($('.landing').height() - 435)){
        $('header').addClass('compact');
    } else {
        $('header').removeClass('compact');
    }
    
    
})

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
