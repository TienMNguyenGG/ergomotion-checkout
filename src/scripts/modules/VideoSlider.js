export class VideoSlider {

  constructor(el) {
    this.arrowsClassName = 'arrows-append-for'
    this.lv2ClassName = 'lv2'
    this.lv3ClassName = 'lv3'
    this.exActiveClassName = 'slick-ex-active'
    this.eventNoneClassName = 'pointer-events-none'
    this.$el = $(el)
    this.$videoSlider = this.$el.find('.js-video-slider')
    this.$contentSlider = this.$el.find('.js-content-slider')
    this.$arrows = this.$el.find(`.${this.arrowsClassName}`)
  }

  init() {
    this.addSlider()
    this.addContentSlider()
    this.addZindexForSlide()
  }
  addDataCy () {
    this.$contentSlider.find('.slick-dots button').each((i,el) => {
      $(el).attr('data-cy', `slide-bar-${i + 1}`)
      setTimeout(() => {
        $(el).attr('tabindex','-1')
      })
    })
  }
  addTabIndexItem ($slideControl) {
    const $item = $slideControl.find('.slick-slide')
    $item.each((_index, e) => {
      if(!$(e).hasClass('slick-active')) {
        $(e).attr('tabindex', '-1').find('*').attr('tabindex', '-1')
      } else {
        $(e).removeAttr('tabindex').find('*').removeAttr('tabindex', '')
      }
    })
  }
  clickArrow () {
    const $arrow = $('button.arrows')
    $arrow.removeAttr('tabindex')
    $('.slick-disabled').attr('tabindex', '-1')
    $arrow.keydown((e) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        setTimeout(() => {
          if (!$(e.target).hasClass('slick-disabled')) {
            $(e.target).removeClass('mouse')
          }
        }, 500)
      }
    })
  }
  addSlider() {
    this.$videoSlider.on('init', (_event, _slick) => {
      this.addDataCy()
      this.addTabIndexItem(this.$videoSlider)
    });
    this.$videoSlider.slick({
      rows: 0,
      slide: '.video-sl-item',
      autoplay: false,
      speed: 1100,
      infinite: false,
      accessibility: false,
      rtl: true,
      prevArrow: '<button class="slick-prev arrows h1 text-midnight-blue"><span class="icomoon icon-chevron-left"></span><span class="sr-only">Prev slider product</span></button>',
      nextArrow: '<button class="slick-next arrows h1 text-midnight-blue"><span class="icomoon icon-chevron-right"></span><span class="sr-only">Next slider product</span></button>',
      dots: false,
      asNavFor: this.$contentSlider,
      waitForAnimate: false,
      appendArrows: this.$videoSlider.parent().find(`.${this.arrowsClassName}`)
    }).on('beforeChange', (_event, _slick, _currentSlide, nextSlide) => {
      const $next = this.$videoSlider.find(`[data-slick-index='${nextSlide}']`)
      _slick.$slides.each((idx, slide) => {
        if (idx < $next.index()) {
          $(slide).removeClass(this.lv2ClassName).removeClass(this.lv3ClassName).addClass(this.exActiveClassName)
        }else {
          $(slide).removeClass(this.lv2ClassName).removeClass(this.lv3ClassName).removeClass(this.exActiveClassName)
        }
      })
      $next.next().addClass(this.lv2ClassName)
      if (!$next.next().hasClass('lv2-special')) {
        $next.next().next().addClass(this.lv3ClassName)
      }

      this.$arrows.addClass(this.eventNoneClassName)
      this.$videoSlider.addClass(this.eventNoneClassName)
    }).on('afterChange', () => {
      this.addDataCy()
      this.addTabIndexItem(this.$videoSlider)
      this.$arrows.removeClass(this.eventNoneClassName)
      this.$videoSlider.removeClass(this.eventNoneClassName)
    })
  }

  addContentSlider() {
    const initADA = () => {
      this.addDataCy()
      this.clickArrow()
      this.addTabIndexItem(this.$contentSlider)
    }

    this.$contentSlider.on('init', initADA);
    this.$contentSlider.slick({
      rows: 0,
      slide: '.content-sl-item',
      autoplay: false,
      infinite: false,
      speed: 1000,
      accessibility: false,
      prevArrow: '<button class="slick-prev arrows h1 text-midnight-blue"><span class="icomoon icon-chevron-left"></span><span class="sr-only">Prev slider product</span></button>',
      nextArrow: '<button class="slick-next arrows h1 text-midnight-blue"><span class="icomoon icon-chevron-right"></span><span class="sr-only">Next slider product</span></button>',
      dots: true,
      adaptiveHeight: true,
      asNavFor: this.$videoSlider,
      fade: true,
      appendArrows: this.$contentSlider.parent().find(`.${this.arrowsClassName}`)
    }).on('afterChange', initADA)
  }

  addZindexForSlide() {
    this.$videoSlider.find('.slick-slide').each((_i, el) => {
      $(el).addClass(`z-${9998 - _i}`)
    })
  }
}

export default (() => {
  const $modSlider = $('.mod-video-slider')
  if ($modSlider.length) {
    $modSlider.each((_i, el) => {
      new VideoSlider(el).init()
    })
  }
})()