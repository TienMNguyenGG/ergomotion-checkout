export default class ModQuestFeature {
  constructor () {
    this.$this = $('#faq-plus-app')
    this.$wrap = $('#faq-plus-app-template-three')
    this.$wrapBtn = this.$this.find('#faq-plus-category-topbar')
    this.clsActive = 'is-active'
  }
  init () {
    if (this.$this.length) {
      this.renderTab()
      this.clickTab()
    }
    $('html').addClass('onload-dom')
  }
  renderTab() {
    let html = `<div class="container md:px-24 xl:max-w-1060"><div class="tablist-faq tablist relative overflow-auto flex w-auto -mr-12 md:-mr-24 xl:mr-0 xl:justify-center 2xl:max-w-1016 2xl:mx-auto" role="tablist">
    <button type="button" role="tab" class="is-active tab-all" id="tab-all">All Categories</button>`
    this.$this.find('.faq-app-category-individual').each((_i,el) => {
      html += `<button type="button" role="tab" id="tab-${$(el).attr('href').substring(1)}" aria-selected="true" aria-controls="${$(el).attr('href').substring(1)}">${$(el).text()}</button>`
    })
    html += '</div><span class="h-0p5 block bg-hush-black ml-4 -mr-12 md:-mr-24 md:ml-0 xl:mr-0 2xl:max-w-1016 2xl:mx-auto"></span></div>'
    this.$wrapBtn.after(html)
    this.$this.find('.faq-plus-accordian-section').each((_i,el) => {
      $(el).attr('role','tabpanel').attr('aria-labelledby',`tab-${$(el).attr('id')}`).addClass(this.clsActive)
    })
  }
  clickTab() {
    this.$this.on('click','.tablist-faq button', (e) => {
      const $button = this.$this.find('.tablist-faq button')
      const $panel = this.$this.find('.faq-plus-accordian-section')
      const $el = $(e.currentTarget)
      $button.removeClass(this.clsActive)
      $el.addClass(this.clsActive)
      if($el.hasClass('tab-all')) {
        $panel.addClass(this.clsActive)
      } else {
        $panel.removeClass(this.clsActive)
        $(`#${$el.attr('aria-controls')}`).addClass(this.clsActive)
      }
    })
  }
}
new ModQuestFeature().init()