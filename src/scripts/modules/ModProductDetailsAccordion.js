export class ModProductDetailsAccordion {
  constructor(el) {
    this.$this = $(el)
    this.$accordionTitle = this.$this.find('.js-accordion-control')
    this.isCollapsedText = 'is-collapse'
  }

  init() {
    this.controlAccordion();
  }

  controlAccordion() {
    this.$accordionTitle.on('click', (e) => {
      const $target = $(e.currentTarget)
      const $parent = $target.parents('.item-accordion')
      const $content = $parent.find('.content-accordion')
      $content.slideToggle()
      if ($parent.hasClass(this.isCollapsedText)) {
        $parent.removeClass(this.isCollapsedText)
        setTimeout(() => {
          $target.attr('aria-expanded', 'false')
        }, 300)
      } else {
        setTimeout(() => {
          $target.attr('aria-expanded', 'true')
        }, 300)
        $parent.addClass(this.isCollapsedText)
      }
    })
  }
}

export default (() => {
  const $accordionElm = $('.mod-product-details-accordion')
  if ($accordionElm.length) {
    $accordionElm.each((_idx, el) => {
      const accordions = new ModProductDetailsAccordion(el)
      accordions.init();
    })
  }
})()