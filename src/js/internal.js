(function($) {

    var elements = {
        siteHeader:         $('.site-header'),
        mainMenu:           $('.main-menu'),
        overlay:            $('.overlay'),
        searchBlock:        $('.search-block'),
        searchResult:       $('.search-result'),
        goTop:              $('.go-to-top'),
        sliderClans:        $('.slider-clans'),
        jspContainer:       $('.jspContainer'),
        containerProfile:   $('.container.profile')
    };
    var options = {
        documentWidth:      $('body').width(),
        scrollTop:          $(document).scrollTop(),
        clanItemWidth:      $('.clan-item').width(),
        mlContainer:        parseInt($('.container.profile').css('margin-left')) + 95,
        summaryWidthClans:  0,
        jspContainerHeight: elements.jspContainer.height(),
        contProfileML:      parseInt($('.container.profile').css('margin-left')),
        contProfileMR:      parseInt($('.container.profile').css('margin-right')) + parseInt($('.container.profile').css('padding-right')),
        scrollbarWidth:     scrollbarWidth()
    };

    @@include('./partials/_dropdown.js')
    @@include('./partials/_tab.js')
    @@include('./partials/_modal.js')

    $(window).resize(function () {
        options.documentWidth = $('body').width();
        options.clanItemWidth = $('.clan-item').width();
        options.contProfileML = parseInt($('.container.profile').css('margin-left'));
        options.contProfileMR = parseInt($('.container.profile').css('margin-right')) + parseInt($('.container.profile').css('padding-right'));
        options.mlContainer = ( options.documentWidth > 1199 ? options.contProfileML + 95 : $('.container.profile').css('margin-left') );

        if($('div').is(elements.sliderClans)) {
            elements.sliderClans.find('.slick-track').css({
                width: getMaxWidthTrack()
            });
            elements.sliderClans.find('.slick-list').jScrollPane();
            options.jspContainerHeight = elements.sliderClans.find('.slick-list').data('jsp').getContentHeight() + 40;
            elements.sliderClans.find('.jspContainer').height(options.jspContainerHeight);
            elements.sliderClans.find('.slick-list').css('padding-left', options.mlContainer);
            elements.sliderClans.slick('setPosition');
        }
    });
    $(window).scroll(function () {
        options.scrollTop = $(document).scrollTop();

        if(options.scrollTop >= 200) {
            elements.goTop.addClass('show');
        } else {
            elements.goTop.removeClass('show');
        }
    });
    $('.scroll-smooth').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('html, body');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

    $('[data-toggle-class]').on('click', function (e) {
        e.preventDefault();
        var getClass = $(this).data('toggle-class');

       $(this).toggleClass(getClass);
    });
    $('[data-toggle-element]').on('click', function (e) {
        e.preventDefault();
        var getEl = $(this).data('toggle-element');

       $(getEl).slideToggle();
    });
    $('.icon-menu').on('click', function () {
        elements.siteHeader.removeClass('active-search');

        elements.siteHeader.toggleClass('active-menu');
        elements.overlay.addClass('active');
        if(!elements.siteHeader.hasClass('active-menu')) {
            elements.overlay.removeClass('active');
        } else {
            elements.overlay.addClass('active');
        }
    });
    $('.search-btn').on('click', function () {
        elements.siteHeader.removeClass('active-menu');

        elements.siteHeader.toggleClass('active-search');
        if(!elements.siteHeader.hasClass('active-search')) {
            elements.overlay.removeClass('active');
        } else {
            elements.overlay.addClass('active');
        }
    });
    $('.search-input').keydown(function () {
        if(options.documentWidth <= 991 ) {
            elements.searchResult.slideDown();
        }
    });

    elements.overlay.on('click', function () {
        elements.siteHeader.removeClass('active-search');
        elements.siteHeader.removeClass('active-menu');

        $(this).removeClass('active');
        elements.searchBlock.removeClass('active');
        elements.mainMenu.removeClass('active');
    });

    $('.report-user').on('click', function () {
        if(!$(this).parent().hasClass('active')) {
            $(this).slideUp();
            $(this).parent().find('.report-user-accept').slideDown();
        }
    });
    $('.report-user-cancel').on('click', function () {
        if(!$(this).parent().hasClass('active')) {
            $(this).parent().find('.report-user').slideDown();
            $(this).parent().find('.report-user-accept').slideUp();
        }
    });
    $('.report-user-accept').on('click', function () {
       $(this).text('Report sent').css('color', '#29b21a');
       $(this).parent().addClass('active');
    });

    $('.join').on('click', function () {
        if($(this).hasClass('not')) {
            $(this).find('.text').text('Joined').parent().removeClass('not');
        } else {
            $(this).find('.text').text('Join').parent().addClass('not');
        }
    });
    $('.follow')
        .on('click', function () {
            if($(this).hasClass('not')) {
                $(this).find('.text').text('Following').parent().removeClass('not');
            } else {
                $(this).find('.text').text('Follow').parent().addClass('not');
            }
        })
        .mouseover(function () {
            if(!$(this).hasClass('not')) {
                $(this).find('.text').text('Unfollow');
            }
        })
        .mouseout(function () {
            if(!$(this).hasClass('not')) {
                $(this).find('.text').text('Following')
            }
        });

    if($('div').is(elements.sliderClans)) {
        elements.sliderClans.slick({
            dots: false,
            arrows: false,
            infinite: false,
            variableWidth: true,
            slidesToShow: 4,
            swipeToSlide: true,
            swipe: false,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        elements.sliderClans.find('.clan-item').each(function () {
            options.summaryWidthClans += $(this).width() + 20;
        });

        elements.sliderClans.find('.slick-track').css({
            width: getMaxWidthTrack()
        });
        elements.sliderClans.find('.slick-list').jScrollPane();
        options.jspContainerHeight = elements.sliderClans.find('.slick-list').data('jsp').getContentHeight() + 40;
        elements.sliderClans.find('.jspContainer').height(options.jspContainerHeight);
        elements.sliderClans.find('.slick-list').css({
            paddingLeft: ( options.documentWidth > 1199 ? options.contProfileML + 95 : options.contProfileML )
        });
    }

    $('input, textarea')
        .each(function(){
            if ($(this).val().length > 0) {
                $(this).addClass('active').closest('.form-group').addClass('active');
            }
        })
        .blur(function() {
            if (!$(this).val()) {
                $(this).closest('.form-group').removeClass('active');
            }
        })
        .focus(function() {
            $(this).closest('.form-group').addClass('active')
        })
        .change(function(){
            var el = $(this);
            if (el.val()) {
                el.addClass('active');
                el.closest('.form-group').addClass('active');
            } else {
                el.removeClass('active');
                el.closest('.form-group').removeClass('active');
            }
        });

    $('[data-autoresize]').each(function () {
        var offset = this.offsetHeight - this.clientHeight;

        var resizeTextarea = function(el) {
            $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
        };
        $(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
    });

    $('.form-group.image input').change(function(){
        readURL(this);
    });

    $('.form-control')
        .each(function () {
            if($(this).attr('maxlength')) {
                var length = $(this).attr('maxlength');

                $(this).closest('.form-group').append('<span class="chars">' + length + '</span>');
            }
        })
        .keyup(function () {
            if($(this).attr('maxlength')) {
                var maxLength = $(this).attr('maxlength'),
                    currentChars = $(this).val().length;

                $(this).closest('.form-group').find('.chars').text(maxLength - currentChars);
            }
        });

    $('.current-clan').on('click', function () {
       $(this).closest('.choice-clan').toggleClass('active');
    });
    $('.clan-list li ').on('click', function () {
        $('.clan-list li ').removeClass('active');
        $(this).addClass('active').closest('.choice-clan').removeClass('active');
    });
    $(document).mouseup(function (e){
        var el = $('.clan-list');
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            el.closest('.choice-clan').removeClass('active');
        }
    });

    $('.select2').each(function () {
        var select2Block = $(this).closest('.select2-block');

        $(this).select2({
            dropdownParent: select2Block
        });
    });

    function getMaxWidthTrack() {
        if(options.documentWidth > 1199) {
            return options.summaryWidthClans + (options.mlContainer + options.contProfileMR + 5);
        } else if(options.documentWidth > 767) {
            return options.summaryWidthClans + (options.contProfileMR * 2);
        } else {
            return options.summaryWidthClans;
        }
    }

    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.form-group.image img').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    function scrollbarWidth() {
        var documentWidth = parseInt(document.documentElement.clientWidth);
        var windowsWidth = parseInt(window.innerWidth);
        var scrollbarWidth = windowsWidth - documentWidth;
        return scrollbarWidth;
    }

})(jQuery);