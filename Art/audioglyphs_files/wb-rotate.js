/**
 * @category    Workbox jQuery
 * @package     wbRotate
 * @copyright   Copyright (c) 2009-2010 Workbox AB (http://www.workbox.se)
 * @license     http://www.opensource.org/licenses/bsd-license.php
 * @version     1.0.1
 * @date        2010-04-17 19:23:57
 */

(function($)
{

    $.fn.extend({

        wbRotate:function(options)
        {

            var defaults = {
                rotateInterval:10000,
                rotateIntervalClick:5000,
                shortName:'img'
            };
            var o = $.extend(defaults, options);
            var obj = $(this);
            var intervalHolder = 0;
            var objWidth = obj.width();
            var objMoving = false;

            return this.each(function()
            {
                if ($('ul li', obj).length > 1) {
                    $('ul li:first', obj).addClass('show');
                    $('ul li:not(.show)', obj).hide();
                    //$('ul li', obj).css({left:objWidth + 'px'});
                    //$('ul li:first', obj).css({left:'0'}).addClass('show');
                    $('.modRotatorControlsPrev', obj).bind('click', goToPrev);
                    $('.modRotatorControlsNext', obj).bind('click', goToNext);
                    var unique = 1;
                    $('ul li', obj).each(function()
                    {
                        $(this).attr('rel', o.shortName + unique);
                        $('#' + o.shortName + 'Navigation').append('<a href="#" rel="' + o.shortName + unique
                                                                 + '" class="' + o.shortName + 'Button wbButton wbButtonInactive">'
                                                                 + unique + '</a>');
                        unique++;
                    });
                    $('a:first', '#' + o.shortName + 'Navigation').removeClass('wbButtonInactive').addClass('wbButtonActive');
                    $('a.' + o.shortName + 'Button').bind('click', goToImg);
                    intervalHolder = setInterval(goToNext, o.rotateInterval);
                }
            });

            function goToPrev()
            {
                if (!objMoving) {
                    clearInterval(intervalHolder);
                    objMoving = true;
                    var current = ($('ul li.show', obj)
                                   ? $('ul li.show', obj)
                                   : $('ul li:first', obj)),
                        prev = ((current.prev().length)
                                ? ((current.prev().hasClass('show'))
                                   ? $('ul li:last', obj)
                                   : current.prev())
                                : $('ul li:last', obj));
                    var relCurrent = current.attr('rel');
                    var relPrev = prev.attr('rel');
                    $('a.' + o.shortName + 'Button[rel="' + relCurrent + '"]').removeClass('wbButtonActive').addClass('wbButtonInactive');
                    $('a.' + o.shortName + 'Button[rel="' + relPrev + '"]').removeClass('wbButtonInactive').addClass('wbButtonActive');
                    prev.addClass('show')
                        .stop()
                        .fadeIn();
                    current.stop()
                           .fadeOut(function()
                           {
                               $(this).removeClass('show');
                               objMoving = false;
                           });
                    /*prev.css({left:'-' + objWidth + 'px'})
                        .addClass('show')
                        .stop()
                        .animate({left:'0'}, 300);
                    current.stop()
                           .animate({left:objWidth + 'px'}, 300, function()
                           {
                               $(this).removeClass('show');
                               objMoving = false;
                           });*/
                    intervalHolder = setInterval(goToNext, o.rotateInterval);
                }
            }

            function goToNext()
            {
                if (!objMoving) {
                    clearInterval(intervalHolder);
                    objMoving = true;
                    var current = ($('ul li.show', obj)
                                   ? $('ul li.show', obj)
                                   : $('ul li:first', obj)),
                        next = ((current.next().length)
                                ? ((current.next().hasClass('show'))
                                   ? $('ul li:first', obj)
                                   : current.next())
                                : $('ul li:first', obj));
                    var relCurrent = current.attr('rel');
                    var relNext = next.attr('rel');
                    $('a.' + o.shortName + 'Button[rel="' + relCurrent + '"]').removeClass('wbButtonActive').addClass('wbButtonInactive');
                    $('a.' + o.shortName + 'Button[rel="' + relNext + '"]').removeClass('wbButtonInactive').addClass('wbButtonActive');
                    next.addClass('show')
                        .stop()
                        .fadeIn();
                    current.stop()
                           .fadeOut(function()
                           {
                               $(this).removeClass('show');
                               objMoving = false;
                           });
                    /*next.addClass('show')
                        .stop()
                        .animate({left:'0'}, 300);
                    current.stop()
                           .animate({left:'-' + objWidth + 'px'}, 300, function()
                           {
                               $(this).css({left:objWidth + 'px'}).removeClass('show');
                               objMoving = false;
                           });*/
                    intervalHolder = setInterval(goToNext, o.rotateInterval);
                }
            };

            function goToImg(event)
            {
                event.preventDefault();
                if (!objMoving && !$(this).hasClass('wbButtonActive')) {
                    objMoving = true;
                    clearInterval(intervalHolder);
                    var relClicked = $(this).attr('rel');
                    var current = ($('ul li.show', obj) ? $('ul li.show', obj) : $('ul li:first', obj)),
                        clicked = $('ul li[rel="' + relClicked + '"]', obj);
                    var relCurrent = current.attr('rel');
                    $('a.' + o.shortName + 'Button[rel="' + relCurrent + '"]').removeClass('wbButtonActive').addClass('wbButtonInactive');
                    $('a.' + o.shortName + 'Button[rel="' + relClicked + '"]').removeClass('wbButtonInactive').addClass('wbButtonActive');
                    var goToNext = true;
                    if ($('ul li', obj).index(current) > $('ul li', obj).index(clicked)) {
                        goToNext = false;
                        //clicked.css({left:'-' + objWidth + 'px'})
                    }
                    clicked.addClass('show')
                           .stop()
                           .fadeIn();
                    current.stop()
                           .fadeOut(function()
                           {
                               $(this).removeClass('show');
                               objMoving = false;
                           });
                    /*clicked.addClass('show')
                           .stop()
                           .animate({left:'0'}, 300);
                    current.stop()
                           .animate({left:(goToNext ? '-' : '') + objWidth + 'px'}, 300, function()
                           {
                               $(this).css({left:objWidth + 'px'}).removeClass('show');
                               objMoving = false;
                           });*/
                    intervalHolder = setInterval(resetInterval, o.rotateIntervalClick);
                }
            };

            function resetInterval()
            {
                clearInterval(intervalHolder);
                intervalHolder = setInterval(goToNext, o.rotateInterval);
                goToNext();
            };

        }

    });

})(jQuery);
