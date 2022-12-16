class ImageFeatures {
  constructor(el) {

    this.text = {
      itemContent: 'item-content-features'
    }

    this.$el = $(el)
    this.$tab = this.$el.find(`.${this.text.itemContent}`)
    this.$img = this.$el.find('.wrap-img-feature')
    this.clsActive = 'is-active'
    this.clsPointerEvents = 'pointer-events-none'
  }
  init() {
    this.changeActive()
    this.setImageMobile()
    this.keyboradActive()
		this.setWidthImage()
    window.lastScrollTop = 0
    window.isScrolling
    $(window).on('scroll', () => {
      if($(window).innerWidth () < 768) {
       this.handleMobile()
      }
    })
    $(window).on('resize', () => {
      setTimeout(() => {
        this.setImageMobile()
				this.setWidthImage()
      }, 300)
    })
  }

  changeActive() {
    this.$tab.on('click', (e) => {
      window.lazyload()
      const $ele = $(e.currentTarget)
      const index = $ele.index()
      if(!$ele.hasClass(this.clsActive)) {
        this.$tab.addClass(this.clsPointerEvents)
        this.$tab.removeClass(this.clsActive).attr('aria-selected','false')
        this.$img.removeClass(this.clsActive)
        $ele.addClass(this.clsActive)
        this.$img.each((_i,elm) => {
          if($(elm).index() === index) {
            $(elm).addClass('is-active').attr('aria-selected','true')
            window.lazyload()
          }
        })
        setTimeout(() => {
          this.$tab.removeClass(this.clsPointerEvents)
        }, 800)
      }
    })
  }
  keyboradActive() {
    this.$tab.on('keydown', (e) => {
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
  updateListFeatureImg() {
    const wTop = $(window).scrollTop()
    const listFeatureImage = this.$el.find('.list-image-feature-new')
    const heightMo = this.$el.innerHeight()
    const offsetMo = this.$el.offset().top
    const imgFeature = this.$el.find('.col-img-features')
    const heightFeature = imgFeature.innerHeight()
    const offsetTopImg = imgFeature.offset().top
    const heightHeader = $('#header').innerHeight()
    const colContent = this.$el.find(`.${this.text.itemContent}`)
    if (wTop >= offsetTopImg - heightHeader) {
      listFeatureImage.css({
        'position': 'fixed',
        'top': heightHeader,
        'bottom': 'auto'
      }).parent().addClass('pin-scroll')
    } else {
      listFeatureImage.css({
        'position': '',
        'top': '',
        'bottom': ''
      }).parent().removeClass('pin-scroll')
      this.animationMobile($(colContent[0]), this.$img, colContent, 0, this.$tab)
    }
    if (wTop + heightFeature > offsetMo + heightMo - heightHeader) {
      listFeatureImage.css({
        'position': 'absolute',
        'top': 'auto',
        'bottom': '0'
      })
    }
  }
  handleMobile() {
    const wTop = $(window).scrollTop()
    const imgFeature = this.$el.find('.col-img-features')
    const heightFeature = imgFeature.innerHeight()
    const heightHeader = $('#header').innerHeight()
    const colContent = this.$el.find(`.${this.text.itemContent}`)
    const that = this
    this.updateListFeatureImg()
    const callAnimationMobile = (indexNumber) => {
      /* indexNumber = 1 or 2 */
      colContent.each((index, e) => {
        const $el = $(e)
        const offsetColContent = $el.offset().top
        if (wTop + heightFeature + heightHeader > offsetColContent) {
          if (index === indexNumber) {
            that.animationMobile($el, that.$img, colContent, index, that.$tab)
            return false
          } else {
            that.animationMobile($el, that.$img, colContent, index, that.$tab)
          }
        }
        return true
      })
    }

    const st = $(window).scrollTop();
    if (st > window.lastScrollTop){
      window.clearTimeout( window.isScrolling )
      window.isScrolling = setTimeout(function() {
        callAnimationMobile(2)
      }, 300)
    }  else {
      window.clearTimeout( window.isScrolling )
      window.isScrolling = setTimeout(function() {
        callAnimationMobile(1)
      }, 300)
    }
    window.lastScrollTop = st
  }
  animationMobile ($el, $img, colContent, index, $tab) {
    $img.removeClass('is-active')
    colContent.removeClass('is-active')
    $el.addClass('is-active')
    $($img[index]).addClass('is-active is-show')
    setTimeout(() => {
      $('.wrap-img-feature:not(.is-active)').removeClass('is-show')
      $tab.removeClass(this.clsPointerEvents)
    }, 800)
  }

	setWidthImage() {
		if ($(window).innerWidth() >= 1200) {
			this.$img.each((_index, e) => {
				const widthItem = this.$el.find('.list-image-feature-new').innerWidth()
				$(e).find('img').css('width', widthItem)
			})
		}
	}
  setImageMobile() {
    const $imageFeature = this.$img.find('img')
    if ($(window).innerWidth() < 1200) {
      const widthFeature =$(window).innerWidth()
      $imageFeature.css({
        'width': widthFeature,
        'max-width': 'none'
      })
    } else {
      $imageFeature.css({
        'width': '',
        'max-width': 'none'
      })
    }
  }
}

export default (() => {
  const $ImageFeatures = $('.mod-image-with-features')
  if ($ImageFeatures.length) {
    $ImageFeatures.each((_idx, el) => {
      new ImageFeatures(el).init()
    })
  }
})()