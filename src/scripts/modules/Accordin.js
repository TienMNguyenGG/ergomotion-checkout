export default class Accordin {
  constructor() {
    // constructor
  }
  init() {
    this.showhiden()
  }
  showhiden() {
    const clsopen = 'open-table'
    $('html').on('click', '.title-accordion', (e) => {
      const $parent = $(e.currentTarget).parents('.js-accordion')
      if($parent.hasClass(clsopen)) {
        $parent.find('*').attr('tabindex', '-1')
        $parent.removeClass(clsopen)
        $(e.currentTarget).attr('aria-expanded','false')
      } else {
        $parent.addClass(clsopen)
        $parent.find('*').removeAttr('tabindex')
        $(e.currentTarget).attr('aria-expanded','true')
        let initHeight = 0
        if($(window).width() < 1200) {
          initHeight = $('#header').innerHeight()
        }
        setTimeout(() => {
          $('body,html').stop().animate({ scrollTop: $parent.offset().top - $('.pin-name-product').innerHeight() - initHeight }, 200)
        }, 400)
      }
    })
  }
}


new Accordin().init()