export default class Header {
  constructor () {
    this.$header = '#header'
    this._numberScrol = 0
    this.scrollTop = 0
    this.class = 'pin-header'
  }
  init () {
    if ($(this.$header).length) {
      this.scrollPinHeader()
      this.setUpPin()
      this.setPaddingTop()
      this.focusHeader()
      $(window).on('resize', () => {
        this.setPaddingTop()
      })
    }
  }
  focusHeader() {
    $(this.$header).find('*').on('focus', () => {
      $('html').removeClass('move-down')
    })
  }
  setPaddingTop() {
    if(!$('html').hasClass('is-open-menu') && !$('.search-modal__form_mb').hasClass('is-show-search')) {
      if($(window).width() >= 1200) {
        $('#MainContent').css('padding-top',Math.ceil($(this.$header).innerHeight() - 1))
      } else {
        $('#MainContent').css('padding-top', $('.announcement-bar').innerHeight() + $('#header-logo').innerHeight())
      }
    }
  }
  scrollPinHeader () {
    this.settingPin()
    $(window).on('scroll resize orientationchange', () => {
      this.settingPin()
    })
  }
  setUpPin() {
    let lastScrollTop = 100
    $(window).scroll(() => {
      const $header = $(this.$header)
      const st = $(window).scrollTop()
      const heightHeader = $header.innerHeight()
      const listNav = $('.list-nav-page')
      const productDetail = $('.mod-product-details-module, .mod-compare-products, .mod-feature-tab')
      const mainContentDetail = $('.main-content-detail')
      if(listNav.length) {
        const offsetTopP = listNav.parents('.inner-nav').offset().top
        let max = 0
        listNav.find('.item-nav-page').each((_i,el) => {
          const panel = $(`#${$(el).attr('data-nav')}`)
          if(panel.length > 0 && (max < panel.offset().top + panel.innerHeight())) {
            max = panel.offset().top + panel.innerHeight()
          }
        })
       this.checkOffeMoveDown(st, offsetTopP, max, lastScrollTop)
      } else if (productDetail.length) {
        this.setPingHeaderInternal(productDetail, st, lastScrollTop)
      } else if (mainContentDetail.length) {
       this.setPingHeaderInternal(mainContentDetail, st, lastScrollTop)
      } else {
        if (st >= lastScrollTop) {
          $('html').addClass('move-down')
        } else {
          $('html').removeClass('move-down')
        }
      }

      if (st < heightHeader) {
        return false
      }

      lastScrollTop = st

      return true
    })
  }

  checkOffeMoveDown (st, offsetTopP, max, lastScrollTop) {
    let innertop = 0
    if($(window).width() < 1200) {
      innertop = 90
    }
    if (st >= offsetTopP + innertop && st <= max ) {
      $('html').addClass('move-down')
    } else {
      if (st >= lastScrollTop) {
        $('html').addClass('move-down')
      } else {
        $('html').removeClass('move-down')
      }
    }
  }

  setPingHeaderInternal (item, st, lastScrollTop) {
    const max = item.offset().top + item.innerHeight()
    const offsetTopP = item.offset().top
    let innertop = 0
    if($(window).width() < 1200) {
      innertop = 90
    }
    if (st >= offsetTopP + innertop && st <= max ) {
      // console.log(st, offsetTopP + innertop, max)
      $('html').addClass('move-down')
    } else {
      // console.log(st, lastScrollTop)
      if (st >= lastScrollTop) {
        $('html').addClass('move-down')
        // console.log('down')
      } else {
        $('html').removeClass('move-down')
        // console.log('up')
      }
    }
    lastScrollTop = st
  }
  
  settingPin (scroll=0) {
    this.scrollTop = $(window).scrollTop() + scroll
    if (this.scrollTop >= this._numberScrol + 87) {
      $(this.$header).addClass(this.class)
    } else {
      $(this.$header).removeClass(this.class)
    }
  }
}
new Header().init()
