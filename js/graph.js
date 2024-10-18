$(document).ready(function() {
	$('.project-profitability').addClass('active');
});


//replay button, just removing and reattaching the active class 
$('.js-replay').click(function() {
	$('.project-profitability').removeClass('active');
	setTimeout(function() {
		$(".project-profitability").addClass("active");
	}, 500);
});