
jQuery(document).ready(function($)
{

    $('a[rel="external"]').attr('target', '_blank');

    if ($('.object').length) {
        $('.object a').wbBoxText();
    }

    $('li.menu a').click(function(event)
    {
        event.preventDefault();
        var thisHref = $(this);
        thisHref = thisHref[0].hash.substr(1);
        $('div.object:not(.' + thisHref + ')').animate({width: 'hide', opacity: 0, marginRight: '0'}, 1000);
        $('div.object.' + thisHref).animate({width: 'show', opacity: 1, marginRight: '30px'}, 1000);
    });

        $('#slider').wbRotate({shortName:'headers'});

});
