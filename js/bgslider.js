(function($) {
    $.fn.extend({
        bgslider: function(options) {
            var settings = $.extend({
                images: null,
                speed: 3000,
                loading: null,
                preloadall: false,
                onslidechange: null
            }, options);

            return this.each(function() {
                settings.images = eval(settings.images);
                var galleryContainer = $(this);
                var currentSlide = -1;
                var isLoaded = false;
                var isSlideShowRunning = true;
                var isLoadedAll = false;
                var interval;
                var mid;
                var left;
                var isPlaying = true;
                var imagesCache = [];
                var imgLoadCounter = 0;
                //pre load navigation images
                /*$('<image/>').attr('src', 'http://www.egrappler.com/contents/backgroundslider/Demo/nav.png');
                $('<image/>').attr('src', 'http://www.egrappler.com/contents/backgroundslider/Demo/nav-active.png');
                $('<image/>').attr('src', 'http://www.egrappler.com/contents/backgroundslider/Demo/play.png');
                $('<image/>').attr('src', 'http://www.egrappler.com/contents/backgroundslider/Demo/pause.png');*/
                for (var i = 0; i < settings.images.length; i++) {
                    imagesCache[i] = $('<img/>').attr('src', settings.images[i].image).load(function() {
                        if (settings.preloadall) {
                            ++imgLoadCounter
                            if (imgLoadCounter == settings.images.length) isLoaded = true;
                        }
                        else
                            isLoaded = true;
                    });
                }
                //end pre loading images
                start();
                function getValue(val) {
                    return parseInt(val.replace('px', ''));
                }
                function loadImages() {
                    var navwrapper = $('<div/>').addClass('nav-wrapper');
                    var nav = $('<ul/>');
                    navwrapper.append(nav);
                    nav.attr('class', 'nav');
                    galleryContainer.prepend(navwrapper);
                    mid = getValue(galleryContainer.css('height')) / 2;
                    left = getValue(galleryContainer.css('width')) / 2 - 24;
                    //galleryContainer.prepend($('<div/>').attr('id', 'playpause').css('display', 'none').css('z-index', '-9997').css('top', mid - 24 + 'px').css('left', left + 'px').click(function() {
                    navwrapper.prepend($('<div/>').attr('id', 'playpause').css('display', 'none').css('z-index', '-9997').css('left', left + 'px').click(function() {
                        if (isPlaying) {
                            $(this).removeClass('pause').addClass('play');
                            clearInterval(interval);
                        }
                        else {
                            $(this).removeClass('play').addClass('pause');
                            interval = setInterval(navigateSlide, settings.speed);
                        }

                        isPlaying = !isPlaying;
                    }));
                    galleryContainer.find('#playpause').removeClass('play').addClass('pause');
                    for (var i = 0; i < settings.images.length; i++) {
                        nav.append($('<li/>').append($('<a/>').html((i + 1)).attr('href', '#' + (i + 1)).attr('title', settings.images[i].title)));
                    }
                    nav.find('li a').click(function() {
                        var index = parseInt($(this).attr('href').replace('#', ''));
                        if (isPlaying) {
                            $('#playpause').removeClass('pause').addClass('play');
                            clearInterval(interval);
                            isPlaying = false;
                        }
                        currentSlide = index - 1;
                        showImage(currentSlide);
                    });
                    navwrapper.css('display', 'none');
                    navwrapper.css('z-index', '-9998');
                }
                function showImage(index) {
                    if (isLoaded) {
                        $('ul.nav li a').removeClass('active');
                        $('ul.nav li a:eq(' + index + ')').addClass('active');
                        var src = settings.images[index].title;
                        var backgroundDiv = $('<div/>');
                        backgroundDiv.css('position', galleryContainer.css('position'));
                        backgroundDiv.attr('class', 'bg-slider');
                        backgroundDiv.css('z-index', '-9999');
                        backgroundDiv.css('width', '100%');
                        backgroundDiv.css('height', '100%');
                        /* backgroundDiv.css('background-size', '100%'); //will not work in IE*/
                        backgroundDiv.css('background-image', 'url(' + imagesCache[index].attr('src') + ')');
                        backgroundDiv.css('background-repeat', 'no-repeat');
                        backgroundDiv.css('background-position', 'center');
                        backgroundDiv.css('left', '0px');
                        backgroundDiv.css('position', 'absolute');
                        backgroundDiv.css('opacity', '0');
                        galleryContainer.prepend(backgroundDiv);

                        backgroundDiv.css('z-index', '-1000');
                        if (settings.onslidechange != null) settings.onslidechange(imagesCache[index].attr('src'), index);
                        galleryContainer.find('.bg-slider:eq(0)').animate({ 'opacity': 1.0 }, 3000,
                                                                                function() {
                                                                                    backgroundDiv.css('z-index', '-9999');
                                                                                    galleryContainer.find('.bg-slider:eq(1)').remove();
                                                                                    isLoadedAll = true;
                                                                                });
                    }
                }
                function navigateSlide() {
                    if (isLoaded) {
                        currentSlide++;
                        if (currentSlide == settings.images.length) currentSlide = 0;
                        showImage(currentSlide);
                    }
                }

                function start() {
                    mid = getValue(galleryContainer.css('height')) / 2;
                    left = getValue(galleryContainer.css('width')) / 2 - 24;
                    var backgroundDiv = $('<div/>');
                    backgroundDiv.css('z-index', '1000');
                    backgroundDiv.attr('class', 'bg-slider');
                    backgroundDiv.css('left', left + 'px');
                    backgroundDiv.css('top', mid + 'px');
                    backgroundDiv.css('position', 'absolute');
                    backgroundDiv.html('<img src="' + settings.loading + '" alt="loading"/>');
                    galleryContainer.prepend(backgroundDiv);
                    loadImages();
                    interval = setInterval(navigateSlide, settings.speed);
                }
                function getParentElement(el) {
                    temp = el;
                    while ((temp != null) && (temp.tagName != "BODY")) {
                        if ($(temp).attr('id') == 'gallery') {
                            el = temp;
                            return el;
                        }
                        temp = temp.parentElement;
                    }
                    return el;
                }
                $(document).mousemove(function(e) {
                    var element = getParentElement(e.target);
                    if (element != null && isLoadedAll) {
                        var left = galleryContainer.get(0).offsetLeft;
                        var width = galleryContainer.get(0).offsetWidth;
                        var top = galleryContainer.offset().top;
                        if (e.clientX > left && e.clientX < (left + width) && e.clientY > 0 && e.clientY < top + 100) {
                            $('.nav-wrapper').css('z-index', '10000');
                            $('#playpause').css('z-index', '10000');
                            $('.nav-wrapper').fadeIn("2000");
                            $('.nav-wrapper').css('filter', 'alpha(opacity=30)');
                            $('.nav-wrapper').css('opacity', '0.3');
                            $('#playpause').fadeIn("2000");
                        }
                        else {
                            $('.nav-wrapper').css('z-index', '-9998');
                            $('#playpause').css('z-index', '-9997');
                            $('.nav-wrapper').fadeOut("2000");
                            $('.nav-wrapper').css('filter', 'alpha(opacity=30)');
                            $('.nav-wrapper').css('opacity', '0.3');
                            $('#playpause').fadeOut("2000");
                        }

                    }
                });
            });

        }
    });
})(jQuery);
