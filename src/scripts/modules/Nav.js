export default class Nav {
  constructor () {
    this.$this = $('.inner-nav-page')
    this.$el = $('.inner-nav')
    this.clsItemNavPage = '.item-nav-page'
  }
  init () {
    if (this.$this.length) {
      $('html').addClass('feature-nav-has')
      this.setupScroll()
      this.clickSection()
      this.linkActiveScroll()
      // this.enterNav()
      $(window).on('scroll', () => {
        this.setupScroll()
        this.scrollActive()
        this.checkPingMobile()
      })
    }
  }

  linkActiveScroll() {
    const string = location.href;
    const after_ = string.substring(string.indexOf('#') + 1);
    if(string.includes('#')){
      $('html,body').stop().animate({
        scrollTop: $(`#${after_}`).offset().top - 74
      }, 300);
    }
  }
  setupScroll() {
    $(`${this.clsItemNavPage}[data-nav="comfort"]`).addClass('is-active')
    this.$this.find(this.clsItemNavPage).each((_i,e) => {
      const $panel = $(`#${$(e).attr('data-nav')}`)
      if($panel.length > 0) {
        $panel.addClass('page-section')
      } else {
        $(e).addClass('disable')
      }
    })
  }
  checkPingMobile() {
    const scrollTopW = $(window).scrollTop()
    const listNav = $('.list-nav-page')
    const offsetTopP = listNav.parents('.inner-nav').offset().top
    let innertop = 0
    let max = 0
    listNav.find('.item-nav-page').each((i,el) => {
      const panel = $(`#${$(el).attr('data-nav')}`)
      if(panel.length > 0) {
        if(max < panel.offset().top + panel.innerHeight()) {
          max = panel.offset().top + panel.innerHeight()
        }
      }
    })
    if($(window).width() < 1200) {
      innertop = 90
    }
    if (scrollTopW + 80 >= offsetTopP + innertop && scrollTopW <= max ) {
      listNav.addClass('pin-nav')
    } else {
      listNav.removeClass('pin-nav')
    }
  }
  scrollActive() {
    const scrollDistance = $(window).scrollTop() + this.$this.innerHeight() + 20;
    $('.page-section').each((i,el) => {
      if ($(el).position().top <= scrollDistance) {
        this.$this.find(this.clsItemNavPage).removeClass('is-active');
        this.$this.find(this.clsItemNavPage).eq(i).addClass('is-active');
      }
    });
    if(!$('#luxy').hasClass('luxy-scroll')) {
      let max = 0
      this.$el.find(this.clsItemNavPage).each((_i,el) => {
        const panel = $(`#${$(el).attr('data-nav')}`)
        if(panel.length > 0 && max < panel.offset().top + panel.innerHeight()) {
          max = panel.offset().top + panel.innerHeight()
        }
      })
    }
  }
  clickSection () {
    this.$this.find(this.clsItemNavPage).on('click', (e) =>{
      const id = $(e.currentTarget).attr('data-nav')
      if($(`#${id}`).length > 0) {
        $('html,body').stop().animate({
          scrollTop: $(`#${id}`).offset().top - 74
        }, 300);
      }
    })
  }
}
new Nav().init()
