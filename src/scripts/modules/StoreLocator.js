
export default class StoreLocator {
  constructor () {
    this.$this = $('.mod-store-locator')
    this.clsPinScroll = 'pin-scroll'
    this.clsTopScroll = 'stop-scroll'
  }
  init () {
    $(window).on('scroll', () => {
      if(this.$this.length && ($(window).innerWidth() < 601)) {
        this.pinMobile()
      }
    })
  }
  pinMobile() {
    const wTop = $(window).scrollTop()
    const listFeatureImage = this.$this.find('#storepoint-map')
    const imgFeature = this.$this.find('#storepoint-container')
    const heightMo = this.$this.innerHeight()
    const offsetMo = this.$this.offset().top
    const offsetTopImg = imgFeature.offset().top
    const heightHeader = $('#header').innerHeight()
    if (wTop >= offsetTopImg - heightHeader) {
      listFeatureImage.css({
        'position': 'fixed',
        'top': heightHeader,
        'bottom': 'auto',
        'left': '-2px',
        'right': '-2px',
        'z-index': 3
      }).parent().addClass(this.clsPinScroll).removeClass(this.clsTopScroll)
    } else {
      listFeatureImage.css({
        'position': '',
        'top': '',
        'bottom': '',
        'left': '',
        'right': '',
        'z-index': ''
      }).parent().removeClass(this.clsPinScroll).removeClass(this.clsTopScroll)
    }
    if (wTop + 330 > offsetMo + heightMo - heightHeader + 70) {
      listFeatureImage.css({
        'position': 'absolute',
        'top': 'auto',
        'bottom': '0',
        'left': '',
        'right': '',
        'z-index': 3
      }).parent().removeClass(this.clsPinScroll).addClass(this.clsTopScroll)
    }
  }
}
new StoreLocator().init()