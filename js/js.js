(function ($) {

    function behaviors() {

        $('[data-modal]')
            .once('modal')
            .on('updateBodyClass', function () {
                if ($.magnificPopup.instance.isOpen) {
                    $('body').addClass('is-modal-open');
                } else {
                    $('body').removeClass('is-modal-open');
                }
            })
            .on('modalOpen', function () {
                let $this = $(this);

                if ($.magnificPopup.instance.isOpen) {
                    $.magnificPopup.close();
                }

                $.magnificPopup.open({
                    items: {
                        src: this
                    },
                    type: 'inline',
                    mainClass: $(this).attr('data-modal'),
                    closeOnBgClick: false,
                    showCloseBtn: true,

                    callbacks: {
                        open: function () {
                            $this.trigger('updateBodyClass');
                        },
                        close: function () {
                            $this.trigger('updateBodyClass');

                            behaviors();
                        },
                        beforeOpen: function () {
                            lockBodyScroll();
                        },
                        beforeClose: function () {
                            unlockBodyScroll();
                        }
                    }
                });
            });


        $('[data-modal-link]')
            .once()
            .click(function (e) {
                let $this = $(this);
                let code = $this.attr('data-modal-link');
                let modal = $('[data-modal="' + code + '"]');
                let source = $this.attr('data-source') || '';

                modal.find('input[data-source]').val(source);

                if (modal.length === 0) {
                    return null;
                }

                modal.trigger('modalOpen');

                return false;
            });


        $('.ui.dropdown')
            .once('dropdown')
            .dropdown();


        $('.slider-block .owl-carousel')
            .once()
            .owlCarousel({
                items: 1,
                nav: false,
                dots: true
            });


        $('.reviews-list')
            .once(function () {
                if (!isMobile()) return;

                $(this)
                    .addClass('owl-carousel')
                    .owlCarousel({
                        nav: false,
                        dots: true,
                        margin: 16,
                        responsive: {
                            0: {
                                items: 1,
                            },
                            768: {
                                items: 3
                            }
                        }
                    })
            });


        $('.products-list')
            .not('.no-carousel')
            .once(function () {
                if (!isMobile()) return;

                $(this)
                    .addClass('owl-carousel')
                    .owlCarousel({
                        nav: false,
                        dots: true,
                        autoHeight: true,
                        responsive: {
                            0: {
                                items: 1,
                            },
                            768: {
                                items: 3
                            }
                        }
                    })
            });


        $('[data-mobile-menu-link]')
            .once()
            .click(function (e) {
                e.preventDefault();

                let body = $('body');

                body.toggleClass('mobile-menu-open');

                if (body.hasClass('mobile-menu-open')) {
                    lockBodyScroll();
                } else {
                    unlockBodyScroll();
                }
            });

    }


    $(document).click(function (e) {
        let selector = '';

        let $target = $(e.target);

        if (
            !$target.closest(selector).length &&
            $(selector).is(":visible")
        ) {
            $(selector).removeClass('open');
        }
    });


    $(document).ready(function () {
        behaviors();
    });


    $(document).ajaxComplete(function () {
        behaviors();
    });

})(jQuery);