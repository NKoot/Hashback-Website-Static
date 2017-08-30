// import styles from './../css/main.css';
import styles from '../css/main.css';
// import _ from 'lodash';
import signup from './signup';
var $ = require('jquery/src/jquery');

$('body').animate({
	scrollTop: $(window).scrollTop(0)
});

$(window).scroll(function(){
    $('.force3d').css('opacity', 1 - $(window).scrollTop() / 250);
    $('.fadein').css('opacity', 0 + $(window).scrollTop() / 250);
});

$('.anchor-link').on('click', function (e) {
	e.preventDefault();
	$('body').animate({
        scrollTop: $('.main_page_text').offset().top
    }, 'slow');
});