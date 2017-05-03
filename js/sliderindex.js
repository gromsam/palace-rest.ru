$(document).ready(function() {
	//var first_slider_children_img = $('.slider_index_img img:first-child').attr('src');
	//var next_slider_index_img = $('.slider_index_img img').next().attr('src');
	/*
	$('.slider_index_bg').css({
		'background':'#600b01 url("'+first_slider_children_img+'") no-repeat scroll center center',
	});
	
	if(isset(next_slider_index_img)){
		$('.slider_index_bg').css({
			'background':'#600b01 url("'+next_slider_index_img+'") no-repeat scroll center center',
		});
	}
	
	$('#gallery').bgslider({
            images: "[{ image: '../images/sliderindex/1.png', title: 'k2 covered in clouds' }, { image: '../images/sliderindex/2.jpg', title: 'k2 standing tall' }, { image: '../images/sliderindex/1.jpg', title: 'river kunhar flowing' }," +
             "{ image: 'images/mitre-peak-baltoro.jpg', title: 'baltoro glacier' }, { image: 'images/musa-ka-musalla.jpg', title: 'musa ka musalla' }, { image: 'images/nanga-parbat.jpg', title: 'nanga parbat' }," +
              "{ image: '../images/sliderindex/2.jpg', title: 'naran valley' }, { image: 'images/shugran.jpg', title: 'beauty of shugran' }]",
            speed: 5000,
            loading: 'loading.gif',
            preloadall: true
        });
	
	*/
	
	
	
	
	
	
	
	
	
	
	
	
		function slideSwitch() {
	    	var $active = $('#gallery > .slider_index_img > IMG.active');
		 
		    if ( $active.length == 0 ) $active = $('#gallery > .slider_index_img > IMG:last');
		 
		    // use this to pull the images in the order they appear in the markup
		    var $next =  $active.next().length ? $active.next()
		        : $('#gallery > .slider_index_img > IMG:first');
		 
		    // uncomment the 3 lines below to pull the images in random order
		 
		    // var $sibs  = $active.siblings();
		    // var rndNum = Math.floor(Math.random() * $sibs.length );
		    // var $next  = $( $sibs[ rndNum ] );
		 
		    $active.addClass('last-active');
		 
		    $next.css({opacity: 0.0})
		        .addClass('active')
		        .animate({opacity: 1.0}, 1000, function() {
		            $active.removeClass('active last-active');
		        });
		}
		 
		$(function() {
		    setInterval( "slideSwitch()", 5000 );
		});
		
	
	
	
	
	
	
	
});