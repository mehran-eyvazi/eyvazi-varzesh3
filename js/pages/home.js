$(function () {
    if (!FlashDetect.installed) {
        $('.ad[data-extension="swf"]').remove();
    }

    var md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {
        $('body').addClass('telegram');
    }

    $('.widget-extra-info-holder').each(function () {
        var $extraInfoHolder = $(this),
            extraInfo = $extraInfoHolder.text(),
            $widget = $extraInfoHolder.closest('.widget');

        try {
            extraInfo = JSON.parse(extraInfo);

            Object.keys(extraInfo).forEach(function (key) {
                $widget.attr(key, extraInfo[key]);

                // if widget needs to be initialized with scrollbar and not have been done yet, do it
                if ($widget.data('scroll') && !$widget.is('.scrollbar-initialized')) {
                    window.page.scrollbar.InitOnWidget($widget);
                }
            });
        }
        catch (e) {}
    });
});
