class FeaturedBlogs {
  constructor(el) {
    this.$el = $(el)
    this.$sliderFeatured = this.$el.find('.js-feature-blogs-list')
    this.$arrows = this.$el.find('.js-control-arrows')
    this.$dots = this.$el.find('.js-control-dots')
  }

  init() {
    this.initSlider()
    this.onResize()
  }

  onResize() {
    $(window).on('resize', () => {
      this.initSlider()
    })
  }
  addTabIndexItem () {
    const $item = this.$el.find('.slick-slide')
    $item.each((_index, e) => {
      if(!$(e).hasClass('slick-active')) {
        $(e).attr('tabindex', '-1').find('*').attr('tabindex', '-1')
      } else {
        $(e).removeAttr('tabindex').find('*').removeAttr('tabindex', '')
      }
    })
    this.$el.find('.slick-dots button').each((_i,el) => {
      setTimeout(() => {
        $(el).attr('tabindex','-1')
      })
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
    const hasSlider = this.$sliderFeatured.hasClass('slick-initialized')
    const hasDots = this.$el.find('.feature-blog-item').length > 1
    if ($(window).innerWidth() < 768) {
      if (hasSlider) {
        this.$sliderFeatured.slick('destroy')
      }
    } else {
      if (!hasSlider) {
        this.$sliderFeatured.on('init', (_event, _slick) => {
          this.addTabIndexItem()
          this.clickArrow()
        });
        this.$sliderFeatured.slick({
          slide: '.feature-blog-item',
          rows: 0,
          slidesToShow: 2.2,
          dots: hasDots,
          infinite: false,
          accessibility: false,
          prevArrow: '<button class="slick-prev arrows text-blue-100 h1"><span class="icomoon icon-chevron-left"></span> <span class="sr-only">Prev slider</span></button>',
          nextArrow: '<button class="slick-next arrows text-blue-100 h1"><span class="icomoon icon-chevron-right"></span><span class="sr-only">Next slider</span></button>',
          appendArrows: this.$arrows,
          appendDots: this.$dots,
          responsive: [
            {
              breakpoint: 1920,
              settings: {
                slidesToShow: 2.1
              }
            },
            {
              breakpoint: 1280,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        }).on('afterChange', () => {
          this.addTabIndexItem()
          this.clickArrow()
        });
      }
    }
  }
}

export default (() => {
  const $features = $('.mod-featured-blog')
  if ($features.length) {
    $features.each((_i, el) => {
      new FeaturedBlogs(el).init()
    })
  }
})()
