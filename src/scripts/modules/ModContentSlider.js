export class ModContentSlider {
  constructor(el) {
    this.$this = $(el)
    this.$sliderImg = this.$this.find('.js-slider-img')
    this.$sliderContent = this.$this.find('.js-slider-content')
    this.$wrapDotsArrow = this.$this.find('.wrap-dots-arrow')
    this.arrowsClassName = this.$this.find('.control-slide-content-block')
    this.dotsClassName = this.$this.find('.control-dots-content-block')
    this.$wrapListImg = '.wrap-list-img'
    this.$aniNext = 'ani-next'
    this.$aniPrev = 'ani-prev'
    this.timer = null
  }

  init() {
    this.initSlider();
    this.setHeightDotsArrow();
    this.setHeightContent()
    $(window).on('resize orientationchange', () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setHeightDotsArrow()
        this.setHeightContent()
      }, 100)
    })
  }

  addtabIndex () {
    this.$this.find('.slick-dots button').each((i,el) => {
      $(el).attr('data-cy', `slide-bar-${(i + 1)}`)
      setTimeout(() => {
        $(el).attr('tabindex','-1')
      })
    })
  }

  addTabIndexItem () {
    const $item = this.$this.find('.slick-slide')
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

  initSlider() {
    this.$sliderContent.on('init', (_event, _slick) => {
      this.addtabIndex()
      this.addTabIndexItem()
      this.clickArrow()
    });
    this.$sliderContent.slick({
      rows: 0,
      slidesToShow: 1,
      slide: '.slider-content-item',
      infinite: false,
      dots: true,
      fade: true,
      speed: 600,
      accessibility: false,
      prevArrow: '<button aria-controls="oveflow-block-carousel-items" data-cy="arrow-overflow-prev" class="slick-prev arrows h1 text-primary-100"><span class="icomoon icon-chevron-left"></span> <span class="sr-only">Prev slider overflow content block</span></button>',
      nextArrow: '<button aria-controls="oveflow-block-carousel-items" data-cy="arrow-overflow-next" class="slick-next arrows h1 text-primary-100"><span class="icomoon icon-chevron-right"></span><span class="sr-only">Next slider overflow content block</span></button>',
      appendArrows: this.arrowsClassName,
      appendDots: this.dotsClassName
    }).on('beforeChange', (_e, slick, _currentSlide, nextSlide) => {
      this.$wrapDotsArrow.find('button').css('pointer-events', 'none');
      const $next = this.$sliderContent.find(`[data-slick-index='${nextSlide}']`)

      slick.$slides.each((idx, slide) => {
        if (idx < $next.index()) {
          $(slide).find(this.$wrapListImg).removeClass(this.$aniNext).addClass(this.$aniPrev)
        } else {
          $(slide).find(this.$wrapListImg).removeClass(this.$aniPrev).addClass(this.$aniNext)
        }
      })
    })

    this.$sliderContent.on('afterChange', () => {
      this.$wrapDotsArrow.find('button').css('pointer-events', '');
      this.addtabIndex()
      this.addTabIndexItem()
      this.clickArrow()
    })
  }

  setHeightDotsArrow() {
    if ($(window).width() < 1200) {
      const heightSliderImg = $('.slick-current').find('.js-slider-img').height();
      this.$wrapDotsArrow.css('top', heightSliderImg);
    } else {
      this.$wrapDotsArrow.css('top', '');
    }
  }
  setHeightContent() {
    this.$sliderContent.find('.wrap-content-title').css('height',this.$this.find('.content-title > div').innerHeight())
  }
}

export default (() => {
  const $contentSlider = $('.mod-content-slider')
  if ($contentSlider.length) {
    $contentSlider.each((_idx, el) => {
      new ModContentSlider(el).init()
    })
  }
})()