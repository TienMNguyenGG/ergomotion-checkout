class InternalBannerAnimation {
  constructor(el) {
    this.$el = $(el)
    this.$trigger = this.$el.find('.js-bed-img')
    this.lastScrollTop = 0
    this.animClassName = 'hide-bed-anim'
    this.offsetTop = this.$el.offset().top
  }
  init() {
    // this.triggerToggleAnim()
    this.onLoadRunAnim()
    this.animationFullWidth()
    $(window).on('resize', () => {
      this.offsetTop = this.$el.offset().top
    })
  }
  animationFullWidth () {
    $(window).scroll(() => {
      const st = $(window).scrollTop();
      if (st > this.lastScrollTop){
        // downscroll code
        this.$el.removeClass('ani-75per')
      } else {
          // upscroll code
        if(this.offsetTop + this.$el.innerHeight()/3 > st) {
          this.$el.addClass('ani-75per')
        }
      }
      this.lastScrollTop = st;
    });
  }
  triggerToggleAnim() {
    this.$trigger.on('click', () => {
      this.$el.toggleClass(this.animClassName)
    })
  }
  onLoadRunAnim() {
    $(window).on('load', () => {
      this.$el.removeClass(this.animClassName)
    })
  }
}

export default (() => {
  const $banner = $('.mod-banner-animation')
  if ($banner.length) {
    $banner.each((_i, el) => {
      new InternalBannerAnimation(el).init()
    })
  }
})()