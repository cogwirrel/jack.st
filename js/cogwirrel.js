$(document).ready(function() {
	$('.icon-with-tooltip').tooltip();

	$('.orange-bar').delay(100).animate({ width: ($('.business-card').outerWidth() + "px") }, 1500);
})