class IconGrid {
  constructor(el) {
    this.$el = $(el)
    this.$iconGridBox = this.$el.find('.js-grid-box')
    this.$plusIcon = this.$iconGridBox.find('.js-open-insight')
    this.$minusIcon = this.$iconGridBox.find('.js-close-insight')
    this.$showMore = this.$el.find('.js-show-more')
    this.gridBoxClass = 'js-grid-box'
    this.activeClass = 'box-active'
    this.animCoverClass = 'js-anim-cover'
    this.delayScale = 'delay-scale'
    this.timer = null
    this.index = 2
    this.isHovering = false
    this.hoveringTimerIn = null
    this.hoveringTimerOut = null
  }
  init() {
    this.openCloseMb()
    this.onHoverGridBoxDesktop()
    this.showMoreAction()
    this.onresize()
    this.onfocusGridBoxDesktop()
    this.onKeycodeBoxGrid()
  }
  openCloseMb() {
    this.$iconGridBox.on('click', (e) => {
      if (!$(e.target).hasClass('icon-minus3') && !$(e.target).hasClass('js-close-insight') ) {
        this.outBoxGridMb()
        this.inBoxGrid(e)
      }
    })
    this.$minusIcon.on('click', (e) => {
      const $parent = $(e.currentTarget).closest(`.${this.gridBoxClass}`)
      this.outBoxGridMb($parent)
    })
  }
  calcHeightOfBox($parent) {
    const $insightBox = $parent.find('.insight-box')
    const $coverAnim = $insightBox.closest(`.${this.animCoverClass}`)
    const he = $insightBox.outerHeight()
    $coverAnim.css('height', he)
  }
  unActiveBox($parent) {
    $parent.parent().css('z-index', '')
    $parent.removeClass(this.activeClass)
    const $coverAnim = $parent.find(`.${this.animCoverClass}`)
    $coverAnim.css('height', '')
  }
  resetAllActiveMobile() {
    this.$iconGridBox.removeClass(this.activeClass)
    this.$iconGridBox.find(`.${this.animCoverClass}`).css('height', '')
  }
  onresize() {
    $(window).on('resize', () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (window.innerWidth > 1199) {
          this.resetAllActiveMobile()
        }
      }, 100)
    })
  }
  inBoxGrid(e) {
    const $target = $(e.currentTarget)
    clearTimeout(this.hoveringTimerOut)
    clearTimeout(this.hoveringTimerIn)
    if (this.isHovering) {
      $target.addClass(this.delayScale)
      this.hoveringTimerIn = setTimeout(() => {
        $target.parent().css('z-index', this.index)
        this.index++
      }, 250)
    } else {
      $target.parent().css('z-index', this.index)
      this.index++
    }
    $target.addClass('hovering')
    this.isHovering = true
  }

  outBoxGrid(e) {
    const $target = $(e.currentTarget)
    $target.removeClass(this.delayScale)
    this.hoveringTimerOut = setTimeout(() => {
      this.isHovering = false
    }, 250)
    $target.removeClass('hovering')
  }
  outBoxGridMb(_e) {
    this.$iconGridBox.removeClass(this.delayScale)
    this.hoveringTimerOut = setTimeout(() => {
      this.isHovering = false
    }, 250)
    this.$iconGridBox.removeClass('hovering')
  }
  onHoverGridBoxDesktop() {
    this.$iconGridBox.on('mouseenter', (e) => {
      this.handleScreenInbox(e)
    })
    this.$iconGridBox.on('mouseleave', (e) => {
      this.handleScreenOutbox(e)
    })
  }

  onfocusGridBoxDesktop() {
    this.$iconGridBox.focusin((e) => {
      this.handleScreenInbox(e)
    })
    this.$iconGridBox.focusout((e) => {
      this.handleScreenOutbox(e)
    })
  }
  handleScreenInbox(e) {
    if ($(window).innerWidth() > 1199) {
      this.inBoxGrid(e)
    }
  }
  handleScreenOutbox(e) {
    if ($(window).innerWidth() > 1199) {
      this.outBoxGrid(e)
    }
  }
  onKeycodeBoxGrid() {
    $(window).keydown((_e) => {
      if (event.keyCode === 27) {
        this.$iconGridBox.removeClass('hovering')
      }
    })
    this.$iconGridBox.keydown((e) => {
      if (event.keyCode === 13 || event.keyCode === 32) {
        e.preventDefault()
        this.inBoxGrid(e)
      }
    })
  }

  showMoreAction() {
    this.$showMore.on('click', () => {
      this.$iconGridBox.parent().removeClass('just-hidden-mb just-hidden-tablet')
      this.$showMore.addClass('hidden')
    })
  }
}

export default (() => {
  const $iconGrid = $('.mod-icons-grid')
  if ($iconGrid.length) {
    $iconGrid.each((_idx, el) => {
      new IconGrid(el).init()
    })
    if($iconGrid.find('.just-hidden-mb,.just-hidden-tablet').length <= 0) {
      $iconGrid.find('.js-show-more').addClass('hidden')
    }
  }
})()