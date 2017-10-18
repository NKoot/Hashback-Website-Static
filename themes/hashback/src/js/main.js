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

$('#js_collapsed_button').on('click', function (e) {
	e.preventDefault();
	$('.js_collapsed_menu').toggle();
});


$('body').on('click', function (e) {
	if (e.target.id !== 'js_collapsed_button'
		&& e.target.id !== 'js_submenu_link'
		&& e.target.id !== 'js_submenu_caret'
		&& e.target.nodeName !== 'NAV'
		&& e.target.nodeName !== 'LI'
		&& $('.js_collapsed_button').css('display') === 'block') {
		$('.js_collapsed_menu').hide();
	}
});

$('.text_page table').wrap('<div class="table_responsive"></div>');

$('.js_clickable_item').on('click', function (e) {
	e.preventDefault();
	window.location.href = $(this).attr('data-link');
});

$('#js_sub_menu').on('click', function (e) {
	$(this).children('.dropdown-menu').toggle();
});

$('#js_submenu_caret').on('click', function (e) {
	$(this).children('.dropdown-menu').toggle();
});

$('body').on('click', function (e) {
	if ($(e)[0].target.id !== 'js_sub_menu'
		&& $(e)[0].target.id !== 'js_submenu_caret'
		&& $(e)[0].target.id !== 'js_submenu_link') {
		$('#js_sub_menu').removeClass('open');
		$('.dropdown-menu').hide();
	}
});
