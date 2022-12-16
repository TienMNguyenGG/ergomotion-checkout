
 export default class Menu {
   constructor () {
     this.this = '#main-menu'
     this.$this = $(this.this)
     this.elementItem = '.hamburger-menu, html, #main-menu, #header'
     this.$header = $('#header, #main-menu-mobile')
     this.li = this.$this.find('.main-menu-ul >li>a')
     this.liLevel1 = this.$this.find('.main-menu-ul >li')
     this.liLeve2 = this.$this.find('.main-menu-ul .main-menu-dropdown li>a')
     this.isopenmenu = 'is-open-menu'
     this.isopenmenuchild = 'open-menu-child'
     this.isopenchild = 'is-open-child'
     this.headerMBClass = '.header-mobile'
     this.hasClassChild = 'has-open-child'
     this.hasSub0Class = '.has-sub-0'
     this.wrapBackMenu = '.wrap-back-menu'
     this.mainMenuHeader = '.main-menu-header'
     this.dropdownMenu = '.dropdown-menu'
     this.activeDropdown = 'active-dropdown'
     this.mainMenuItem = '.main-menu-ul .menu-item'
     this.utilNavItem = '.util-nav-mobile .menu-item'
     this.liHasSub = 'li.has-sub'
     this.menuItem = '.menu-item'
     this.mainMenuUl = '.main-menu-ul'
     this.wrapMainMenu = '.wrap-main-menu'
     this.dropdownMenuFirst = '.main-menu-first .dropdown-menu'
     this.hasArrow = '.has-arrow'
     this.clsIsShowSerach = 'is-show-search'
     this.clsShowSearch = 'show-search'
     this.clsSearchInput = '.search__input'
     this.clsSearchInputMB = '#Search-In-Modal-MB'
     this.hasSubChild = '.has-sub > a'
     this.mainMenuFirst = '.main-menu-first'
     this.clsShowDropdown = 'show-dropdown'
     this.$html = 'html'
     this.enbleClick = true
   }
   init () {
     if (this.$this.length) {
       this.openMainMenu()
       this.clickArowOpenDropdownMenuLeve2()
       this.clickLiOpenDropdownMenuLeve2()
       this.clickBackMenu()
       this.clickIconMenu()
       this.eventStopPropagationDropdown()
       this.handleMainMenu()
       this.handleListIcon()
       this.handleSubmenu()
       this.handelEsc()
       this.handleHasDropMenu()
       this.handleSearchBox()
       this.keyUpSearch()
       this.calcLeftMenu()
       this.hoverMenuItem()
       this.hoverMenuItemTop()
       this.clickArowOpenDropdownMenuLeve1()
     }

    $(window).on('resize orientationchange', () => {
      // this.calcLeftMenu()
      this.removeCssInline()
      if($('html').hasClass('is-open-menu') && $(window).width() < 1200) {
        setTimeout(() => {
          this.calcHeightDropdown()
        }, 300)
      }
    })
   }
   removeCssInline() {
    if($(window).width() >= 1200) {
      $(this.wrapMainMenu ).css('height','')
      $(this.dropdownMenu).css({'left': '', 'top': ''})
      $('.show-dropdown').removeClass(this.clsShowDropdown)
    }
   }
  //  handle open box search
  lazyHeader() {
    const $img = this.$this.find('img.lazy')
    $img.each((_i,el) => {
      $(el).attr('src', $(el).attr('data-src')).removeClass('lazy').addClass('b-loaded').removeAttr('data-src')
    })
  }
  handleTabindex () {
    const isShow = $(`.${this.clsIsShowSerach}`)
    const btnOpenSearch = $('.header-search')
    if(isShow) {
      isShow.find('*').attr('tabindex', '-1')
      isShow.removeClass(this.clsIsShowSerach)
      btnOpenSearch.removeClass(this.clsIsShowSerach)
      $(this.$html).removeClass(this.clsShowSearch)
    }
  }
  keyUpSearch() {
    $('.search__input ').on('keyup',(e) => {
      if(e.keyCode === 27) {
        $(`.${this.clsIsShowSerach}`).removeClass(this.clsIsShowSerach)
        $('#main-menu .header-search').focus()
        $(`.${this.clsIsShowSerach}`).find('*').attr('tabindex', '-1')
      }
    })
  }
  handleSearchBox () {
    const btnOpenSearch = $('.header-search')
    const isShow = this.clsIsShowSerach
    const boxSearch = $('.search-modal__form')
    const closeSearch = $('.search_close')
    const inputSearch = $(this.clsSearchInput)
    btnOpenSearch.on('click', (e) => {
      const $elm = $(e.currentTarget)
      if ($elm.hasClass(isShow)) {
        $elm.removeClass(isShow)
        boxSearch.removeClass(isShow)
        $(this.$html).removeClass(this.clsShowSearch)
      } else {
        $elm.addClass(isShow)
        boxSearch.addClass(isShow)
        $(this.$html).addClass(this.clsShowSearch)
        if($(window).width() >= 1200) {
          setTimeout(() => {
            this.$this.find(`.${this.clsIsShowSerach}`).find(this.clsSearchInput).focus()
          }, 400)
        } else {
          $('.wrap-logo-icon > .is-show-search').find(this.clsSearchInputMB).addClass('mouse').focus()
          // $(this.mainMenuHeader).addClass('open-search-menu')
          $(this.mainMenuHeader).css('height', '')
          $('.is-open-menu').removeClass('is-open-menu')
          $('.show-dropdown').removeClass('show-dropdown')
        }
      }
    })
    boxSearch.on('submit', (e) => {
      if(!$(e.currentTarget).find(this.clsSearchInput).val()){
        e.preventDefault()
      }
    })
    btnOpenSearch.keydown((e) => {
      if (e.keyCode === 13) {
        boxSearch.find('*').removeAttr('tabindex')
        setTimeout(() => {
          inputSearch.focus()
        }, 100)
      }
      
      if (e.keyCode === 32) {
        boxSearch.find('*').removeAttr('tabindex')
      }
    })
    closeSearch.keydown((e) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleTabindex()
        setTimeout(() => {
          btnOpenSearch.focus()
        }, 100)
      }
    })
    closeSearch.on('click', () => {
      $('.'+isShow).removeClass(isShow)
      this.handleTabindex()
    })

    $(window).on('click', (event) => {
      if (!$(event.target).closest(boxSearch).length && !$(event.target).closest(btnOpenSearch).length  && $(`.${this.clsIsShowSerach}`).length > 0) {
          $(`.${this.clsIsShowSerach}`).removeClass(isShow)
      }
    });
  }

  /* micro function */
  microOpenCloseLevel1(currentElement, openClass, isLiLv1 = false) {
    const ele = currentElement.currentTarget
    const eleParent = $(ele).parent()
    if ($(window).width() < 1200) {
      if (eleParent.find('ul').length && !eleParent.hasClass(openClass)) {
        this.liLevel1.removeClass(openClass)
        eleParent.addClass(openClass)
        $(this.headerMBClass).addClass(this.hasClassChild)
        if (isLiLv1) {
          return false
        }
      } else {
        eleParent.removeClass(openClass)
        $(this.headerMBClass).removeClass(this.hasClassChild)
      }
    }
    return true
  }
  /* end micro */

   openMainMenu () {
     this.$header.on('click', '.hamburger-menu', (e) => {
      const ele = e.currentTarget
      this.lazyHeader()
       if ($(ele).hasClass(this.isopenmenu)) {
         $(this.elementItem).removeClass(this.isopenmenu)
       } else {
         $(this.elementItem).addClass(this.isopenmenu)
       }
     })
   }

   clickArowOpenDropdownMenuLeve1 () {
    this.liLevel1.on('click', '.arrows-lv1', (e) => {
      if($(window).outerWidth() < 1200) {
        const ele = e.currentTarget
        $(ele).parents('li').addClass(this.isopenchild)
        $(this.wrapBackMenu).removeClass('hidden')
        $(this.wrapMainMenu).css({'height': $(ele).parents(this.menuItem).find(this.dropdownMenu).outerHeight()});
        $(ele).parents(this.menuItem).find(this.dropdownMenu).css({'top': -($(ele).parents(this.menuItem).offset().top - $(this.mainMenuUl).offset().top)});
      }
    })

    $(this.mainMenuItem).on('click', (e) => {
      if($(window).outerWidth() < 1200) {
        const ele = e.currentTarget
        $(ele).addClass(this.isopenchild)
        $(this.wrapBackMenu).removeClass('hidden')
        $(this.wrapMainMenu).css({'height': $(ele).find(this.dropdownMenu).outerHeight()});
        $(ele).find(this.dropdownMenu).css({'top': -($(ele).offset().top - $(this.mainMenuUl).offset().top)});
      }
    })

    $(this.utilNavItem).on('click', (e) => {
      if($(window).outerWidth() < 1200) {
        const ele = e.currentTarget
        $(ele).toggleClass(this.isopenchild)
      }
    })
   }

   clickArowOpenDropdownMenuLeve2 () {
     this.$this.find(this.mainMenuUl).on('click', '.arrows-lv2', (e) => {
       const ele = e.currentTarget
       const eleParent = $(ele).parent()
       if ($(window).width() < 1025) {
         if (eleParent.find('.menu-child').length && !eleParent.hasClass(this.isopenmenuchild)) {
           eleParent.addClass(this.isopenmenuchild)
         } else {
           eleParent.removeClass(this.isopenmenuchild)
         }
       }
     })
   }

   clickLiOpenDropdownMenuLeve2 () {
     this.liLeve2.on('click', (e) => {
       const ele = e.currentTarget
       const eleParent = $(ele).parent()
       if ($(window).width() < 1025 && eleParent.find('ul').length && !eleParent.hasClass(this.isopenmenuchild)) {
         this.li.removeClass(this.isopenmenuchild)
         eleParent.addClass(this.isopenmenuchild)
         return false
       }
       return true
     })
   }

   clickBackMenu() {
    $('.back-menu').on('click', (e) => {
      const ele = e.currentTarget
      $(this.wrapBackMenu).addClass('hidden')
      $(this.mainMenuHeader).removeClass(this.isopenchild)
      $(ele).parents('#main-menu').find('.is-open-child.menu-item').removeClass(this.isopenchild)
      $(this.mainMenuUl).css({'height' : ''});
      $(this.mainMenuHeader).css('overflow', '')
      $(this.wrapMainMenu).css({'height' : ''});
    })
   }

   calcHeightDropdown() {
    const $header = $('.header')
    const $mainNav = $('.main-nav-dropdown')
    const $wrapLogo = $('.header-logo-wrapper')
    const $announ = $('.announcement-bar')
    if ($header.hasClass('pin-header')) {
      const calcWrapLogo = $wrapLogo.innerHeight() - 7;
      $(this.mainMenuHeader).height($(window).outerHeight() - $wrapLogo.innerHeight() - $announ.innerHeight() + 2);
      $mainNav.css( { height: `calc(100vh - ${calcWrapLogo}px)` } );
    } else {
      $(this.mainMenuHeader).height($(window).outerHeight() - $wrapLogo.innerHeight() - $announ.innerHeight() + 2);
      $mainNav.height($(window).height() - $wrapLogo.innerHeight() - $announ.innerHeight() + 2);
      window.heightOpenMenu = $(window).height() - $wrapLogo.innerHeight() - $announ.innerHeight() + 2
    }
    setTimeout(() => {
      this.enbleClick = true
    }, 350)
   }

   clickIconMenu() {
    const $html = $(this.$html)
    const $btn = $('.btn-menu')
    const $wrapIcon = $('.wrap-icon')
    $btn.on('click', (_e) => {
      if(this.enbleClick === true) {
        this.enbleClick = false
        $wrapIcon.toggleClass(this.clsShowDropdown)
        if(!($wrapIcon.hasClass(this.clsShowDropdown))) {
          $(this.mainMenuHeader).removeClass('open-search-menu')
          $(this.mainMenuHeader).css({'height' : ''});
          this.enbleClick = true
        } else {
          setTimeout(() => {
            this.calcHeightDropdown()
          }, 300)
        }
        $html.toggleClass('is-open-menu')
      }
    })
   }
   calcLeftMenu() {
    // $(this.mainMenuHeader).css('height', '')
    const $mainFirst = $('.main-menu-first .menu-item')
    if($(window).outerWidth() > 1800) {
      $mainFirst.on('mouseover', () => {
        $(this.dropdownMenuFirst).css('left', - 52);
      })
    } else {
      $mainFirst.each((_index, e) => {
        $(e).find('.dropdown-menu').css('left', -($(e).offset().left - $(this.mainMenuFirst).offset().left + 12))
      })
      // $mainFirst.on('mouseover', (e) => {
      //   const ele = e.currentTarget
      //   $(this.dropdownMenuFirst).css('left', -($(ele).offset().left - $(this.mainMenuFirst).offset().left + 12));
      // })
    }
  }

  changeAria(ele, isExpand = true) {
    if (isExpand) {
      $(ele).each((_i, el) => {
        $(el).find('>a').attr('aria-expanded', true)
      })
    } else {
      $(ele).each((_i, el) => {
        $(el).find('>a').attr('aria-expanded', false)
      })
    }
  }

  actionClickNav(ele) {
    if(!($(ele).find(this.dropdownMenu).hasClass(this.activeDropdown))) {
      $(ele).find(this.dropdownMenu).css('display', 'block')
      $(ele).find(this.dropdownMenu).addClass(this.activeDropdown)
    } else {
      $(ele).find(this.dropdownMenu).css('display', 'none')
      $(ele).find(this.dropdownMenu).removeClass(this.activeDropdown)
    }
  }

  hoverMenuItem() {
    /* menu-main + menu-right */
    let timeout
    let timeHeader
    $(this.mainMenuItem).on('mouseenter', (e) => {
      if($(window).outerWidth() >= 1200) {
        const ele = e.currentTarget
        clearTimeout(timeout)
        clearTimeout(timeHeader)
        timeout = setTimeout(() => {
          $('.is-open-child').removeClass(this.isopenchild)
          $(ele).find(this.dropdownMenu).addClass(this.activeDropdown)
          $(ele).addClass(this.isopenchild)
          this.changeAria($(ele), true)
          this.lazyHeader()
        }, 200)
     
      }
    })
    $(this.mainMenuItem).on('mouseleave', (e) => {
      if($(window).outerWidth() >= 1200) {
        clearTimeout(timeout)
        clearTimeout(timeHeader)
        const ele = e.currentTarget
        timeout = setTimeout(() => {
          $(ele).find(this.dropdownMenu).removeClass(this.activeDropdown)
          $(ele).find(this.dropdownMenu).css('display', '')
          $(ele).removeClass(this.isopenchild)
          this.changeAria($(ele), false)
          this.lazyHeader()
        }, 200)
        timeHeader = setTimeout(() => {
          $('.is-open-child').removeClass(this.isopenchild)
        }, 600)
      }
    })
    $(this.mainMenuItem).on('click', (e) => {
      if($(window).outerWidth() >= 1200) {
        const ele = e.currentTarget
        this.actionClickNav(ele)
        this.lazyHeader()
        if ($(ele).hasClass(this.isopenchild)) {
          $(ele).removeClass(this.isopenchild)
          this.changeAria($(ele), false)
        } else {
          $(ele).addClass(this.isopenchild)
          this.changeAria($(ele), true)
        }
      }
    })
  }
  hoverMenuItemTop() {
    /* menu-top */
    $(this.utilNavItem).on('mouseenter', (e) => {
      if($(window).outerWidth() >= 1200) {
        const ele = e.currentTarget
        $(ele).find(this.dropdownMenu).addClass(this.activeDropdown)
        $(ele).addClass(this.isopenchild)
        this.changeAria($(ele), true)
      }
    })
    $(this.utilNavItem).on('mouseleave', (e) => {
      if($(window).outerWidth() >= 1200) {
        const ele = e.currentTarget
        $(ele).find(this.dropdownMenu).removeClass(this.activeDropdown)
        $(ele).find(this.dropdownMenu).css('display', '')
        $(ele).removeClass(this.isopenchild)
        this.changeAria($(ele), false)
      }
    })

    $(this.utilNavItem).on('click', (e) => {
      if($(window).outerWidth() >= 1200) {
        const ele = e.currentTarget
        this.actionClickNav(ele)
        if ($(ele).hasClass(this.isopenchild)) {
          $(ele).removeClass(this.isopenchild)
          this.changeAria($(ele), false)
        } else {
          $(ele).addClass(this.isopenchild)
          this.changeAria($(ele), true)
        }
      }
    })
  }
  handleArrowLeftMainMenu($li) {
    if ($li.prev().length) {
      $li.prev().find('>a').focus()
    }
  }

  handleArrowRightMainMenu($li) {
    if ($li.next().length) {
      $li.next().find('>a').focus()
    }
  }

  handleArrowLastMainMenu($li) {
    if ($li.prevAll().length) {
      $li.prevAll().last().find('>a').focus()
    }
  }

  handleArrowFirstMainMenu($li) {
    if ($li.nextAll().length) {
      $li.nextAll().last().find('>a').focus()
    }
  }

  handleMainMenu() {
    this.$this.find(this.hasSubChild).on('keydown', (e) => {
      const code = e.keyCode || e.which
      const $li = $(e.currentTarget).parents('li')
      switch (code) {
        case 37:
          e.preventDefault()
          this.handleArrowLeftMainMenu($li);
          break;
        case 39:
          e.preventDefault()
          this.handleArrowRightMainMenu($li);
          break;
        case 36:
          e.preventDefault()
          this.handleArrowLastMainMenu($li)
          break;
        case 35:
          e.preventDefault()
          this.handleArrowFirstMainMenu($li)
          break;
        case 13:
        case 32:
          e.preventDefault()
          if($(window).outerWidth() > 1800) {
            $(this.dropdownMenuFirst).css('left', - 52);
          } else {
            $(this.dropdownMenuFirst).css('left', -($li.offset().left - $(this.mainMenuFirst).offset().left + 12));
          }
          if ($li.hasClass(this.isopenchild)) {
            $li.removeClass(this.isopenchild)
            $li.find(this.dropdownMenu).css('display', '')
            this.changeAria($li, false)
          } else {
            $li.addClass(this.isopenchild)
            $li.find(this.dropdownMenu).css('display', 'block')
            this.changeAria($li, true)
          }
          break;
        default: break;
      }
    })
    this.$this.find(this.hasSubChild).on('keyup', (e) => {
      const code = e.keyCode || e.which
      switch (code) {
        case 9:
         this.handleTabindex()
          break;
        default: break;
      }
    })
  }

  handleListIcon() {
    this.$this.find('.wrap-icon-dt > a, .wrap-icon-dt > button').on('keydown', (e) => {
      const code = e.keyCode || e.which
      const $ele = $(e.currentTarget);
      switch (code) {
        case 37:
          e.preventDefault()
          if ($ele.prev().length) {
            $ele.prev().focus()
          }
          break;
        case 39:
          e.preventDefault()
          if ($ele.next().length) {
            $ele.next().focus()
          }
          break;
        case 36:
          e.preventDefault()
          if ($ele.prevAll().length) {
            $ele.parents('.wrap-icon-dt').find('> a').first().focus()
          }
          break;
        case 35:
          e.preventDefault()
          if ($ele.nextAll().length) {
            $ele.parents('.wrap-icon-dt').find('> a').last().focus()
          }
          break;
        default: break;
      }
    })
  }

  handleSubmenu() {
    this.$this.find(this.dropdownMenu).on('keydown', 'li > a', (e) => {
      const code = e.keyCode || e.which
      const $taindex0 = $(e.currentTarget).parents(this.this).find('li a')
      const index = $taindex0.index(e.currentTarget)
      const $taLast = $(e.currentTarget).parents(this.this).find('li a').last()
      const indexLast = $taindex0.index($taLast)
      const $taCurrent = $(e.currentTarget).parents(this.dropdownMenu).find('li a')
      const indexCurrent = $taCurrent.index(e.currentTarget)
      switch (code) {
        case 37:
        case 38:
          {
            this.handlePrevSub(e, indexCurrent, $taCurrent)
          }
          break;
        case 39:
        case 40:
          {
            this.handleNextSub(e, indexCurrent, $taCurrent)
          }
          break;
        case 36:
          e.preventDefault()
          $taCurrent.eq(0).focus()
          break;
        case 35:
          e.preventDefault()
          $taCurrent.eq($taCurrent.length - 1).focus()
          break;
        case 9:
         this.handleTab(e, index, indexLast)
          break;
        default: break;
      }
    })
  }
  handlePrevSub(e, indexCurrent, $taCurrent) {
    e.preventDefault()
    const indexPrev = (indexCurrent - 1 >= 0) ? (indexCurrent - 1) : $taCurrent.length - 1
    $taCurrent.eq(indexPrev).focus()
  }
  handleNextSub(e, indexCurrent, $taCurrent) {
    e.preventDefault()
    const indexNext = (indexCurrent + 1 < $taCurrent.length) ? (indexCurrent + 1) : 0
    $taCurrent.eq(indexNext).focus()
  }
  handleTab(e, index, indexLast) {
    if (!(e.shiftKey) && index === indexLast) {
      this.closeAllSubmenu()
    }
  }
  handleHasDropMenu() {
    this.$this.find(this.hasSubChild).on('keydown', (e) => {
      const code = e.keyCode || e.which
      const $li = $(e.currentTarget).parents(this.liHasSub)
      if (code === 40) {
        e.preventDefault()
        if($(window).outerWidth() > 1800) {
          $(this.dropdownMenuFirst).css('left', - 52);
        } else {
          $(this.dropdownMenuFirst).css('left', -($li.offset().left - $(this.mainMenuFirst).offset().left + 12));
        }
        $li.addClass(this.isopenchild)
        $li.find(this.dropdownMenu).css('display', 'block')
        this.changeAria($li, true)
      }
    })
  }

  closeAllSubmenu() {
    $(this.menuItem).removeClass(this.isopenchild)
    $(this.menuItem).find(this.dropdownMenu).css('display', '')
  }

  handelEsc() {
    $(window).on('keydown', e => {
      const code = e.keyCode || e.which
      if (code === 27) {
        e.preventDefault()
        this.closeAllSubmenu()
        const $target = $(e.target)
        if ($target.closest('.menu-lv-1').length) {
          $target.closest('.menu-lv-1').find('>a').focus()
        }
      }
    })
  }

  eventStopPropagationDropdown() {
    $(this.dropdownMenu).on('click', (e) => {
      e.stopPropagation()
    })
  }
}

 new Menu().init()
