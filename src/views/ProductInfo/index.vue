<template>
  <div>
    <Header></Header>
    <!-- Start Product Info Page -->
    <div class="product-info pt-5 pb-5">
      <h1 class="text-center fw-bold">Product Info</h1>
      <!-- Start Container -->
      <div class="container">
        <!-- Start Grid System -->
        <div class="row">
          <!-- Start Column -->
          <div class="col-md-6">
            <!-- Start Product Info Box -->
            <div class="card product-info-box mb-4">
              <!-- Start Product Details List -->
              <ul class="card-body product-details-list">
                <li class="product-name mb-4">
                  Product Name:
                  <span class="fw-bold">{{ productInfo.name }}</span>
                </li>
                <li class="product-price mb-4">
                  Product Price:
                  <span class="fw-bold">{{ productInfo.price }}</span
                  >$
                </li>
                <li class="product-category mb-4">
                  Product Category:
                  <span class="fw-bold">{{ productInfo.category }}</span>
                </li>
                <li class="product-description">
                  Product Description:
                  <span class="fw-bold">{{ productInfo.description }}</span>
                </li>
                <!-- Start Add To Cart Form -->
                <form
                  class="add-to-cart-form mt-4"
                  @submit.prevent="addToCart"
                  v-if="userInfo"
                >
                  <input
                    type="number"
                    class="form-control amount"
                    required
                    min="1"
                    max="6"
                    v-model="amount"
                  />
                  <button type="submit" class="btn btn-primary add-to-cart">
                    Add to cart
                  </button>
                </form>
                <!-- End Add To Cart Form -->
              </ul>
              <!-- End Product Details List -->
            </div>
            <!-- End Product Info Box -->
          </div>
          <!-- End Column -->
          <!-- Start Column -->
          <div class="col-md-6">
            <!-- Start Product Image Box -->
            <div class="product-image-box">
              <!-- Start Product Image -->
              <img
                :src="productInfo.productImageSrc"
                class="card-img-top"
                alt="Sorry !!"
              />
              <!-- End Product Image -->
            </div>
            <!-- End Product Image Box  -->
          </div>
          <!-- End Column -->
        </div>
        <!-- End Grid System -->
        <p class="alert alert-info mt-4 text-center" v-if="waitMessage">
          {{ waitMessage }}
        </p>
        <p class="alert alert-success mt-4 text-center" v-if="successMessage">
          {{ successMessage }}
        </p>
      </div>
      <!-- End Container -->
    </div>
    <!-- End Product Info -->
  </div>
</template>

<script>
import Header from "@/components/public/Header/index.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "ProductInfo",
  data() {
    return {
      productInfo: {},
      amount: null,
      waitMessage: "",
      successMessage: "",
    };
  },
  mounted() {
    let productId = this.$route.params.productId;
    axios
      .get(`${this.base_api_url}/api/productInfo/${productId}`)
      .then((res) => {
        let data = res.data;
        if (typeof data === "object") {
          this.productInfo = data;
        }
      })
      .catch((err) => console.log(err));
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  components: {
    Header,
  },
  methods: {
    ...mapActions(["redirectToPage"]),
    addToCart() {
      this.waitMessage =
        "Please Wait While Verification And Add This Item To Your Cart ...";

      axios
        .post(`${this.base_api_url}/api/cart`, {
          name: this.productInfo.name,

          price: this.productInfo.price,

          amount: parseInt(this.amount),

          productId: this.productInfo._id,

          userId: this.userInfo._id,
        })
        .then(() => {
          setTimeout(() => {
            this.waitMessage = "";

            this.successMessage =
              "Ok, Add Item To Your Cart Process Is Successfuly ...";

            setTimeout(() => {
              this.successMessage = "";

              this.redirectToPage("/cart");
            }, 2000);
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>