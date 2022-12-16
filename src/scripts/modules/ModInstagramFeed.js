export default class ModInstagramFeed {
  constructor() {
    this.$this = $('.mod-instagram-feed')
    this.$instaFeed = $('#insta-feed')
  }
  init() {
    if (this.$this.length) {
      this.getInfoInstagram()
    }
  }
  getInfoInstagram() {
    const waitInstagram = setInterval(() => {
      const $imagesLazy = this.$instaFeed.find('.js-lazy-image')
      const $linkInsta = this.$instaFeed.find('a')
      if ($imagesLazy.length) {
        clearInterval(waitInstagram)
      }
      const $imgs = this.$this.find('.img-item-instagram')
      const $linkInstaRender = this.$this.find('.instagram-link')
      $linkInsta.attr('tabindex','-1')
      $linkInsta.each((_i, ele) => {
        const $link = $(ele)
        const $imgInsta = $link.find('.js-lazy-image')
        const url = $imgInsta.data('src') || $imgInsta.attr('src')
        const $imgNumber = $imgs.eq(_i)
        $linkInstaRender.eq(_i).attr({
          href: $link.attr('href'),
          target: $link.attr('target'),
          rel: $link.attr('rel')
        })
        if ($imgNumber) {
          $imgNumber.attr('alt', $imgInsta.attr('alt'))
          $imgNumber.attr('data-src', url).addClass('lazy').removeClass('b-loaded')
          window.lazyload()
        }
      })
    }, 200)
  }
}
new ModInstagramFeed().init()