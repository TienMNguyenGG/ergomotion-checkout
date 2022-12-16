export default class ADA {
  constructor () {
    this.$html = $('html')
  }
  init () {
    this.skipToCotent()
    this.hiddenFocus()
    this.removetabindexdots()
    this.setuptabindex()
    this.initADA()
    this.dtTagKeyboard()
    this.keyupFuntion()
    if($(window).outerWidth() >= 1200) {
      this.dectectFocus()
    }
  }
  skipToCotent () {
    $('.skip-link').on('click', () => {
      setTimeout(() => {
        $('#MainContent a:not(.btn-hidden):visible, #MainContent button:not(.btn-hidden):visible, #MainContent .stamped-badge').eq(0).focus()
      }, 100)
    })
  }
  clsMouse (e) {
    if($(e.target).hasClass('btn-subscribe')) {
      $(e.target).addClass('mouse').parent().addClass('mouse').parents('button, a, .is-active').addClass('mouse')
    }
    if(window.keyUp !== true) {
      $(e.target).addClass('mouse').parent().addClass('mouse').parents('button, a, .is-active').addClass('mouse')
      $(e.target).parents('a,.cont-bound,.list-slide').addClass('mouse')
      $('.status-focus').removeClass('status-focus')
      $('.focus-status').removeClass('focus-status')
    }
  }
  hiddenFocus () {
    $(document).on('click mousedown', (e) => {
      $('a,a *,button, button *,input,.checkmark-radio, .custom-tab,div,li, p,*').removeClass('mouse')
      this.clsMouse(e)
    })
  }
  dectectFocus () {
    $('.main-menu-ul > li > a, .wrap-icon-dt > a, .wrap-logo > a, .util-nav-ul > li > a').on('focusin', () => {
      $('.hovering').removeClass('hovering')
      $('.menu-item:not(.mouse)').removeClass('is-open-child')
      $('.menu-item').find('.dropdown-menu').css('display', '')
    })
    $(window).keydown((event) => {
      const $focus = $('a:focus')
      if (event.keyCode === 40 && $focus.parent().hasClass('has-sub')) {
        event.preventDefault()
        $focus.parent().addClass('hovering')
      }
      if (event.keyCode === 9) {
        $('body').addClass('no-ani')
      }
    })
    $('a,button,input,div').on('focusin', (e) => {
      if (!$(e.target).parents('.slick-initialized').length && !$(e.target).parents('.social').length) {
        $('.focus-status').removeClass('focus-status')
      }
      if (!$(e.target).parents('.dropdown-select-c8').length) {
        $('.dropdown-select-c8').each((_i, ele) => {
          $(ele).removeClass('show focus').find('.dropdown-menu').removeClass('show')
        })
      }
    })
  }
  keyupFuntion() {
    $(window).keyup((event) => {
      if($(event.target).hasClass('last-fake-popup')) {
        if ($('.popup-wrap')) {
          $('.popup-wrap').focus()
        }
        if ($('.active-popup-stories .main-popup')) {
          $('.active-popup-stories .btn-not-border').focus()
        }
      }
      if($(event.target).hasClass('first-fake-popup')) {
        if ($('.popup-is-close')) {
          $('.popup-is-close').focus()
        }
        if ($('.active-popup-stories .close-popup')) {
          $('.active-popup-stories .close-popup').focus()
        }
      }
    })
  }
  removetabindexdots () {
    setTimeout(() => {
      $('.tns-nav button').attr('tabindex', '0')
    }, 500)
  }
  setuptabindex () {
    const $header = $('.header')
    $header.attr('tabindex', '0').focus().removeAttr('tabindex')
  }
  initADA () {
    $('.popup-is-open').removeAttr('tabindex')
    $('.tiny-prev,.tiny-next, .popup-is-open').keydown((e) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        $(e.target).trigger('click').removeClass('mouse')
      }
    })
  }
  scrollWhenFocus(e, $parent) {
    const $body = $('html,body')
    if ($parent.hasClass('mod-banner-slide')) {
      return
    }
    if ($parent.innerHeight() + 250 > $(window).height()) {
      let top = $(e.target).offset().top
      const $col = $(e.target).parents('.row')
      if ($col.length && $col.innerHeight() + 200 < $(window).height()) {
        top = $(e.target).parents('.row').first().offset().top
      } else {
        if($(e.target).hasClass('slick-arrow') && $(e.target).parents('.mod-image-carousel,.mod-banner-slide').length > 0) {
          top = $(e.target).offset().top  - $(window).innerHeight() + 500
        }
      }
      $body.stop().animate({ scrollTop: top - 300 }, 200)
    } else {
      $body.stop().animate({ scrollTop: $parent.offset().top - 200 }, 200)
    }
  }
  dtTagKeyboard() {
    $('a,button,input,div').on('focus', (e) => {
      if ($(window).width() >= 1200) {
        const $body = $('html,body')
        const $target = $(e.target)
        const $parent = $target.parents('section')
        const top = $target.offset().top + $target.innerHeight()
        let offsetT = $target.offset().top
        if($target.parents('.row').length > 0) {
          offsetT = $target.parents('.row').first().offset().top
        }
        const scroll = $(window).scrollTop()
        if (!$target.hasClass('mouse')) {
          if ($parent.length && $parent.find('.mod-popup').length <= 0 && (offsetT < scroll + 300 || top > scroll + $(window).height() - 300)) {
            this.scrollWhenFocus(e, $parent)
          }
          if ($target.parents('#footer').length) {
            $body.stop().animate({ scrollTop: $('html').height() }, 200)
          }
        }
      }
    })
  }

}

new ADA().init()
