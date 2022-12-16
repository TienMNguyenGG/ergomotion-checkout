
export default class UserAgent {
  constructor () {
    this.$html = $('html'),
    this.preWindowWidth = $(window).width()
  }
  init () {
    this.setHeght()
    this.setParamThankyou()
    this.triggerClick()
    this.showImagePrint()
    if(window.Shopify.designMode === true) {
      this.$html.addClass('designMode')
    }
    $(window).on('resize', () => {
      this.setHeght()
      this.checkReloadPage()
      clearTimeout($.data(this, 'scrollTimer'))
      $.data(this, 'scrollTimer', setTimeout(() => {
        this.setHeght()
      }, 1000))
    })
  }


  checkReloadPage() {
    const wWidth = $(window).width()
    if ((this.preWindowWidth < 1200 && wWidth >= 1200) || (this.preWindowWidth >= 1200 && wWidth < 1200)) {
      window.location.reload()
    }
    this.preWindowWidth = wWidth
  }
  setParamThankyou () {
    window.addEventListener('message', (e) => {
      if(e.data === 'done-submit') {
        window.history.replaceState(null,null,window.location.pathname + '#thankyou')
      }
      if(e.data.toString().indexOf('frame_') >= 0) {
        $('body,html').stop().animate({
          scrollTop: $(`#${e.data}`).offset().top - $('.header').height() - 100
        }, 300);
      }
      switch(e.data.toString()) {
        case 'frame_tVUA6JSOelgIII8GOgTGvQ':
          // form blog
          dataLayer.push({
            'event': 'form_submit',
            'form_name': 'Newsletter Form',
            'form_destination': window.location.origin + window.location.pathname,
          });
          break;
        case 'frame_bWpK7xYDu5G-Tq7bBlrhBQ':
          // form footer
          dataLayer.push({
            'event': 'form_submit',
            'form_name': 'Footer Signup Form',
            'form_destination': window.location.origin + window.location.pathname,
          });
          break;
        case 'frame_SWhbMUGMWjPxQOgSIHPfmQ':
        case 'frame_-pX2VKyyWfvhgxF-CdcjsQ':
          // form contact
          dataLayer.push({
            'event': 'form_submit',
            'form_name': 'Contact Form',
            'form_destination': window.location.origin + window.location.pathname,
          });
          break;
        default:
          // code block
      }
    })
  }
  setHeght() {
    const $listNav = $('.list-nav-page')
    if($listNav.length) {
      window.addtemp = $listNav.parents('.inner-nav').offset().top + 3
    }
  }
  triggerClick() {
    $('.label-color').on('keydown',(e) => {
      if(e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault()
        $(e.currentTarget).click()
      }
    })
  }
  showImagePrint() {
    window.onbeforeprint = function () {
      $('.lazy').each(function () {
        const src = $(this).attr('data-src')
        if (this.tagName === 'DIV') {
          $(this).css({
            'background-image': `url(${src})`
          })
        } else {
          $(this).attr('src', src)
        }
        $(this).removeClass('lazy').addClass('b-loaded').removeAttr('data-src')
      })
    }
  }
}
new UserAgent().init()