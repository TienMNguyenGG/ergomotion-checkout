class SimilarPosts {
  constructor(el) {
    this.$el = $(el)
    this.$item = this.$el.find('.blog-articles__article')
  }
  init() {
    const uniqueNames = [];
    this.$item.each((_i,el) => {
      if($.inArray($(el).attr('data-id'), uniqueNames) === -1){
        uniqueNames.push($(el).attr('data-id'));
      } else {
        $(el).remove()
      }

    })
    const list = this.$el.find('.blog-articles__article').sort(function(a, b) {
      const timeA = parseInt($(a).find('.time').attr('data-timespam'))
      const timeB = parseInt($(b).find('.time').attr('data-timespam'))
      return timeB - timeA;
    });
    this.$el.addClass('done-render')
    if(list.length === 0) {
      this.$el.remove()
    }
    list.each((i,el) => {
      switch(i) {
        case 0:
          $(el).addClass('order-1')
          break;
        case 1:
          $(el).addClass('order-2')
          break;
        default:
          $(el).remove()
      }
    })
  }

}

export default (() => {
  const $similarposts = $('.mod-similar-posts')
  if ($similarposts.length) {
    $similarposts.each((_idx, el) => {
      new SimilarPosts(el).init()
    })
  }
})()