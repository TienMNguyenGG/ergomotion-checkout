export default class SlideTestimonial {
    constructor () {
      this.$this = $('.mod-testimonials-slide')
      this.clsListBox = '.list-box-terminal'
      this.clsButtonArrow = 'button.arrows'
      // this.apiStampedIOUrl = this.$this.find('.stamped-url').attr('data-stamped')
    }
    init () {
      if (this.$this.length) {
        // this.requestReviewsStampedIO()
        this.addSlick()
      }
    }
    requestReviewsStampedIO () {
      const me = this
      $.ajax({
        url: this.apiStampedIOUrl,
        type: 'GET',
        success (res) {
          if (res.data !== undefined && res.data.length > 0) {
            me.rennderReview(res.data)
            me.addSlick()
          }
        },
        error (_request, _status, error) {
          console.error('error', error)
        }
      })
    }
    getInfoItem (idx,lengthInx) {
      return `
        <div class="item-terminal px-4 2xl:px-23" role="group" aria-roledescription="slide" aria-label="1 of ${lengthInx}">
          <div class="pl-24 md:pl-16 pr-18 py-28 md:py-15 xl:py-20 2xl:px-32 2xl:py-45 bg-white col-box">
            <div class="mb-33 md:mb-5 xl:mb-17 2xl:mb-32 last-mb-none">
              <div class="list-start flex mb-9 items-center">
                {reviewRating}
              </div>
              <div data-cy="testimonial-title-${idx + 1}">
                {productName}
              </div>
            </div>
            <div data-cy="testimonial-content-${idx + 1}">
              {reviewMessage}
            </div>
            <div class="author flex items-center mt-35 md:-mt-7 xl:mt-18 2xl:mt-35">
              {author}
              <img data-src="{imgCheck}" alt="checked icon" class="lazy">
            </div>
          </div>
        </div>
      `
    }
    buildReviewItem (item,idx,lengthInx) {
      const htmlTemplate = this.getInfoItem(idx, lengthInx)
      const imgStart = this.$this.find('.img-start').text()
      const imgCheck = this.$this.find('.img-check').text()
      let product = ''
      let message = ''
      let author = ''
      let review = ''
      if (item.productName !== undefined && item.productName !== '') {
        product = `<h4 class="h5">{dataProductName}</h4>`
        product = product.replace('{dataProductName}', item.productName)
      }
      if (item.reviewMessage !== undefined && item.reviewMessage !== '') {
        message = `<p>{dataMessage}</p>`
        message = message.replace('{dataMessage}', item.reviewMessage)
      }
      if (item.author !== undefined && item.author !== '') {
        author = `<h5 class="h6 mr-10 2xl:mr-5 mb-0 text-base font-semibold">{dataAuthor}</h5>`
        author = author.replace('{dataAuthor}', item.author)
      }
      if (item.reviewRating !== undefined && item.reviewRating !== '') {
        for (let i = 0; i < item.reviewRating; i++) {
          review += `<img data-src="${imgStart}" class="lazy mr-3 no-alt" alt="">`
        }
      }

      return htmlTemplate
        .replace('{productName}', product)
        .replace('{reviewMessage}', message)
        .replace('{author}', author)
        .replace('{reviewRating}', review)
        .replace('{imgCheck}', imgCheck)
    }
    rennderReview (items) {
      const me = this
      let reviewItemsList = ''
      items.forEach((elm, idx) => {
        if (idx < 9) {
          reviewItemsList += me.buildReviewItem(elm,idx,items.length)
        }
      })
      this.$this.find(this.clsListBox).html(reviewItemsList)
    }
    addDataCy () {
      this.$this.find('.slick-dots button').each((i,el) => {
        $(el).attr('data-cy', `slide-bar-${i + 1}`)
        setTimeout(() => {
          $(el).attr('tabindex','-1')
        })
      })
    }
    addTabIndexItem () {
      const $item = this.$this.find('.slick-slide')
      const buttonArrows = $(this.clsButtonArrow)
      $item.each((_index, e) => {
        if(!$(e).hasClass('slick-active')) {
          $(e).attr('tabindex', '-1').find('*').attr('tabindex', '-1')
        } else {
          $(e).removeAttr('tabindex').find('*').removeAttr('tabindex', '')
        }
      })
      buttonArrows.removeAttr('tabindex')
      buttonArrows.each((_index, e) => {
        if($(e).hasClass('slick-disabled')) {
          $(e).attr('tabindex', '-1')
        }
      })
    }
    changeFocusDisable () {
      const buttonArrows = $(this.clsButtonArrow)
      buttonArrows.each((_index, e) => {
        if($(e).hasClass('slick-disabled')) {
          $(e).parents('.mod-testimonials-slide').find('.arrows:not(.slick-disabled)').focus()
        }
      })
    }
    clickArrow () {
      const $arrow = $(this.clsButtonArrow)
      $arrow.keydown((e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
          setTimeout(() => {
            $(e.target).removeClass('mouse')
          }, 500)
        }
      })
    }
    addSlick () {
      this.$this.find(this.clsListBox).on('init', (_event, _slick) => {
        this.addDataCy()
        this.addTabIndexItem()
        this.clickArrow()
      });
      this.$this.find(this.clsListBox).slick({
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        accessibility: false,
        prevArrow: '<button data-cy="arrow-prev" class="slick-prev arrows h1 text-primary-100"><span class="icomoon icon-chevron-left"></span><span class="sr-only">Prev slider testimonial</span></button>',
        nextArrow: '<button data-cy="arrow-next" class="slick-next arrows h1 text-primary-100"><span class="icomoon icon-chevron-right"></span><span class="sr-only">Next slider testimonial</span></button>',
        appendArrows: '.control-slide-testimonials',
        appendDots: '.control-dots-testimonials',
        infinite: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              infinite: false
            }
          },
          {
            breakpoint: 760,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }).on('afterChange', () => {
        this.addDataCy()
        this.addTabIndexItem()
        // this.changeFocusDisable()
      });
    }
  }
  new SlideTestimonial().init()
