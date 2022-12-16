import CallBackLazy from './CallBackLazy'
const callBack = new CallBackLazy()
export default class LazyLoadImage {
  constructor () {
    this.lazyimage = '.lazy:visible'
  }
  init () {
    this.lazyLoadImage()
    $(window).on('resize orientationchange', () => {
      this.lazyLoadImage()
    })
    $(window).on('beforeprint', () => {
      this.lazyLoadAllPrint()
    })
    window.lazyload = this.lazyLoadImage.bind(this)
  }
  lazyLoadImage () {
    if ($(this.lazyimage).length > 0) {
      this.hasSlider()
      this.lazyloadimageCustom()
      $(window).on('scroll', () => {
        this.lazyloadimageCustom()
      })
    }
  }
  hasSlider (element) {
    const sliderLazy = $(element).parents('.slider-lazy')
    const prevActive = sliderLazy.find('.slick-current').prev().find('.lazy')
    const nextActive = sliderLazy.find('.slick-current').next().find('.lazy')
    const srcprev = prevActive.attr('data-src')
    const srcnext = nextActive.attr('data-src')
    if (prevActive.length) {
      if (prevActive[0].nodeName === 'IMG') {
        prevActive.attr('src', srcprev)
      } else {
        prevActive.css({
          'background-image': `url('${srcprev}')`
        })
      }
    }
    if (nextActive.length) {
      if (nextActive[0].nodeName === 'IMG') {
        nextActive.attr('src', srcnext)
      } else {
        nextActive.css({
          'background-image': `url('${srcnext}')`
        })
      }
    }
    prevActive.removeClass('lazy').addClass('b-loaded')
    nextActive.removeClass('lazy').addClass('b-loaded')
  }
  lazyloadimageCustom () {
    $(this.lazyimage).each((_index, element) => {
      const elementScroll = $(element).offset().top - window.innerHeight - (window.innerHeight / 3.5)
      const scrollBody = $(window).scrollTop()
      if (elementScroll < scrollBody) {
        const elementTmp = element.tagName
        callBack.call(elementTmp, element)
        if ($(element).parents('.fix-height').length) {
          $(element).on('load', () => {
            setTimeout(() => {
              const $fixHeight = $('.fix-height')
              if ($fixHeight.length) {
                const $items = $fixHeight.find('.height-item')
                $items.css('height','')
                $items.matchHeight({
                  byRow: true,
                  property: 'height',
                  target: null,
                  remove: false
                })
              }
            }, 200)
          })
        }
        if ($(element).parents('.slider-lazy').hasClass('slick-initialized')) {
          this.hasSlider(element)
        }
      }
    })
  }
  lazyLoadAllPrint() {
    const $imgLazy = $('img.lazy:visible,img.lazy.show-print')
    let imgLength = 0
    if ($imgLazy.length) {
      $('body').prepend(`<div class="hidden mess-print text-red">Images aren't loaded entirely yet. Please cancel this print and try again.</div>`)
      $imgLazy.each((_index, element) => {
        $(element).attr('src', $(element).attr('data-src'))
        $(element).addClass('b-loaded').removeClass('lazy').removeClass('lazy-trigger').removeAttr('data-src')
        element.onload = () => {
          imgLength += 1
          if ($imgLazy.length === imgLength) {
            $('.mess-print').remove()
          }
        }
      })
    }
  }
}

new LazyLoadImage().init()
