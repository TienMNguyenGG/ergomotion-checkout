export default class resizeTable {
  constructor(_el) {
    this.clsTableWrapCompare = '.table-wrap-compare'
    this.clsSlickDisabled = 'slick-disabled'
    this.$this = $('.mod-compare-products')
    this.compare = '.mod-compare-products'
  }
  init() {
    window.xDown = null
    window.yDown = null
    if(this.$this.length > 0) {
      const $prev = this.$this.find('.prev')
      const $next =  this.$this.find('.next')
      const $button = this.$this.find('.control-table li button')
      const _that = this
      let time
      document.querySelector(this.clsTableWrapCompare).addEventListener('touchstart', _that.handleTouchStart, false);
      document.querySelector(this.clsTableWrapCompare).addEventListener('touchmove', _that.handleTouchMove, false);
      $button.click(function () {
        $button.removeClass('active')
        const tableWrap = $('.table-wrap')
        const index = $(this).parent().index()
        _that.$this.find('.control-table').each((_i,el) => {
          $(el).find('li').each((ind,elm) => {
            if(ind === index) {
              $(elm).find('button').addClass('active')
            }
          })
        })
        _that.$this.find('.list-name-mb').slick('slickGoTo',index)
        const widthCol1 = $('.name-product.col1').innerWidth() + 2
        const widthCol2 = $('.name-product.col2').innerWidth() + 2
        const widthCol3 = $('.name-product.col3').innerWidth() + 2
        tableWrap.addClass('click-scroll')
        let scroll = 0
        if (index === 0) {
          scroll = 0
          tableWrap.removeClass('scrolling')
        } else if (index === 1) {
          scroll = widthCol1
          tableWrap.addClass('scrolling')
        } else if (index === 2) {
          scroll = (widthCol1 + widthCol2)
          tableWrap.addClass('scrolling')
        } else if (index === 3) {
          scroll = (widthCol1 + widthCol2 + widthCol3)
          tableWrap.addClass('scrolling')
        } else {
          console.log('end')
        }
        $('.table-wrap').animate({ scrollLeft: scroll }, 400);
        clearTimeout(time)
        time = setTimeout(() => {
          tableWrap.removeClass('click-scroll')
          _that.checkActive($prev, $next, _that)
        }, 410)
      })
      _that.handlePrevClick($prev, _that, $next)
      _that.handleNextClick($prev, _that, $next)
      _that.callResize()
      _that.checkActive($prev, $next, _that)
      window.callResize = _that.callResize.bind(this)
      $(window).resize(function () {
        _that.callResize()
        _that.checkActive($prev, $next, _that)
      })
    }
  }
  handlePrevClick ($prev, _that, $next) {
    $prev.click(function () {
      $('li button.active').parent().prev().find('button').click()
      _that.checkActive($prev, $next, _that)
    })
  }
  handleNextClick($prev, _that, $next) {
    $next.click(function () {
      $('li button.active').parent().next().find('button').click()
      _that.checkActive($prev, $next, _that)
    })
  }
  handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    window.xDown = firstTouch.clientX;
    window.yDown = firstTouch.clientY;
  }
  handleTouchMove(evt) {
    const $this = $('.mod-compare-products .control-table.control-primary')
    if ( !  window.xDown || ! window.yDown ) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff =  window.xDown - xUp;
    const yDiff = window.yDown - yUp;
    if($(window).width() < 1200) {
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          /* right swipe */
          $this.find('.next').click()
        } else {
          /* left swipe */
          $this.find('.prev').click()
        }
      } else {
        if ( yDiff > 0 ) {
          /* down swipe */
        } else {
          /* up swipe */
        }
      }
    }
    /* reset values */
     window.xDown = null;
    window.yDown = null;
  }
  callResize() {
    const $table = $(this.clsTableWrapCompare)
    if($table.length > 0) {
      const wW = $(window).width()
      let divide = 1
      if(wW > 1499) {
        divide = 4
      } else if(wW > 1200) {
        divide = 3.1411
      } else if(wW > 767) {
        divide = 2.1
      } else {
        divide = 1.098
      }
      $table.find('th').css('min-width', $table.innerWidth()/divide)
    }
    setTimeout(() => {
      if($(window).width() < 1200) {
        $('.mod-compare-products .slick-dots .active').click()
      }
    }, 300)
  }
  checkActive ($prev, $next, _that) {
    const index = $('.mod-compare-products .slick-dots .active').parent().index()
    if(index === 0) {
      $prev.addClass(_that.clsSlickDisabled)
    } else {
      $prev.removeClass(_that.clsSlickDisabled)
    }
    if(index === $(_that.compare).find('.th-table').length - 1) {
      $next.addClass(_that.clsSlickDisabled)
    } else {
      $next.removeClass(_that.clsSlickDisabled)
    }
  }
}
new resizeTable().init()
