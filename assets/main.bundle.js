!(function () {
    "use strict";
    class t {
        constructor(t, e) {
            (this.settings = this.settings || {}), (this.settings.options = t), (this.storableSettings = e || {}), (this.managedSettings = []);
        }
        get enabled() {
            return !0;
        }
        async updateStorableSettings(t) {
            Object.assign(this.storableSettings, t);
        }
        async getStorableSettings() {
            let t = {};
            return (
                this.managedSettings.forEach((e) => {
                    t[e] = this.storableSettings[e];
                }),
                t
            );
        }
        async checkCart(t, e) {
            throw (console.log("checkCart called with", { cart: t, productData: e }), new Error("You must implement checkCart(cart, productData)"));
        }
    }
    async function e(t, e) {
        const a = await fetch(t, { credentials: "same-origin", headers: { "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json;" }, ...e });
        if (!a.ok) throw a;
        return await a.json();
    }
    class a {
        constructor(t) {
            if (!t.render || !t.handle) throw (console.error("Options missing", t), new Error("Unable to construct RequestService, options missing."));
            (this.settings = { sections: { products: t.render }, routes: { products: "/collections/".concat(t.handle) } }), (this.fetchJSON = e.bind(this)), (this.cart = !1);
        }
        async getCart() {
            if (!(!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]) && this.cart) return this.cart;
            const t = await e("/cart.js");
            return (this.cart = t), t;
        }
        async updateCart(t) {
            try {
                const a = await e("/cart/update.js", { method: "POST", body: JSON.stringify(t) });
                return (this.cart = a), a;
            } catch (t) {
                return console.error("Error updating cart", t), !1;
            }
        }
        async getProduct(t) {
            try {
                return await e("/products/".concat(t, ".js"));
            } catch (t) {
                return console.error("Unable to fetch product.", t), !1;
            }
        }
        async getProducts() {
            if (!(arguments.length > 0 && void 0 !== arguments[0] && arguments[0]) && this.sourceData) return this.sourceData;
            let t = await this.getSectionsJson(this.settings.routes.products, [this.settings.sections.products]);
            if (t[this.settings.sections.products]) {
                if (((this.sourceData = t[this.settings.sections.products]), !this.sourceData.products || !this.sourceData.recycling)) throw new Error("Required Data is missing.", this.sourceData);
                return this.sourceData;
            }
            throw new Error("Unable to Parse Data");
        }
        async getSectionsJson(t, a) {
            const s = new URLSearchParams({ sections: a }),
                i = new URL(t, location.href);
            i.search = s.toString();
            const r = await e(i);
            let n = {};
            return (
                a.forEach((t) => {
                    try {
                        let s = ((e = r[t]), (a = 'script[type="application/json"]'), new DOMParser().parseFromString(e, "text/html").querySelectorAll(a));
                        null != s &&
                            s.length > 0 &&
                            ((n[t] = {}),
                            s.forEach((e) => {
                                let a = e.getAttribute("data-type") || !1;
                                a && (n[t][a] = JSON.parse(e.innerText || "{}"));
                            }, this));
                    } catch (e) {
                        console.error("Unable to parse JSON for '".concat(t, "':"), e);
                    }
                    var e, a;
                }, this),
                n
            );
        }
    }
    class s extends t {
        constructor(t, e) {
            super(t, e), (this.managedSettings = ["feeCount"]), (this.settings.context = t.context || ""), (this.checkCart = this.checkCart.bind(this));
        }
        async checkCart(t, e) {
            const a = await this.checkState(e),
                s = Object.values(e.recycling) || [];
            let i,
                r = 0,
                n = {};
            return (
                t.items.forEach((t) => {
                    e.products[t.variant_id] && (r += e.products[t.variant_id].recycle * t.quantity), t.variant_id != a && s.includes(t.variant_id) ? (n[t.variant_id] = 0) : t.variant_id == a && (i = t);
                }),
                i ? i.quantity != r && (n[i.variant_id] = r) : a && r > 0 && (n[a] = r),
                (this.storableSettings.feeCount = r),
                n
            );
        }
        async checkState(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (!e || !a) {
                if (!this.storableSettings.location) return null;
                (e = this.storableSettings.location.country || !1), (a = this.storableSettings.location.province || !1);
            }
            return "US" === e && !1 !== a && (t.recycling[a.toLowerCase()] || !1);
        }
    }
    class i extends t {
        constructor(t, e) {
            super(t, e), (this.checkCart = this.checkCart.bind(this));
        }
        async checkCart(t, e) {
            var a;
            if (null === (a = e.haulaway) || void 0 === a || !a.products) return {};
            let s = 0,
                i = 0,
                r = !1,
                n = !1;
            t.items.forEach((t) => {
                var a, o;
                null !== (a = e.products[t.variant_id]) && void 0 !== a && a.haul ? (s += t.quantity) : null !== (o = e.products[t.variant_id]) && void 0 !== o && o.haul_base && (i += t.quantity),
                    t.variant_id == e.haulaway.products.mattress ? (r = t) : t.variant_id == e.haulaway.products.base && (n = t);
            }, this),
                s > i ? (i = 0) : i > 0 && s > 0 && (i -= s),
                r || (r = { variant_id: e.haulaway.products.mattress, quantity: 0 }),
                n || (n = { variant_id: e.haulaway.products.base, quantity: 0 });
            let o = { [r.variant_id]: r.quantity || 0, [n.variant_id]: n.quantity || 0 };
            if (o[r.variant_id] > s && i > 0) {
                let t = o[r.variant_id] - s;
                t > 0 && (o[n.variant_id] += t);
            } else if (o[n.variant_id] > i && s > 0) {
                let t = o[n.variant_id] - i;
                t > 0 && (o[r.variant_id] += t);
            }
            return o[r.variant_id] > s && (o[r.variant_id] = s), o[r.variant_id] > i && (o[n.variant_id] = i), o[r.variant_id] == r.quantity && delete o[r.variant_id], o[n.variant_id] == n.quantity && delete o[n.variant_id], o;
        }
    }
    class r {
        constructor(t) {
            (this.settings = { storage: "dhCart" }),
                (this.storableSettings = this.getStorableSettings()),
                t.location && (this.storableSettings.location = t.location),
                (this.RequestService = new a(t)),
                (this.handlers = [new s({ context: "cart", ...t }, this.storableSettings), new i({ ...t }, this.storableSettings)]);
        }
        addHandler(t) {
            this.handlers.push(t);
        }
        async retreiveCart() {
            let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return await this.RequestService.getCart(t);
        }
        async checkCart() {
            const t = await this.RequestService.getCart(),
                e = await this.RequestService.getProducts();
            if (0 === t.item_count) return { didUpdate: !1, updates: {} };
            let a = {};
            for (const s of this.handlers) s.enabled && Object.assign(a, await s.checkCart(t, e));
            return await this.saveStorableSettings(), { didUpdate: await this.updateCart(a), updates: a };
        }
        async updateCart(t) {
            if (Object.keys(t).length) {
                const e = await this.RequestService.updateCart({ updates: t });
                return !1 !== e && e.item_count > -1;
            }
            return !1;
        }
        async collectHandlerStorableSettings() {
            for (const t of this.handlers) t.enabled && Object.assign(this.storableSettings, await t.getStorableSettings());
            return this.storableSettings;
        }
        async updateHandlerStorableSettings() {
            for (const t of this.handlers) t.enabled && (await t.updateStorableSettings(this.storableSettings));
        }
        getLocation() {
            return this.storableSettings.location || !1;
        }
        setLocation(t) {
            (this.storableSettings.location = t), this.saveStorableSettings();
        }
        getStorableSettings() {
            return this.storableSettings || (this.storableSettings = JSON.parse(localStorage.getItem(this.settings.storage)) || {}), this.storableSettings;
        }
        async saveStorableSettings() {
            await this.collectHandlerStorableSettings();
            try {
                localStorage.setItem(this.settings.storage, JSON.stringify(this.storableSettings));
            } catch (t) {
                console.error("Unable to save settings.", t);
            }
            this.updateHandlerStorableSettings();
        }
        clearStorableSettings() {
            try {
                localStorage.removeItem(this.settings.storage), (this.storableSettings = {});
            } catch (t) {
                console.error("Unable to clear settings.", t);
            }
            this.updateHandlerStorableSettings();
        }
    }
    document.querySelector('script[data-type="variant-meta"]');
    new (class extends class {
        constructor() {
            (this.settings = { selectors: {} }), (this.elements = {});
        }
        loadElements() {
            Object.entries(this.settings.selectors).forEach((t) => {
                const [e, a] = t;
                this.elements[e] || (this.elements[e] = document.querySelector(a));
            });
        }
    } {
        constructor() {
            if ((super(), void 0 === window.routes || void 0 === window.routes.data_source)) throw new Error("Unable to start StoreManager.");
            (this.CartManager = new r({ ...window.routes.data_source })),
                (this.handleCartUpdate = this.handleCartUpdate.bind(this)),
                (this.handleCartQuantityUpdate = this.handleCartQuantityUpdate.bind(this)),
                (this.settings.selectors = { cartItems: "cart-items" }),
                (this.elements = {});
        }
        attachCart() {
            this.loadElements(),
                document.addEventListener("cart:update", this.handleCartUpdate),
                document.addEventListener("cart:quantity", this.handleCartQuantityUpdate),
                (this.initSetupTimer = setTimeout(() => {
                    this.CartManager.checkCart();
                }, 600));
        }
        async handleCartUpdate() {
            // console.log('handleCartUpdate')
            this.initSetupTimer && (clearTimeout(this.initSetupTimer), delete this.initSetupTimer), await this.CartManager.checkCart();
        }
        async handleCartQuantityUpdate() {
            // console.log('handleCartQuantityUpdate')
            this.initSetupTimer && (clearTimeout(this.initSetupTimer), delete this.initSetupTimer);
            const { didUpdate: t, updates: e } = await this.CartManager.checkCart();
            t &&
                setTimeout(async () => {
                    await this.updateCartItemsDisplay(e);
                }, 300);
        }
        async updateCartItemsDisplay(t) {
            // console.log('updateCartItemsDisplay')
            if ((this.loadElements(), this.elements.cartItems)) {
                const e = await this.CartManager.retreiveCart();
                let a = [];
                e.items.forEach((e, s) => {
                    t[e.variant_id] && a.push(s + 1);
                }, this),
                    a.length && this.elements.cartItems.refreshCart(a, e),
                    setTimeout(() => {
                        e.item_count !== this.elements.cartItems.currentItemCount && location.reload();
                    }, 1e3);
            }
        }
    })().attachCart();
})();
