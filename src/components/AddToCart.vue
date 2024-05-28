<template>
    <div class="addToCart">
        <button class="btn btn-primary" @click="addToCart" data-bs-toggle="modal"
          data-bs-target="#miniCartModal">Add To Cart</button>
    </div>
</template>

<script>
export default {
    name: 'addToCart',
    props: {
        name: String,
        price: String,
        image: String,
        pId: String
    },

    data() {
        return {
            item: {
                productName: this.name,
                productImage: this.image,
                productPrice: this.price,
                productId: this.pId,
                productQuantity: 1,
            }

        }
    },

    methods: {
        addToCart() {
            //$('#miniCart').modal('show');
            this.$store.commit('addToCart', this.item)
        }
    }
}
</script>

<style scoped lang="scss"></style>