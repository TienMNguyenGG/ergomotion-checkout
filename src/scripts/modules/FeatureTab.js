class FeatureTab {
  constructor(el) {
    this.$el = $(el)
    this.$tab = this.$el.find('.js-handle-tab')
    this.$mockupContent = this.$el.find('.list-mockup-feature')
    this.clsActive = 'active'
    this.slideTabHanlde = this.$el.find('.list-tab-bed')
    this.$listMockup = this.$el.find('.list-slide-mockup')
  }
  init() {
    this.changeActive()
    this.addSlick()
    this.slideMockup()
    this.keyboradActive()
  }
  changeActive() {
    this.$tab.on('click', (e) => {
      const $elm = $(e.currentTarget)
      if (!$elm.hasClass('active')) {
        const $index = $elm.index()
        this.$tab.removeClass('active')
        this.$tab.attr('aria-selected', 'false')
        $elm.addClass('active')
        $elm.attr('aria-selected', 'true')
        if ($(window).innerWidth() > 1199) {
          this.$mockupContent.addClass('hidden')
          $(`.list-mockup-${($index + 1)}`).removeClass('hidden')
        }
        if (this.slideTabHanlde.hasClass('slick-initialized')) {
          this.slideTabHanlde.slick('slickGoTo', $index)
        }
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
        default: break;
      }
    })
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

  slideMockup() {
    if ($(window).innerWidth() < 1200) {
      this.$listMockup.slick({
        slidesToShow: 1,
        infinite: false,
        // centerMode: true,
        arrows: false,
        dots: false,
        draggable: false,
        swipe: false,
        touchMove: false,
        rtl: true,
        asNavFor: this.slideTabHanlde
      })
    }
  }
  addSlick() {
    if ($(window).innerWidth() < 1200) {
      this.slideTabHanlde.slick({
        slidesToShow: 1,
        infinite: false,
        arrows: false,
        dots: false,
        touchMove: false,
        draggable: false,
        asNavFor: this.$listMockup,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }).on('beforeChange', (_event, _slick, _currentSlide, _nextSlide) => {
        $($('.list-tab-bed .slick-slide')[_nextSlide]).find('.js-handle-tab').trigger('click')
      })
    }
  }
}

export default (() => {
  const $FeatureTab = $('.mod-feature-tab')
  if ($FeatureTab.length) {
    $FeatureTab.each((_idx, el) => {
      new FeatureTab(el).init()
    })
  }
})()