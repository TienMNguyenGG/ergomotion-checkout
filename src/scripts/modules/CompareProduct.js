class CompareProduct {
  constructor(el) {
    this.$el = $(el)
    this.$Accordion = $('.mod-accordion')
    this.$compare = $('.mod-compare-products')
    this.$pin = this.$compare.find('.pin-name-product')
    this.scroll = 0
    this.customScroll = false
    this.clsTableWrap = '.table-wrap-compare'
  }
  init() {
    if(!window.Shopify.designMode) {
      this.appendAccordion()
      this.fixedName()
      this.addSlick()
      this.addAndremoveMini()
      this.setPaddingTop()
      $(window).on('resize scroll', () => {
        this.fixedName()
        this.addAndremoveMini()
      })
      $(window).on('resize',() => {
        this.setPaddingTop()
      })
      window.callResize()
      setTimeout(() => {
        this.addAndremoveMini()
      }, 1000)
    }
  }
  setPaddingTop() {
    if($(window).width() < 1200) {
      this.$pin.css('padding-top',$('#header ').innerHeight() - 74)
    } else {
      this.$pin.css('padding-top','')
    }
  }
  appendAccordion() {
    this.$Accordion.each((i,el) => {
      let opencls = ''
      if(i === 0) {
        opencls = 'open-table'
      }
      this.$el.find(this.clsTableWrap).append(`
      <div class="js-accordion wrap-accordion w-full pt-19 md:pt-0 xl:pt-4 2xl:pt-19 ${opencls}">${$(el).find('.container').html()}</div>`)
    })
    $('.open-table .title-accordion').attr('aria-expanded','true')
    $('.mod-accordion').remove()
    $('.open-table').find('.btn-primary').removeAttr('tabindex')
    this.appendAriaLabel()
  }
  appendAriaLabel () {
    this.$compare.find('.th-table').each((i,el) => {
      this.$compare.find(`th[aria-labelledby="accordion-th-${i + 1}"]`).append(`<span class="sr-only">${$(el).text()}</span>`)
    })
  }
  appendButton (btn,btnAppend) {
    $(btnAppend).attr('href',btn.attr('href')).text(btn.text())
  }
  addSlick () {
    this.$compare.find('.list-name-mb').slick({
      arrows: false,
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      rows: 0
    })
  }
  fixedName() {
    const offset = this.$compare.offset().top
    const height = this.$compare.innerHeight()
    const scrollTop = $(window).scrollTop()
    const $name = this.$compare.find('.name-product')
    const minHeight = $name.offset().top + $name.innerHeight()
    const hPin = this.$pin.innerHeight()
    const offsetTopBtn = this.$compare.find('.compare-button').eq(0).offset().top
    let initHeight = 0
    if($(window).width() < 1200) {
      initHeight = $('#header').innerHeight()
    }
    if(scrollTop + initHeight > minHeight && scrollTop + initHeight < offset + height - hPin) {
      this.$pin.addClass('show-pin').css({
        'width': this.$compare.find(this.clsTableWrap).innerWidth()
      })
      if(scrollTop + initHeight + hPin > offsetTopBtn) {
        this.$pin.addClass('show-btn')
      } else {
        this.$pin.removeClass('show-btn')
      }
    } else {
      this.$pin.removeClass('show-pin')
    }
  }
  addCustomScroll () {
    this.scroll = new MiniBar(this.clsTableWrap,{
      barType: 'default',
      minBarSize: 8,
      alwaysShowBars: false,
      scrollX: true,
      scrollY: false,
      navButtons: false,
      scrollAmount: 8,
      onScroll: (e) => {
        this.$el.find('.wrap-desktop').stop().animate({
          scrollLeft: e.scrollLeft
        }, 200);
      }
    });
    this.customScroll = true
  }
  addAndremoveMini () {
    if($(window).width() >= 1200 && $(window).width() < 1499) {
      if(!this.customScroll && typeof window.MiniBar != 'undefined') {
        this.addCustomScroll()
      }
    } else {
      if(this.customScroll) {
        this.scroll.destroy()
        this.customScroll = false
      }
    }
  }
}

export default (() => {
  const $CompareProduct = $('.mod-compare-products')
  if ($CompareProduct.length) {
    $CompareProduct.each((_idx, el) => {
      new CompareProduct(el).init()
    })
  }
})()