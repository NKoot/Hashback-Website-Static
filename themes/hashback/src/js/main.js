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

$('.js_collapsed_button').on('click', function (e) {
	e.preventDefault();
	$('.js_collapsed_menu').toggle();
});

$('.js_collapsed_menu a').on('click', function (e) {
	$('.js_collapsed_menu').hide();
});

$('body').on('click', function (e) {
	if (e.target.id !== 'js_collapsed_button'
		&& e.target.nodeName !== 'NAV'
		&& e.target.nodeName !== 'LI'
		&& $('.js_collapsed_button').css('display') === 'block') {
		$('.js_collapsed_menu').hide();
	}
});

$('.text_page table').wrap('<div class="table_responsive"></div>');
