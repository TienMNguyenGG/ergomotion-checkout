export default class SelectC8 {
  constructor () {
    this.$callSelectC8 = $('.select-c8')
    this.clscallSelectC8 = '.select-c8'
    this.$callSelectC8Option = '.select-c8 option'
    this.formSelectC8 = '.form-select-c8'
    this.dropdownSelectC8 = 'dropdown-select-c8'
    this.dropdownMenu = '.dropdown-select'
    this.arrow = '<span class="caret-c8 icomoon icon-chevron-down absolute z-1 right-9 top-7"></span>'
    this.dropdownOpen = `.dropdown-select-c8.show, ${this.dropdownMenu}.show`
    this.title = ''
    this.ariaSelected= 'aria-selected'
    this.ariaExpanded= 'aria-expanded'
    this.ulListBox= 'ul[role="listbox"]'
    this.dropToggle= '.dropdown-toggle'
    this.hidden = 'hidden'
    this.show = 'show'
    this.liSelected =  'li.selected'
    this.textSelected = 'selected'
    this.ariaActivedescendant = 'aria-activedescendant'
    this.dropchild = '.child-dropdown'
    this.scrollMinibar = ''
    this.clsDropdownSelectC8 = '.dropdown-select-c8'
    this.clsListInline = '.dropdown-select-c8.show .list-inline'
    this.clsFilterOption = '.dropdown-toggle .filter-option'
  }
  init () {
    // if (this.$callSelectC8.length) {
      this.renderSelectToDropdown()
      this.clickToggle()
      this.clickSelect()
      this.changeSelectC8()
      this.hoverLiRemoveClass()
      this.clickOutClose()
      this.keyOption()
      this.roleSelectDropdownCloseAction()
      this.searchChareaterSelectbox()
    // }
    window.renderSelectToDropdown = this.renderSelectToDropdown.bind(this)
  }
  renderHtml (element, textTitle) {
    const randomId = Math.floor(Math.random() * 10e9)
    let idSelect = element.id || randomId
    idSelect = `id-${idSelect}`
    const $label = $(element).prevAll('label')
    let ariaLabel = ''
    if ($label.length) {
      if ($label.get(0).id) {
        ariaLabel = `${$label.get(0).id}`
      } else {
        ariaLabel = `id-${randomId}-label`
        $label.attr('id', ariaLabel)
      }
    }

    const eleParent = $(element).parent()
    eleParent.find('.dropdown').remove()
    eleParent.after()
      .append(`<div class='dropdown shadow-none z-2 rounded-0 border-0 no-bg h-auto p-0 relative  ${this.dropdownSelectC8}'>
          <div class="child-dropdown" data-toggle='dropdown'aria-haspopup='listbox' aria-expanded="false"  role="combobox" aria-label="${$label.text()}" aria-controls="${idSelect}"  ${this.ariaActivedescendant}>
          <a class='dropdown-toggle form-control shadow-none no-underline relative text-blue-200 border-blue-200 w-full font-bold px-10 py-5 flex items-center text-decoration box-shadow' href='javascript:;'>
          <span class="filter-option d-block text-truncate overflow-hidden text-ellipsis whitespace-nowrap pr-10 leading-none text-base">${textTitle}</span>${this.arrow}</a></div>
          <div class='dropdown-select dropdown-menu-c8 overflow-hidden absolute top-full left-0 right-0 hidden bg-white text-reset w-full rounded-0 p-0 m-0 '>
          <ul class="list-inline m-0 pl-0 list-none" role="listbox" id="${idSelect}" aria-labelledby="${ariaLabel}"></ul>
          </div>
        </div>`)
    $(element).each((_idx, elm) => {
      let tabIndex = 1
      let disabled = ''
      let hidenText = ''
      $(element).find('option', elm).each((id, el) => {
        if ($(el).prop('disabled')) {
          disabled = 'disabled'
          hidenText = `<span class="sr-only">&nbsp; disabled</span>`
        }
        eleParent.find('.dropdown ul').append(`<li ${disabled} class="${disabled} m-0 p-0 font-bold text-base leading-none relative" role="option" aria-selected="false" id="combo-${idSelect}-${id}">
        <a href="javascript:;" tabindex="-1" ${disabled} class="block width-full px-11 py-8  border-rgbaBlack hover:bg-gray-400 no-underline ${disabled}">${el.text} ${hidenText}</a>
        </li>`)
        tabIndex++
        disabled = ''
        hidenText = ''
      })
    })
  }
  titleUndefined (element) {
    this.title = $(element).data('title')
    if (typeof title === 'undefined') {
      let indexActive = 0
      $(element).children('option').each((_indexChild, elementChild) => {
        if (typeof $(elementChild).attr('selected') !== 'undefined') {
          this.title = $(elementChild).text()
          indexActive = $(elementChild).index()
        }
      })
      if (indexActive === 0) {
        this.title = $(element).find('option').first().attr('selected', 'selected').text()
      }
    }
    return this.title
  }
  renderSelectToDropdown () {
    $(this.clscallSelectC8).each((_index, element) => {
      if (!$(element).hasClass('select-done')) {
        this.title = $(element).data('title')
        this.titleUndefined(element)
        this.renderHtml(element, this.title)
        const active = $(element).parents(this.formSelectC8).find('.dropdown-select-c8 .filter-option').text()
        $(element).parents(this.formSelectC8).find(`${this.dropdownMenu} li`).each((_id, el) => {
          if (active.trim()  === $(el).find('a').text().trim() ) {
            $(el).addClass('selected').attr(this.ariaSelected, true)
          }
        })
        $(element).addClass('select-done')
        this.title = ''
      }
    })
  }
  clickToggle () {
    $(document).on('click', this.dropToggle, (e) => {
      const $dropdownRemove = $(`${this.dropdownMenu}, .dropdown-select-c8`)
      const ele = e.currentTarget
      const eleParent = $(ele).parents(this.clsDropdownSelectC8)
      const eleParents = eleParent.find(this.dropdownMenu)
      $(this.formSelectC8).removeClass('z-30')
      if (eleParent.hasClass(this.show)) {
        $dropdownRemove.removeClass(this.show)
        eleParent.removeClass(this.show)
        eleParents.addClass(this.hidden)
        $(ele).parent().attr(this.ariaExpanded, false)
        $(ele).parents(this.formSelectC8).removeClass('z-30')
      } else {
        $dropdownRemove.removeClass(this.show)
        $(this.dropdownMenu).addClass(this.hidden)
        eleParent.addClass(this.show)
        eleParents.removeClass(this.hidden)
        $(ele).parent().attr(this.ariaExpanded, true)
        $(ele).parents(this.formSelectC8).addClass('z-30')
        if($(window).height() - ($(ele).parents(this.formSelectC8).offset().top - $(window).scrollTop() + 50) < 300) {
          $(ele).parents(this.formSelectC8).addClass('open-top')
        } else {
          $(ele).parents(this.formSelectC8).removeClass('open-top')
        }
        if(this.scrollMinibar !== '') {
          this.scrollMinibar.destroy()
        }
        if($(this.clsListInline).height() >= 200 && typeof window.MiniBar != 'undefined') {
          $(this.clsListInline).css('height','200px')
          if($(window).width() > 1024 ) {
            this.scrollMinibar = new MiniBar(this.clsListInline,{
              barType: 'default',
              minBarSize: 8,
              alwaysShowBars: false,
              scrollX: false,
              scrollY: true
            });
          }
        }
      }
      return false
    })
  }
  multiSelect (ele, index) {
    const dropParent = $(ele).parents(this.formSelectC8)
    const selected = 'selected'
    let string = ''
    if ($(ele).parent().hasClass(selected)) {
      $(ele).parent().removeClass(selected).addClass('not-hover')
      $(ele).parents(this.formSelectC8).find(this.$callSelectC8Option).eq(index).removeAttr(selected)
      if ($(ele).parents('ul').find('li.selected:not(.disabled)').length < 1) {
        string = $(ele).parents('ul').find('li.disabled a').text().trim() + ', '
      }
    } else {
      $(ele).parent().addClass(selected).removeClass('not-hover')
    }

    $(ele).parents('ul').find('li.selected:not(.disabled)').each((_indexLI, el) => {
      const value = $(el).find('a').text().trim()
      string += value + ', '
    })

    if (!$(ele).parents('.' + this.dropdownSelectC8).hasClass('no-trigger-active')) {
      const text = string.slice(0, string.length - 2)
      $(ele).parents('.' + this.dropdownSelectC8).find(this.clsFilterOption).text(text).parent().parent().attr('aria-label',text)
    }
    dropParent.find(this.$callSelectC8Option).prop(selected, false)
    setTimeout(() => {
      $.each(string.split(', '), (_i, e) => {
        dropParent.find(`.select-c8 option[value="${e}"]`).attr(selected, selected)
      })
      dropParent.find(this.$callSelectC8).change()
    }, 100)
    return false
  }
  singleSelect (ele, index) {
    const text = $(ele).text()
    if( $(ele).parent().hasClass('disabled')){
     return false
    }
    if (!$(ele).parents('.' + this.dropdownSelectC8).hasClass('no-trigger-active')) {
      $(ele).parents('.' + this.dropdownSelectC8).find(this.clsFilterOption).text(text).parent().parent().attr('aria-label',text)
    }
    $(ele).parents('ul').find('li').removeClass('selected').attr(this.ariaSelected, false)
    $(ele).parent().addClass('selected').attr(this.ariaSelected, true)
    const dropParent = $(ele).parents(this.formSelectC8)
    setTimeout(() => {
      dropParent.find(this.$callSelectC8Option).removeAttr('selected').eq(index).attr('selected', 'selected').prop('selected', true)
      const val = dropParent.find(this.$callSelectC8Option).prop('selected', true).eq(index).val()
      dropParent.find(this.$callSelectC8).val(val).change()
      $(ele).parents(`${this.dropdownMenu}, .dropdown-select-c8`).removeClass(this.show)
      $(this.formSelectC8).removeClass('z-30')
      $(ele).parents(this.dropdownMenu).addClass(this.hidden)
      dropParent.find(this.dropchild).attr(this.ariaActivedescendant, $(ele).parents('ul').find(this.liSelected).attr('id'))
    }, 100)
    this.triggerChecbox(ele,index)
    return true
  }
  triggerChecbox (ele,index) {
    if($(ele).parents('.trigger-checbox').length > 0 ) {
      const $checkbox = $(ele).parents('.trigger-checbox').find('.product-form__input input')
      $checkbox.each((i,el) => {
        if(i === index) {
          $(el).prop('checked', true).attr('checked','checked')
        } else {
          $(el).prop('checked', false).removeAttr('checked')
        }
      })
      window.onVariantChange()
    }
  }
  clickSelect () {
    $(document).on('click', '.dropdown-select-c8 li a', (e) => {
      const ele = e.currentTarget
      const index = $(ele).parents('li').index()
      $('.' + this.dropdownSelectC8).removeClass('focus')

      $(ele).parents(this.formSelectC8).addClass('active-focus')
      $(ele).parents('.form-control').find(this.dropToggle).addClass('active')
      $(ele).parents('ul').find('li').removeClass('focus')
      if ($(ele).parents(this.formSelectC8).hasClass('multiselect')) {
        this.multiSelect(ele, index)
      } else {
        this.singleSelect(ele, index)
      }
    })
  }
  hoverLiRemoveClass () {
    $('.' + this.dropdownSelectC8).find('li').on('hover', () => {
      $('.' + this.dropdownSelectC8).find('li').removeClass('not-hover').find('a').blur()
    })
  }
  changeSelectC8 () {
    this.$callSelectC8.change(() => {
      this.$callSelectC8.trigger('changeSelect')
    })
  }
  clickOutClose () {
    $(document).click((event) => {
      if (!$(event.target).closest('.dropdown-select-c8.show, .dropdown-select.show, .dropdown-select-c8 *').length) {
        $(this.dropdownOpen).find(this.dropToggle).parent().attr(this.ariaExpanded, false)
        $(this.dropdownOpen).removeClass(this.show)
        $(this.dropdownMenu).addClass(this.hidden)
        $(this.formSelectC8).removeClass('z-30')
      }
    })
  }
  keyOption () {
    $(document).keyup((e) => {
      if (e.keyCode === 27 && $('.dropdown-select-c8.show').length) {
        $(this.dropdownOpen).find(this.dropToggle).parent().attr(this.ariaExpanded, false)
        $(this.dropdownOpen).removeClass(this.show)
        $(this.dropdownMenu).addClass(this.hidden)
        $(this.formSelectC8).removeClass('z-30')
      }
      window.addEventListener('keydown', (keydownEvent) => {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1 && $('.dropdown-select-c8.show').length) {
          keydownEvent.preventDefault()
        }
      }, false)
    })
  }

  isElementInView(element) {
    const bounding = element.getBoundingClientRect();
    const $select = $('.dropdown-menu.dropdown-menu-c8')
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
      $select.innerHeight() &&
      bounding.right <=
      $select.innerWidth()
    );
  }

  scrollToScreen($liCurrent) {
    if (!this.isElementInView($liCurrent[0])) {
      $liCurrent[0].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }

  openDropDown($ele) {
    const $dropdownRemove = $('.dropdown-select, .dropdown-select-c8')
    const eleParent = $ele.parents(this.clsDropdownSelectC8)
    const eleParents = eleParent.find(this.dropdownMenu)
    $dropdownRemove.removeClass(this.show)
    $(this.formSelectC8).removeClass('z-30')
    eleParent.addClass(this.show)
    eleParents.removeClass(this.hidden)
    $ele.parents(this.clsDropdownSelectC8).attr(this.ariaExpanded, 'true')

  }

  selectedNext(indexNext, $ele) {
    const $liSelected = $ele.parents(this.clsDropdownSelectC8).find(this.liSelected);
    const $taindex0 = $ele.parents('.'+this.dropdownSelectC8).find('li')
    $liSelected.removeClass('selected');
    $taindex0.eq(indexNext).addClass('selected');
    $ele.parents(this.dropchild).attr(this.ariaActivedescendant,  $taindex0.eq(indexNext).attr('id'))
    this.scrollToScreen($taindex0.eq(indexNext));
  }

  selectedPrev(indexPrev, $ele) {
    const $liSelected = $ele.parents(this.clsDropdownSelectC8).find(this.liSelected);
    const $taindex0 = $ele.parents('.'+this.dropdownSelectC8).find('li')
    $liSelected.removeClass('selected');
    $taindex0.eq(indexPrev).addClass('selected');
    $ele.parents(this.dropchild).attr(this.ariaActivedescendant, $taindex0.eq(indexPrev).attr('id'))
    this.scrollToScreen($taindex0.eq(indexPrev));
  }

  handleTabSelectDropdown(eleParent, eleParents) {
    if ($('.'+this.dropdownSelectC8).hasClass(this.show)) {
      eleParent.removeClass(this.show)
      eleParents.addClass(this.hidden)
    }
  }

  handlePgDnSelectDropdown(index, indexLiLast, $taindex0, $ele) {
    if ($('.'+this.dropdownSelectC8).hasClass(this.show)) {
      const indexRemain = indexLiLast - index;
      if(index !== indexLiLast && indexRemain >= 10) {
        const indexNext = (index + 10 < $taindex0.length) ? (index + 10) : 0;
        this.selectedNext(indexNext, $ele);
      }
      else {
        const indexNext = (index + indexRemain < $taindex0.length) ? (index + indexRemain) : 0;
        this.selectedNext(indexNext, $ele);
      }
    }
  }

  handlePgUpSelectDropdown(index, indexLiFirst, $taindex0, $ele) {
    if ($('.'+this.dropdownSelectC8).hasClass(this.show)) {
      const indexRemain = index - indexLiFirst;
      if(index !== indexLiFirst && indexRemain >= 10) {
        const indexPrev = (index - 10 >= 0) ? (index - 10) : $taindex0.length - 10;
        this.selectedPrev(indexPrev, $ele);
      }
      else {
        const indexPrev = (index - indexRemain >= 0) ? (index - indexRemain) : $taindex0.length - indexRemain;
        this.selectedPrev(indexPrev, $ele);
      }
    }
  }

  handleSpaceAndEnterDropdown(eleParent, eleParents, $dropdownRemove, $ele) {
    const $textSelected = $ele.parents(this.clsDropdownSelectC8).find('li.selected a');
    if (eleParent.hasClass(this.show)) {
      $($textSelected).trigger('click');
      eleParent.removeClass(this.show)
      eleParents.addClass(this.hidden)
      $ele.parents(this.clsDropdownSelectC8).attr(this.ariaExpanded, false)
      $(this.formSelectC8).removeClass('z-30')
    } else {
      $dropdownRemove.removeClass(this.show)
      eleParent.addClass(this.show)
      eleParents.removeClass(this.hidden)
      $ele.parents(this.clsDropdownSelectC8).attr(this.ariaExpanded, true)
      $(this.formSelectC8).addClass('z-30')
    }
    $ele.parents(this.clsDropdownSelectC8).find(this.clsFilterOption).text($ele.parents(this.clsDropdownSelectC8).find('li.selected a').text())
  }

  handleArrowUpDropdown(index, indexLiFirst, $taindex0, $ele) {
    if ($('.'+this.dropdownSelectC8).hasClass(this.show) && index !== indexLiFirst) {
      const indexPrev = (index - 1 >= 0) ? (index - 1) : $taindex0.length - 1;
      this.selectedPrev(indexPrev, $ele);
    }
    this.openDropDown($ele);
  }

  handleArrowDownDropdown(index, indexLiLast, $taindex0, $ele) {
    if ($('.'+this.dropdownSelectC8).hasClass(this.show) && index !== indexLiLast) {
      const indexNext = (index + 1 < $taindex0.length) ? (index + 1) : 0;
      this.selectedNext(indexNext, $ele);
    }
    this.openDropDown($ele);
  }
  handleHomeSelectDropdown($liSelected, $liFirst, $taindex0, indexLiFirst, $ele) {
    this.openDropDown($ele);
    $liSelected.removeClass('selected');
    $liFirst.parents(this.clsDropdownSelectC8).addClass('selected')
    this.scrollToScreen($taindex0.eq(indexLiFirst));
  }
  handleEndSelectDropdown($liSelected, $liLast, $taindex0, indexLiLast, $ele) {
    this.openDropDown($ele);
    $liSelected.removeClass('selected');
    $liLast.parents(this.clsDropdownSelectC8).addClass('selected')
    this.scrollToScreen($taindex0.eq(indexLiLast));
  }
  roleSelectDropdownCloseAction() {
    $(document).on('keydown', '[role="combobox"] .dropdown-toggle', (e) => {
      const code = e.keyCode
      const ele = e.currentTarget
      const $liFirst = $(ele).parents(this.clsDropdownSelectC8).find('li:first a')
      const $liLast = $(ele).parents(this.clsDropdownSelectC8).find('li:last a')
      const $liSelected = $(ele).parents(this.clsDropdownSelectC8).find(this.liSelected);
      const $taindex0 = $(ele).parents('.'+this.dropdownSelectC8).find('li')
      const index = $taindex0.index($liSelected)
      const indexLiFirst = $taindex0.index($(ele).parents(this.clsDropdownSelectC8).find('li:first'))
      const indexLiLast = $taindex0.index($(ele).parents(this.clsDropdownSelectC8).find('li:last'))
      const $dropdownRemove = $('.dropdown-select, .dropdown-select-c8')
      const eleParent = $(ele).parents(this.clsDropdownSelectC8)
      const eleParents = eleParent.find(this.dropdownMenu)
      switch (code) {
        case 9:
          this.handleTabSelectDropdown(eleParent, eleParents);
          break;
        case 34:
          this.handlePgDnSelectDropdown(index, indexLiLast, $taindex0, $(ele));
          break;
        case 33:
          this.handlePgUpSelectDropdown(index, indexLiFirst, $taindex0, $(ele));
          break;
        case 13:
        case 32:
          e.preventDefault();
          this.handleSpaceAndEnterDropdown(eleParent, eleParents, $dropdownRemove, $(ele));
          break;
        case 38:
          e.preventDefault()
          this.handleArrowUpDropdown(index, indexLiFirst, $taindex0, $(ele));
          break;
        case 40:
          e.preventDefault()
          this.handleArrowDownDropdown(index, indexLiLast, $taindex0, $(ele));
          break;
        case 36:
          e.preventDefault()
          this.handleHomeSelectDropdown($liSelected, $liFirst, $taindex0, indexLiFirst, $(ele));
          break;
        case 35:
          e.preventDefault()
          this.handleEndSelectDropdown($liSelected, $liLast, $taindex0, indexLiLast, $(ele));
          break;
        default: break;
      }
    });
  }
  searchChareaterSelectbox() {
    $(document).on('keydown', this.clsDropdownSelectC8, (ev) => {
      const $target = $(ev.currentTarget)
      const $parent = $target.parents('.'+this.dropdownSelectC8)
      const $listbox = $parent.find('[role="listbox"]')
      const $listOptions = $parent.find('[role="option"]').find('a')
      const code = ev.keyCode || ev.which
      const char = ev.key
      const options = []
      let searchOptions = []
      let indexGoto = -1
      let searchString = this.getSearchString(char)
      const indexActive = $parent.find(`.${this.textSelected}`).index() + 1
      if ((code >64 && code < 91) || (code > 47 && code < 58)) {
        if ($('.'+this.dropdownSelectC8).hasClass(this.hidden)) {
          this.openDropDown($target)
        }
        $listOptions.each((_idx, elm) => {
          options.push($(elm).text().trim())
        })
        const orderedOptions = options.slice(indexActive).concat(options.slice(0, indexActive))
        searchString = this.getSearchString(char)
        const allSameLetter = (array) => array.every((letter) => letter === array[0]);
        searchOptions = orderedOptions.filter((opt) => {
          return opt.toLowerCase().indexOf(searchString.toLowerCase()) === 0
        })
        const firstMatch = searchOptions[0]
        if (firstMatch) {
          indexGoto = options.indexOf(firstMatch)
        } else if (allSameLetter(searchString.split(''))) {
          searchOptions = orderedOptions.filter((opt) => {
            return opt.toLowerCase().indexOf(searchString[0].toLowerCase()) === 0
          })
          indexGoto = options.indexOf(searchOptions[0])
        } else {
          indexGoto = -1
        }
        if (indexGoto > -1) {
          this.maintainScrollVisibility($listOptions[indexGoto], $listbox.parent()[0])
          $listOptions.parent().removeClass(this.textSelected)
          $listOptions.eq(indexGoto).parent().addClass(this.textSelected)
          const LiActive = $('.'+this.dropdownSelectC8).find(this.liSelected)
          $target.parents('.child-dropdown').attr(this.ariaActivedescendant,  LiActive.attr('id'))
        }
      }
    })
  }
  maintainScrollVisibility(activeElement, scrollParent) {
    const { offsetHeight, offsetTop } = activeElement;
    const { scrollTop, offsetHeight: parentOffsetHeight } = scrollParent;
    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;
    if (isAbove) {
      scrollParent.scrollTo(0, offsetTop);
    }
    if (isBelow) {
      scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
    }
  }

  getSearchString(char) {
    if (typeof this.searchTimeout === 'number') {
      window.clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = window.setTimeout(() => {
      this.searchString = '';
    }, 500);
    this.searchString += char;
    return this.searchString;
  }
}

new SelectC8().init()
