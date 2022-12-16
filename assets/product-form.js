if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.querySelector('[name=id]').disabled = false;
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
      this.submitButton = this.querySelector('[type="submit"]');
      if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');
    }

    onSubmitHandler(evt) {
      evt.preventDefault();
      if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

      this.handleErrorMessage();

      this.submitButton.setAttribute('aria-disabled', true);
      this.submitButton.classList.add('loading');
      this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

      const config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];

      const formData = new FormData(this.form);
      // if (this.cart) {
        formData.append('sections', this.getSectionsToRender().map((section) => section.id));
        formData.append('sections_url', window.location.pathname);
        // this.cart.setActiveElement(document.activeElement);
      // }
      config.body = formData;
      fetch(`${routes.cart_add_url}`, config)
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            this.handleErrorMessage(response.description);

            const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
            if (!soldOutMessage) return;
            this.submitButton.setAttribute('aria-disabled', true);
            this.submitButton.querySelector('span').classList.add('hidden');
            soldOutMessage.classList.remove('hidden');
            this.error = true;
            return;
          } else if (!this.cart) {
            // window.location = window.routes.cart_url;
            // return;
          }

          const title = response.title

          this.error = false;
          const quickAddModal = this.closest('quick-add-modal');
          if (quickAddModal) {
            document.body.addEventListener('modalClosed', () => {
              setTimeout(() => {
                this.render(response) });
                const $product = $(`[data-modal="#QuickAdd-${response.product_id}"]`).parents('.grid__item')
                if($product.find('.message-upsel-v2').length > 0) {
                  $product.find('.message-upsel-v2').remove()
                }
                $product.append(`<p class="text-black message-upsel-v2 flex items-center mb-0 ml-1 text-footer-description mouse"><span class="icomoon icon-icon-check text-black mr-6 text-footer-social-md"></span>${title}  added to your cart</p>`)
            }, { once: true });
            quickAddModal.hide(true);
          } else {
            this.render(response);
            const $product = $(this.submitButton).parents('.grid__item')
            if( $product.length > 0) {
              if($product.find('.message-upsel-v2').length > 0) {
                $product.find('.message-upsel-v2').remove()
              }
              $product.append(`<p class="text-black message-upsel-v2 flex items-center mb-0 ml-1 text-footer-description mouse"><span class="icomoon icon-icon-check text-black mr-6 text-footer-social-md"></span>${title}  added to your cart</p>`)
            } else {
              const $productCurrent = $(this.submitButton).parents('.mod-product-details-module')
              if($productCurrent.find('.submit-area .message-upsel-v2').length > 0) {
                $productCurrent.find('.submit-area .message-upsel-v2').remove()
              }
              $productCurrent.find('.product-form__buttons').after(`<p class="text-black message-upsel-v2 flex items-center ml-1 mb-0 text-footer-description mt-6"><span class="icomoon icon-icon-check text-black mr-6 text-footer-social-md"></span>${title}  added to your cart</p>`)
            }
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.submitButton.classList.remove('loading');
          if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
          if (!this.error) this.submitButton.removeAttribute('aria-disabled');
          this.querySelector('.loading-overlay__spinner').classList.add('hidden');
        });
    }
    render(parsedState) {
      this.getSectionsToRender().forEach((section => {
        const elementToReplace =
          document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
        elementToReplace.innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
      }));
    }
    getSectionsToRender() {
      return [
        {
          id: 'cart-icon-bubble',
          section: 'cart-icon-bubble',
          selector: '.shopify-section'
        },
        {
          id: 'cart-icon-bubble2',
          section: 'cart-icon-bubble',
          selector: '.shopify-section'
        }
      ];
    }
  
    getSectionInnerHTML(html, selector = '.shopify-section') {
      return new DOMParser()
        .parseFromString(html, 'text/html')
        .querySelector(selector).innerHTML;
    }
    handleErrorMessage(errorMessage = false) {
      this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
      if (!this.errorMessageWrapper) return;
      this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

      this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

      if (errorMessage) {
        this.errorMessage.textContent = errorMessage;
      }
    }
  });
}
