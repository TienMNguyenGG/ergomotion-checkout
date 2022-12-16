export default class FixHeight {
  constructor () {
    this.$fixHeight = $('.fix-height')
  }
  init (){
    window.load = this.callFixHeight()
    this.callFixHeight()
  }
  callFixHeight () {
    const $fixHeight = $('.fix-height')
    if ($fixHeight.length) {
      const $items = $fixHeight.find('.height-item')
      $items.css('height','')
      $items.matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
      })
    }
  }
}
new FixHeight().init()
