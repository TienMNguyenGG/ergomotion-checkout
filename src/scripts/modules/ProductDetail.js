class ProductDetail {
  constructor(el) {
    this.$el = $(el)
    this.$slider = this.$el.find('.js-prod-detail-thumbs')
    this.$increase = this.$el.find('.js-quantity-increase')
    this.$descrease = this.$el.find('.js-quantity-descrease')
    this.$qunatityInput = this.$el.find('.js-quantity__input')
    this.timer = null
    this.clsProdSlideItem = '.prod-slide-item'
    this.clsBtnOpen = '.btn.openbox'
  }
  init() {
    this.checkInitSlider()
    this.onresize()
    this.activeMenuCollection()
    this.addtoCartSellUp()
    this.disableBtn()
  }
  activeMenuCollection () {
    const name = this.$el.attr('data-name').replaceAll(/\s/g,'')
    $('.dropdown-menu li').each((_i,el) => {
      if(name === $(el).find('a').attr('href')) {
        $(el).addClass('is-active')
        $(el).parents('.has-sub').addClass('is-active')
      }
    })
  }
  onresize() {
    $(window).on('resize', () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.checkInitSlider()
      }, 100)
    })
  }
  checkInitSlider() {
    const hasSlider = this.$slider.hasClass('slick-initialized')
    if (window.innerWidth < 1200) {
      if (!hasSlider) {
        this.initSlider()
      }
    } else {
      if (hasSlider) {
        this.$slider.slick('destroy')
      }
    }
  }

  initSlider() {
    this.$slider.on('init', (_event, _slick) => {
      this.$slider.find(this.clsProdSlideItem).attr('tabindex','-1')
      if($(window).innerWidth() >= 1200) {
        $(window).paroller()
      }
    });
    this.$slider.slick({
      rows: 0,
      slide: this.clsProdSlideItem,
      autoplay: false,
      infinite: true,
      prevArrow: '<button class="slick-prev arrows h1 text-midnight-blue"><span class="icomoon icon-chevron-left"></span> <span class="sr-only">Prev slider product</span></button>',
      nextArrow: '<button class="slick-next arrows h1 text-midnight-blue"><span class="icomoon icon-chevron-right"></span> <span class="sr-only">Next slider product</span></button>',
      dots: true
    }).on('afterChange', () => {
      this.$slider.find(this.clsProdSlideItem).attr('tabindex','-1')
      window.lazyload()
    });
  }

  handleOnChangeQuantityInput() {
    this.$increase.on('click', () => {
      this.$qunatityInput.val(parseInt(this.$qunatityInput.val()) + 1)
    })
    this.$descrease.on('click', () => {
      const val = parseInt(this.$qunatityInput.val())
      if (val > 1) {
        this.$qunatityInput.val(val - 1)
      }
    })

    this.$qunatityInput.on('change input', (ev) => {
      const val = ev.target.value
      if (val < 1) {
        this.$qunatityInput.val(1)
      }
    })
  }
  showMessageAdd (title) {
    const $wrap = $('#launchtip_upsell_wrapper')
    if($wrap.length > 0) {
      if($wrap.find('.message-upsel').length > 0) {
        $wrap.find('.message-upsel').remove()
      }
      $wrap.append(`<p class="text-blue-400 message-upsel flex items-center"><span class="icomoon icon-icon-check text-blue-400 mr-10 text-footer-social-md"></span>${title}  added to your cart</p>`)
      $(this.clsBtnOpen).addClass('added')
      if($(this.clsBtnOpen).find('.icomoon').length === 0) {
        $(this.clsBtnOpen).prepend('<span class="icomoon icon-icon-check mr-10 text-footer-social-md text-white"></span>')
      }
    }
  }
  checkAddProduct() {
    const $btn = $('.featherlight .add-to-cart')
    const inter = setInterval(() => {
      if($btn.text().trim() === 'Added') {
        this.showMessageAdd($btn.attr('title'))
        clearTimeout(inter)
      }
      if($('.featherlight').length === 0) {
        clearTimeout(inter)
      }
    }, 10)
  }
  addtoCartSellUp () {
    $('html').on('click','.featherlight .add-to-cart',() => {
      this.checkAddProduct()
    })
  }
  disableBtn () {
    // this.$el.find('.product-form__buttons button').addClass('disable-click')
    // const inter = setInterval(() => {
    //   if(typeof window.affirm !== 'undefined' && typeof window.affirm.jsReady !== 'undefined' && window.affirm.jsReady() === true) {
    //     this.$el.find('.product-form__buttons button').removeClass('disable-click')
    //     clearTimeout(inter)
    //   }
    // }, 100)
  }
}

export default (() => {
  const $productDetail = $('.mod-product-details-module')
  if ($productDetail.length) {
    $productDetail.each((_idx, el) => {
      new ProductDetail(el).init()
    })
  }
})()