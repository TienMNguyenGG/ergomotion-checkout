export default class ModOverflowContentBlocks {
  constructor() {
    this.$this = $('.mod-overflow-content-blocks')
    this.$listSlider = this.$this.find('.list-slider-content-block')
    this.arrowsClassName = this.$this.find('.control-slide-content-block')
    this.dotsClassName = this.$this.find('.control-dots-content-block')
  }
  init() {
    if (this.$this.length) {
      this.initSlick()
    }
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

  initSlick() {

    const initADA = () => {
      this.addtabIndex()
      this.addTabIndexItem()
      this.clickArrow()
    }

    this.$listSlider.on('init', initADA);
    this.$listSlider.slick({
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      dots: true,
      accessibility: false,
      prevArrow: '<button aria-controls="oveflow-block-carousel-items" data-cy="arrow-overflow-prev" class="slick-prev arrows h1 text-primary-100"><span class="icomoon icon-chevron-left"></span> <span class="sr-only">Prev slider overflow content block</span></button>',
      nextArrow: '<button aria-controls="oveflow-block-carousel-items" data-cy="arrow-overflow-next" class="slick-next arrows h1 text-primary-100"><span class="icomoon icon-chevron-right"></span><span class="sr-only">Next slider overflow content block</span></button>',
      appendArrows: this.arrowsClassName,
      appendDots: this.dotsClassName,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            variableWidth: false
          }
        }
      ]
    }).on('afterChange', initADA);
  }
}
new ModOverflowContentBlocks().init()