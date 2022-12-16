export default class ModQuestFeature {
    constructor () {
      this.$this = $('.mod-quest-feature')
      this.clsRunAnimation = 'run-animation'
    }
    init () {
      if (this.$this.length) {
        this.keyboradActive()
        if($(window).innerWidth() > 767) {
          this.controlItemNext()
        }
        $(window).on('scroll', () => {
          if($(window).innerWidth() < 768) {
            this.handleScrollMobile()
          }
        })
      }
    }
    controlItemNext () {
      const $item = $('.list-item-content .item-content')
      const $itemImg = $('.list-image .item')
      const $itemTouch = $('.list-icon-touch .icon-blue')
      const $aniItem = $('.eclect-item')
      let TimeRemote = ''
      $item.on('click', (e) => {
        const $elm = $(e.currentTarget)
        if(!$elm.hasClass('active')) {
          // clearInterval(intervalTime)
          clearTimeout(TimeRemote)
          $aniItem.removeClass(this.clsRunAnimation)
          $item.removeClass('active')
          $item.attr('aria-selected', 'false')
          $elm.addClass('active')
          $elm.attr('aria-selected', 'true')
          $($item[$elm.index()]).addClass('active')
          $($itemTouch[$elm.index()]).addClass('icon-white')
          $itemImg.addClass('hidden')
          $($itemImg[$elm.index()]).removeClass('hidden')
          if ($(window).innerWidth() > 1024) {
            setTimeout(() => {
              $aniItem.addClass(this.clsRunAnimation)
            }, 100)
            TimeRemote = setTimeout(() => {
              $aniItem.removeClass(this.clsRunAnimation)
            }, 1700)
            setTimeout(() => {
              $itemTouch.removeClass('icon-white')
            }, 300)
          }
        }
      })
    }
    keyboradActive() {
      const $item = $('.list-item-content .item-content')
      $item.on('keydown', (e) => {
        const code = e.keyCode
        const $elm = $(e.currentTarget)
        switch (code) {
          case 37:
            e.preventDefault()
            this.handleArrowLeft($elm)
            break;
          case 39:
            e.preventDefault()
            this.handleArrowRight($elm)
            break;
          case 32:
          case 13:
            e.preventDefault()
            this.enterSpace($elm)
            break;
          default: break;
        }
      })
    }
    enterSpace ($button) {
      $button.trigger('click')
    }
    handleArrowLeft($button) {
      if ($button.length) {
        $button.prev().focus().trigger('click')
      }
    }
    handleArrowRight($button) {
      if ($button.next().length) {
        $button.next().focus().trigger('click')
      }
    }
    handleScrollMobile () {
      const wTop = $(window).scrollTop()
      const pinQuest = this.$this.find('.pin-quest-mb')
      const $img = pinQuest.find('.item')
      const imgFeature = this.$this.find('.list-image')
      const heightMo = $('.flex-quest-image ').innerHeight()
      const offsetMo = $('.flex-quest-image ').offset().top
      const heightFeature = imgFeature.innerHeight()
      const offsetTopImg = imgFeature.offset().top
      const heightHeader = $('#header').innerHeight()
      const colContent = this.$this.find('.item-content')
      if (wTop >= offsetTopImg - heightHeader) {
        pinQuest.css({
          'position': 'fixed',
          'top': heightHeader - 10,
          'left': 8,
          'right': 8,
          'bottom': 'auto'
        }).parent().addClass('pin-scroll')
      } else {
        pinQuest.css({
          'position': '',
          'top': '',
          'left': '',
          'right': '',
          'bottom': ''
        }).parent().removeClass('pin-scroll')
      }
      if (wTop + heightFeature + 176 > offsetMo + heightMo - heightHeader) {
        pinQuest.css({
          'position': 'absolute',
          'top': 'auto',
          'left': '',
          'right': '',
          'bottom': '134px'
        })
      }

      colContent.each((index, e) => {
        const $el = $(e)
        const offsetColContent = $el.offset().top
        if (wTop + heightFeature + heightHeader + 32> offsetColContent) {
          $img.addClass('hidden')
          colContent.removeClass('active')
          $el.addClass('active')
          $($img[index]).removeClass('hidden')
        }
      })
    }
  }
new ModQuestFeature().init()