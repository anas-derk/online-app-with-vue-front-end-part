<template>
  <!-- Start Home Page -->
  <Header></Header>
  <div class="home pt-5 pb-5">
    <!-- Start Container -->
    <div class="container">
      <h1 class="text-center fw-bold mb-5">Home Page - Products Gallery</h1>
      <!-- Start Products Filter Form -->
      <form
        class="products-filter-form text-center mb-4"
        @submit.prevent="get_products_by_category"
      >
        <select class="form-select" v-model="category">
          <option value="" hidden>Choose Category</option>
          <option value="all">All</option>
          <option value="phones">Phones</option>
          <option value="clothes">Clothes</option>
          <option value="computers">Computers</option>
        </select>
        <button
          type="submit"
          class="btn btn-danger products-filter-button mt-4"
        >
          Products Filter
        </button>
      </form>
      <!-- End Products Filter Form -->
      <p class="alert alert-danger" v-if="notFoundProductsError">
        {{ notFoundProductsError }}
      </p>
      <!-- Start Grid System -->
      <div class="row">
        <!-- Start Column -->
        <div
          class="col-lg-4"
          v-for="(product, index) in products"
          :key="product._id"
        >
          <!-- Start Product Info Box -->
          <div class="card product-info-box mb-5">
            <!-- Start Product Image Box -->
            <div class="product-image-box mb-4">
              <!-- Start Product Image -->
              <img
                :src="images[index]"
                class="card-img-top"
                :style="{ height: '250px' }"
                alt="Sorry !!"
              />
              <!-- End Product Image -->
            </div>
            <!-- End Product Image Box -->
            <!-- Start Product Details List -->
            <ul class="card-body product-details-list">
              <li class="mb-2">
                Product Name:
                <router-link
                  class="card-title product-name"
                  :to="{
                    name: 'Product Info',
                    params: { productId: product._id },
                  }"
                >
                  <span class="fw-bold"> {{ product.name }}</span>
                </router-link>
              </li>
              <li class="product-price mb-2">
                Product Price: <span class="fw-bold">{{ product.price }}</span
                >$
              </li>
              <li class="product-category mb-2">
                Product Category:
                <span class="fw-bold">{{ product.category }}</span>
              </li>
              <li class="card-text product-description mb-2">
                Product Description:
                <span class="fw-bold">{{ product.description }}</span>
              </li>
              <router-link
                v-if="userInfo"
                class="btn btn-primary add-to-cart w-100 mt-3"
                :to="{
                  name: 'Product Info',
                  params: { productId: product._id },
                }"
              >
                Add to cart
              </router-link>
            </ul>
            <!-- End Product Details List -->
          </div>
          <!-- End Product Info Box -->
        </div>
        <!-- End Column -->
      </div>
      <!-- End Container -->
    </div>
  </div>
  <!-- End Home Page -->
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Header from "@/components/public/Header/index.vue";
import img1 from "@/assets/images/labtop.jpg";
import img2 from "@/assets/images/android-phone.jpg";
import img3 from "@/assets/images/android-tablet.jpg";
import img4 from "@/assets/images/clothes.jpg";

export default {
  name: "Home",
  data() {
    return {
      category: "",
      products: [],
      images: [img1, img2, img3, img4],
      notFoundProductsError: "",
    };
  },
  mounted() {
    this.getAllProducts();
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  methods: {
    getAllProducts() {
      axios
        .get(`${this.base_api_url}/api/products`)
        .then((res) => {
          let data = res.data;
          if (typeof data === "string") {
            this.notFoundProductsError = data;
          } else {
            this.products = data;
          }
        })

        .catch((err) => console.log(err));
    },
    get_products_by_category() {
      if (this.category === "all") {
        this.getAllProducts();
      } else {
        axios
          .get(
            `${this.base_api_url}/api/products/determinate-products?category=${this.category}`
          )
          .then((res) => {
            let data = res.data;
            if (typeof data === "string") {
              this.notFoundProductsError = data;
            } else {
              this.products = data;
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>