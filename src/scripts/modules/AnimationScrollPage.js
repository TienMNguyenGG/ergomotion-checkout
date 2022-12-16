(function ($) {
  'use strict';

  const elem = $('[data-paroller-factor]');
  const setDirection = {
      bgVertical (elem, bgOffset) {
          return elem.css({'background-position': `center ${ -bgOffset }px`});
      },
      bgHorizontal (elem, bgOffset) {
          return elem.css({'background-position': `${-bgOffset }px center`});
      },
      vertical (elem, elemOffset) {
          if (elemOffset <= 0 && !elem.hasClass('wrap-instagram-image') && !elem.hasClass('wrap-content-home') && !elem.hasClass('remote-feature') && !elem.hasClass('wrap-text-center')) {
            elem.addClass('done-ani-scroll')
          }
          return elem.css({
              '-webkit-transform': `translateY(${elemOffset }px)`,
              '-moz-transform': `translateY(${elemOffset }px)`,
              'transform': `translateY(${elemOffset }px)`
          });
      },
      horizontal (elem, elemOffset) {
          return elem.css({
              '-webkit-transform': `translateX(${ elemOffset }px)`,
              '-moz-transform': `translateX(${ elemOffset }px)`,
              'transform': `translateX(${ elemOffset }px)`
          });
      }
  };

  const calculateHeight = ($this, windowHeight) => {
    let height = windowHeight / 2.5
    if ($this.hasClass('row-large-banner')) {
      height = windowHeight / 1.5
    }
    if ($this.hasClass('headline-testimonials-over')) {
      height = windowHeight / 2.2
    }
    if ($this.hasClass('js-item-content')) {
      height = windowHeight / 1.8
    }
    if ($this.hasClass('remote-feature')) {
      height = windowHeight / 4
    }
    if ($this.hasClass('wrap-hero-image')) {
      height = windowHeight / 4
    }
    if ($this.parents('.mod-half-text-image').length > 0) {
      height = windowHeight / 4
    }

    return height
  }

  const checkTypeParoller = ($this, direction, bgOffset, transform, type) => {
    if(type === 'background') {
      if(direction === 'vertical') {
          setDirection.bgVertical($this, bgOffset);
      }
      else {
        if(direction === 'horizontal') {
          setDirection.bgHorizontal($this, bgOffset);
        }
      }
    }
    else {
      if(type === 'foreground') {
        if(direction === 'vertical') {
            setDirection.vertical($this, transform);
        } else {
          if(direction === 'horizontal') {
            setDirection.horizontal($this, transform);
          }
        }
      }
    }
  }

  const checkTypeParollerScroll = ($this, direction, bgOffset, transform, type, documentHeight, scrolling) => {
    if(type === 'background') {
      if(direction === 'vertical') {
          setDirection.bgVertical($this, bgOffset);
      }
      else {
        if(direction === 'horizontal') {
          setDirection.bgHorizontal($this, bgOffset);
        }
      }
    }
    else {
      if((type === 'foreground') && (scrolling < documentHeight)) {
        if(direction === 'vertical') {
            setDirection.vertical($this, transform);
        }
        else {
          if(direction === 'horizontal') {
            setDirection.horizontal($this, transform);
          }
        }
      }
    }
  }

  $.fn.paroller = function(options) {
      const windowHeight = $(window).height() + ($(window).height() / 2);
      const documentHeight = $(document).height();

      // default options
      options = $.extend({
          factor: 0,
          type: 'background', // foreground
          direction: 'vertical' // horizontal
      }, options);

      elem.each(function(){
          const $this = $(this);
          const offset = $this.offset().top;
          const height = calculateHeight($this, windowHeight)
          const dataFactor = $this.data('paroller-factor');
          const dataType = $this.data('paroller-type');
          const dataDirection = $this.data('paroller-direction');
          const factor = (dataFactor) ? dataFactor : options.factor;
          const type = (dataType) ? dataType : options.type;
          const direction = (dataDirection) ? dataDirection : options.direction;
          let bgOffset = Math.round(offset * factor);
          let transform = Math.round((offset - (windowHeight / 2) + height) * factor);

          checkTypeParoller($this, direction, bgOffset, transform, type)

          $(window).on('scroll', function(){
              const scrolling = $(this).scrollTop();
              bgOffset = Math.round((offset - scrolling) * factor);
              transform = Math.round(((offset - (windowHeight / 2) + height) - scrolling) * factor);
              checkTypeParollerScroll($this, direction, bgOffset, transform, type, documentHeight, scrolling)
          });
      });
  };
})(jQuery);
export default class AnimationScrollPage {
  constructor () {
    this.$elems = $('.animation')
    this.winH = window.innerHeight
    this.winW = window.innerWidth
    this.offset = window.innerHeight
    this.wintop = null
    this.topcoords = null
    this.addClassAni = 'set-animation'
    this.$body = $('body')
    this.flagS = 1
  }
  init () {
    this.animationEle()
    window.animationScroll = this.animationEle.bind(this)
    window.flag = true
  }
  animationEle () {
    this.offset = this.winH
    const $body = $('body')
    if ($body.hasClass('has-animation')) {
      this.wintop = $(window).scrollTop()
      let scrollHome = 0
      if ($body.hasClass('index')) {
        scrollHome = 200
      }
      this.$elems.each((_index, ele) => {
        const $elm = $(ele)
        if ($elm.hasClass(this.addClassAni)) {
          return true
        }
        this.topcoords = $elm.offset().top + scrollHome
        if (this.wintop > (this.topcoords - this.offset)) {
          this.checkInitLuxy()
          $elm.addClass(this.addClassAni)
          if ($elm.find('.ani-hello-ergo').length) {
            setTimeout(() => {
              $('.circle-3-4').addClass('run-animation')
            }, 1000)
          }
        }
        return true
      })
    }
  }

  checkInitLuxy() {
    if(window.Shopify.designMode !== true && $(window).innerWidth() >= 1200 && !$('body').hasClass('no-ani') && !$('body').hasClass('page-universal-noscroll') && this.flagS === 1) {
      if ($('body').hasClass('product-detail')) {
        $(window).scrollTop(0);
      } else {
        $(window).paroller()
      }
      // $(window).paroller()
      if (!this.$body.hasClass('product-detail') && !this.$body.hasClass('page-universal') && $('.mod-compare-products').length < 1) {
        window.luxy.init()
        $('body').addClass('init-scroll-luxy')
      }
      $('#luxy').addClass('luxy-scroll')
      this.flagS = 2
    }
  }
}

new AnimationScrollPage().init()
