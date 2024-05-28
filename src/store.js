import { createStore } from 'vuex';

let cart = window.localStorage.getItem('cart');

// Create a new store instance
const store = createStore({
  state() {
    return {
      cart: cart ? JSON.parse(cart) : [],
      total: 0
    };
  },

  mutations: {
    addToCart(state, item) {
      const existingItem = state.cart.find(cartItem => cartItem.productId === item.productId);
      if (existingItem) {
        existingItem.productQuantity += item.productQuantity;
      } else {
        state.cart.push(item);
      }
      this.commit('saveData');
      this.commit('updateCartTotal');
    },

    saveData(state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    removeFromCart(state, item) {
      state.cart = state.cart.filter(cartItem => cartItem.productId !== item.productId);
      this.commit('saveData');
      this.commit('updateCartTotal');
    },

    updateCartTotal(state) {
      state.total = state.cart.reduce((sum, item) => sum + (item.productPrice * item.productQuantity), 0);
    }
  },

  actions: {
    addToCart({ commit }, item) {
      commit('addToCart', item);
    },

    removeFromCart({ commit }, item) {
      commit('removeFromCart', item);
    }
  }
});

export default store;
