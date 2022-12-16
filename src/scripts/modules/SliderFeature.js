export class SliderFeature {
  constructor(el) {
    this.$this = $(el)
    this.SlideImage = this.$this.find('.list-image-feature')
    this.SlideContent = this.$this.find('.list-detail-feature')
    this.jsItemImage = this.$this.find('.item-bg-feature')
  }
  init() {
    if (this.$this.length) {
      this.hanldeSlide()
      this.handleSlideContent()
      this.setWidthImage()
      $(window).on('resize', () => {
        this.setWidthImage()
      })
    }
  }
  handleSlideContent() {
    if ($(window).innerWidth() < 1200 & !this.SlideContent.hasClass('slick-initialized')) {
      this.SlideContent.slick({
        speed: 1000, infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        rows: 0,
        draggable: false,
        touchMove: false
      }).on('beforeChange', (_event, _slick, _currentSlide, _nextSlide) => {
        this.jsItemImage.removeClass('active')
        $(this.jsItemImage[_nextSlide]).addClass('active')
      })
      this.handleClickMobile()
    } else {
      if ($(window).innerWidth() >= 1200 & this.SlideContent.hasClass('slick-initialized')) {
        this.SlideContent.slick('unslick')
      }
    }
  }
  handleClickMobile() {
    const itemContent = this.SlideContent.find('.item-content-feature')
    itemContent.on('click', (e) => {
      const indexItemContent = $(e.currentTarget).index()
      this.SlideContent.slick('slickGoTo', indexItemContent)
    })
  }
  hanldeSlide() {
    const jsCol = this.$this.find('.js-collapse-feature')
    jsCol.on('click', (e) => {
      const $elm = $(e.currentTarget)
      const $index = $elm.parent().index()
      if (!$elm.hasClass('active')) {
        jsCol.parent().removeClass('active').addClass('xl:bg-soft-blue')
        jsCol.attr('aria-expanded', false)
        $elm.parent().addClass('active').removeClass('xl:bg-soft-blue')
        $elm.attr('aria-expanded', true)
        if ($(window).innerWidth() < 1200) {
          this.SlideContent.slick('slickGoTo', $index)
        }
        this.jsItemImage.removeClass('active')
        $(this.jsItemImage[$index]).addClass('active')
      }
      if ($(window).innerWidth() > 1199) {
        jsCol.parent().addClass('pointer-events-none')
        setTimeout(() => {
          jsCol.parent().removeClass('pointer-events-none')
        }, 1500)
      }
    })
  }
  setWidthImage() {
    this.SlideImage.each((_index, e) => {
      const widthItem = $(e).innerWidth()
      $(e).find('.bg').css('width', widthItem)
    })
  }
}
export default (() => {
  const $slider = $('.mod-slider-feature')
  if ($slider.length) {
    $slider.each((_i, el) => {
      new SliderFeature(el).init()
    })
  }
})()