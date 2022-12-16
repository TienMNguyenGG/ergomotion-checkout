export class FilterBlog {
  constructor(el) {
    this.$this = $(el)
    this.page = 1
    this.append = $('.wrap-list-result')
    this.appendHidden = $('.append-hidden')
    this.appendLoadmore = $('.append-loadmore')
    this.$loadmore = this.$this.find('.loadmore')
    this.$filter = this.$this.find('.fetch-data')
    this.$filterActive = '.fetch-data.is-active'
    this.$loading = $('.loading-paging')
    this.$loadingTop = $('.loading')
    this.scroll = ''
    this.customScroll = false
    this.clsBlogArticle = '.blog-articles__article'
    this.idSearchKey = '#search-key'
    this.clsIdLoading = 'is-loading'
    this.scrollTab = $('.wrap-tab-filter .tablist')
  }

  init() {
    this.getParam()
    this.clickLoadmore();
    this.changeCategory()
    // this.addAndremoveMini()
    this.search()
    this.closeSearch()
    // $(window).on('resize',() => {
    //   this.addAndremoveMini()
    // })
  }
  closeSearch() {
    this.$this.on('click','.btn-clear-search', () => {
      $(this.$filterActive).click()
      this.$this.removeClass('search')
    })
  }
  appendContent (responseText,loading,search = null) {
    const html = $.parseHTML(responseText);
    this.appendHidden.html(html)
    const article = this.appendHidden.find(this.clsBlogArticle)
    this.append.append(article)
    if(search === 'search') {
      const length = this.appendHidden.find('.template-search__results').attr('data-size')
      this.$this.find('.filter-title').text('').append(`
      Search ${length} for <span class="font-bold">${this.$this.find(this.idSearchKey).val()}</span>
      <button class="btn-clear-search ml-5 text-base">
        <span class="icomoon icon-icon-close relative top-2 text-h4 2xl:text-h3 mr-3"></span>
        <span>Close results</span>
      </button>
    `)
      if(article.length === 0) {
        this.append.append(`<div tabindex="0" class="w-full text-center lg:mb-50">
            Sorry, no results were found.
        </div>`)
      }
    }
    this.appendHidden.html('')
    if(loading) {
      window.lazyload()
      this.$filter.prop('disabled', false)
      this.$loadmore.prop('disabled', false)
      this.$loading.addClass('hidden')
      this.$loadingTop.addClass('hidden')
      this.append.removeClass(this.clsIdLoading)
    }
  }
  checkAfterLoadmore(responseText) {
    const html = $.parseHTML(responseText);
    this.appendLoadmore.html(html)
    const article = this.appendLoadmore.find(this.clsBlogArticle)
    if(article.length === 0) {
      this.$loadmore.addClass('hidden')
    } else {
      this.$loadmore.removeClass('hidden')
    }
    this.appendLoadmore.html('')
  }
  clickLoadmore() {
    this.$loadmore.on('click',(_e) => {
      this.$this.find('.blog-articles__article.hidden').remove()
      this.loadmoreFunction(this.page + 1,true,true)
    })
  }
  loadmoreFunction(page,check,loading) {
     this.page ++
      this.$filter.prop('disabled', true)
      this.$loadmore.prop('disabled', true)
      const url = $(this.$filterActive).attr('data-url')
      this.$loading.removeClass('hidden')
      this.append.addClass(this.clsIdLoading)
      let search = ''
      let currentUrl = `${url}?page=${page}`
      let currentCheckLoadmore = `${url}?page=${page + 1}`
      if(this.$this.hasClass('search')) {
        currentUrl = `/search?page=${page}&q=${this.$this.find(this.idSearchKey).val()}%20and%20tag:ergomotion-blog&type=article`
        currentCheckLoadmore = `/search?page=${page + 1}&q=${this.$this.find(this.idSearchKey).val()}%20and%20tag:ergomotion-blog&type=article`
        search = 'search'
        if(check) {
          this.replaceStateBlog(this.$this.find(this.idSearchKey).val())
        }
      } else {
        if(check) {
          this.replaceStateBlog()
        }
      }
      fetch(currentUrl)
      .then(response => response.text())
      .then((responseText) => {
        this.appendContent(responseText,loading,search)
      });
      fetch(currentCheckLoadmore)
      .then(response => response.text())
      .then((responseText) => {
        this.checkAfterLoadmore(responseText)
      })
  }
  changeCategory () {
    this.$filter.on('click',(e) => {
      this.$this.find('.blog-articles__article.hidden').remove()
      this.page = 1
      this.$loadingTop.removeClass('hidden')
      this.append.addClass(this.clsIdLoading)
      this.$filter.removeClass('is-active')
      $(e.currentTarget).addClass('is-active')
      const url = $(e.currentTarget).attr('data-url')
      const $title = this.$this.find('.filter-title')
      if($(e.currentTarget).text().trim() !== 'All') {
        $title.text($(e.currentTarget).text())
      } else {
        $title.text($title.attr('data-init'))
      }
      this.replaceStateBlog()
      this.$this.find(this.idSearchKey).val('')
      if(this.$this.find('.filter-title .btn-clear-search').length > 0) {
        $title.text($title.attr('data-init'))
      }
      fetch(url)
      .then(response => response.text())
      .then((responseText) => {
        this.append.html('')
        this.appendContent(responseText,true)
        $('body,html').stop().animate({ scrollTop: this.$this.offset().top - 200 }, 200)
      });
      fetch(`${url}?page=${this.page + 1}`)
      .then(response => response.text())
      .then((responseText) => {
        this.checkAfterLoadmore(responseText)
      })
    })
  }
  checkWidth() {
    let w = 0
    this.$filter.each((_i,el) => {
      w += $(el).innerWidth() + parseFloat($(el).css('margin-left')) + parseFloat($(el).css('margin-right'))
    })
    if(w > this.$this.find('.wrap-tab-filter').innerWidth()) {
      return true
    }
    return false
  }
  addAndremoveMini () {
    if($(window).width() >= 1200) {
      if(!this.customScroll) {
        this.addScroll()
      }
    } else {
      if(this.customScroll) {
        this.scroll.destroy()
        this.customScroll = false
      }
    }
  }
  addScroll () {
    if(this.checkWidth()) {
      if(typeof window.MiniBar != 'undefined') {
        this.scroll = new MiniBar('.wrap-tab-filter .tablist',{
          barType: 'default',
          minBarSize: 8,
          alwaysShowBars: false,
          scrollX: true,
          scrollY: false,
          navButtons: false,
          scrollAmount: 8
        });
        this.scroll.scrollTo(this.$this.find('.is-active.fetch-data').position().left - 30,'x')
        this.customScroll = true
      }
    } else {
      if(this.customScroll) {
        this.scroll.destroy()
        this.customScroll = false
      }
    }
  }
  getParam () {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page'))
    const key = urlParams.get('key')
    if(key != null) {
      this.$this.find(this.idSearchKey).val(key)
      this.$this.addClass('search')
    }
    if(page > 1) {
      const that = this
      this.$this.find(this.clsBlogArticle).addClass('hidden')
      that.page = page
      for (let i = 1; i <= page; ++i) {
        if( i === page) {
          that.loadmoreFunction(i,false,true)
        } else {
          that.loadmoreFunction(i,false,false)
        }
      }
    }
  }
  replaceStateBlog(keyword = null,page = true) {
    try {
      let paramUrl = '?'
      let url = $(this.$filterActive).attr('data-url')

      if (keyword !== '' && keyword != null) {
        if (paramUrl !== '?') {
          paramUrl += '&'
        }
        paramUrl += 'key=' + encodeURIComponent(keyword)
        url = url + paramUrl
      }
      if (parseInt(this.page) !== 1 && page !== false) {
        if (keyword !== '' && keyword != null) {
          url = url + '&page='
        } else {
          url = url + '?page='
        }
        url = url + this.page;
      }
      window.history.replaceState(null, null, url)
    } catch (err) {
      console.log(err)
    }
  }
  getItemInSearch(checkParam) {
    this.$this.addClass('search')
    this.$filter.removeClass('is-active')
    this.$filter.eq(0).addClass('is-active')
    this.scrollTab.scrollLeft(0)
    this.append.html('')
    this.$loadmore.addClass('hidden')
    this.$loadingTop.removeClass('hidden')
    this.append.addClass(this.clsIdLoading)
    fetch(`/search?q=${this.$this.find(this.idSearchKey).val()}%20and%20tag:ergomotion-blog&type=article`)
    .then(response => response.text())
    .then((responseText) => {
      this.appendContent(responseText,true,'search')
    });
    fetch(`/search?page=${this.page + 1}&q=${this.$this.find(this.idSearchKey).val()}%20and%20tag:ergomotion-blog&type=article`)
    .then(response => response.text())
    .then((responseText) => {
      this.checkAfterLoadmore(responseText)
    })
    if(checkParam) {
      this.replaceStateBlog(this.$this.find(this.idSearchKey).val(), false)
    }
  }
  search() {
    this.$this.find('.search-blog').on('submit', (e) => {
      e.preventDefault()
      this.page = 1
      this.getItemInSearch(true)
    })
  }
}

export default (() => {
  const $blogList = $('.mod-list-blog')
  if ($blogList.length) {
    $blogList.each((_idx, el) => {
      const blogListEl = new FilterBlog(el)
      blogListEl.init();
    })
  }
})()