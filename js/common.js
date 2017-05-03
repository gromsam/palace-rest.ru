$(document).ready(function() {

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	var owl = $("#carusel");
	owl.owlCarousel({
	    navigation : true, // Show next and prev buttons
	    slideSpeed : 300,
	    paginationSpeed : 400,
	    singleItem:true,
	    autoPlay : true,
		stopOnHover : true,
		scrollPerPage:	false,
		stopOnHover : true,
		mouseDrag: false,
		touchDrag: true
	});
	
	owl.on("mousewheel", ".owl-wrapper", function (e) {
		if (e.deltaY > 0) {
			owl.trigger("owl.prev");
		} else {
			owl.trigger("owl.next");
		}
		e.preventDefault();
	});
	
	$(".next_button").click(function(){
		owl.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl.trigger("owl.prev");
	});

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	/*
	$("form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});
	*/
	
	
	//отправка формы
	$("#form_orang").submit(function(e){
		e.preventDefault();
		
		var form = $(this);
		var log = function(msg){
			//console.log ? console.log(msg) : alert(msg);
			alert(msg);
		}
		
		$.ajax({
			url		: form.attr('action'),
			async	: true,
			type	: 'POST',
			data	: form.serialize(),
			success	: function(data,textStatus,xhr){
				alert(data);
			}
		});
	});
	
	//aфиксированное меню при прокрутке
	var menu = $(".menu");

	$(window).scroll(function(){
		if ( $(this).scrollTop() > 200  ){
			menu.removeClass().addClass('row menu_fixed');
			var namesite2 = $('.name-site').html();
			$('.namesite_v_menu').html(namesite2);
		} else  {
			menu.removeClass().addClass('row menu');
			$('.namesite_v_menu').html('');
		}
		if ( $(this).scrollTop() > 200 && $(this).width()<768 ){
			var namesite2 = $('.name-site').html();
			$('.namesite_v_menu').html(namesite2);
		} else  {
			$('.namesite_v_menu').html('');
		}
    });//scroll
	
	
	$(window).resize(function(){
		if($(this).width()>768){
			$('.menu .menutable ul,.menu_fixed .menutable ul').css({
				'display':'table-row'
			});
		}else{
			$('.menu .menutable ul,.menu_fixed .menutable ul').css({
				'display':'none'
			});
		}
	});
	
	$(window).width(function(){
		
		
		/*
		if($(this).width()<1200){
			//$('#ymaps1453294695549985032').css({'width':'350px'});
			$('#contact .col-xs-5').removeClass().addClass('col-xs-6');
			//$('#contact .col-xs-2').removeClass().addClass('col-xs-12');
		}else{
			$('#contact .col-xs-6').removeClass().addClass('col-xs-5');
			//$('#contact .col-xs-12').removeClass().addClass('col-xs-2');
		}
		
		if($(this).width()<992){
			//$('#ymaps1453294695549985032').css({'width':'350px'});
			$('#contact .col-xs-6').removeClass().addClass('col-xs-12');
			//$('#contact .col-xs-2').removeClass().addClass('col-xs-12');
		}else{
			$('#contact .col-xs-12').removeClass().addClass('col-xs-6');
			//$('#contact .col-xs-12').removeClass().addClass('col-xs-2');
		}
		
		*/
	});
	
	$('.owl-prev,.owl-next').text('');
	
	
	//вылет меню для мобильных устройств
	$('.maine_menu_bottom').click(function(){
		$('.menu_mobi').css({
			'left':'0'
		});
		
		$('.container').css({
			'left':'270px',
			'position': 'absolute'
		});
	});
	//вылет меню для мобильных устройств
	
	//клик по меню для мобильных и скратие меню для мобильных
	$('.menu_mobi ul li a').click(function(){
		$('.menu_mobi').css({
			'left':'-270px'
		});
		
		$('.container').css({
			'left':'0px',
			'position': 'relative'
		});
	});
	//клик по меню для мобильных и скратие меню для мобильных
	
	
	//открытие и закрытие контактов в футере
	$('.contact-footer').click(function(){
		$('.contact_blok_info').fadeIn();
	});
	$('.close_contact_blok_info').click(function(){
		$('.contact_blok_info').fadeOut();
	});
	//открытие и закрытие контактов в футере
	
	
	//Открытие и закрытие карты
	$('.btn_close_map').click(function(){
		
		//$(this).removeClass();
		//$(this).addClass('btn_win_map');
		$('.yamap').toggle('slow',
			function(){
				//$('.btn_close_map').text('Развернуть карту');
				//$('.btn_close_map').addClass('btn_win_map');
				if($('.btn_close_map').text() == 'Развернуть карту'){
					$('.btn_close_map').text('Свернуть карту');
				}else{
					$('.btn_close_map').text('Развернуть карту');	
				}
			}
		);
		
	});
	
	
	
	
});