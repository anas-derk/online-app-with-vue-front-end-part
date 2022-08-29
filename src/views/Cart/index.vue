<template>
  <div>
    <Header></Header>
    <!-- Start Cart Page -->
    <div class="cart pt-4 pb-4">
      <h1 class="text-center fw-bold">Cart</h1>
      <div class="container" v-if="carts.length === 0">
        <p class="alert alert-danger">There Is Not Products In Your Cart !!</p>
      </div>
      <!-- Start Container -->
      <div class="container text-center" v-else>
        <table v-if="windowInnerWidth > 767">
          <thead class="fw-bold">
            <tr>
              <td>no</td>
              <td>Product Name</td>
              <td>Price</td>
              <td>Amount</td>
              <td>Total</td>
              <td>Processes</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart, index) in carts" :key="cart._id">
              <td>{{ index + 1 }}</td>
              <td>{{ cart.name }}</td>
              <td>{{ cart.price }}$</td>
              <td>
                <input
                  type="number"
                  class="form-control"
                  :value="cart.amount"
                  @change="handleAmountChange($event, index)"
                />
                <p
                  class="alert alert-danger mt-4"
                  v-if="errorMessage && index === errorMessageIndex"
                >{{errorMessage}}</p>
              </td>
              <td>{{ cart.price * cart.amount }}$</td>
              <td>
                <form class="cart-form" @submit.prevent>
                  <button
                    type="submit"
                    class="btn btn-success d-block mx-auto mb-3"
                    @click="editItem(cart.productId, amountList[index], index)"
                  >change order amount</button>
                  <hr />
                  <p class="alert alert-danger" v-if="orderError">{{ orderError }}</p>
                  <input
                    type="text"
                    placeholder="Please Enter Address Then Click Order"
                    class="form-control mb-3"
                    @change="handleAddressChange($event, index)"
                  />
                  <button
                    type="submit"
                    class="btn btn-success d-block mx-auto mb-3"
                    @click="orderItem(cart, addressList[index], index)"
                  >Order</button>
                  <hr />
                  <button
                    type="submit"
                    class="btn btn-danger d-block mx-auto"
                    @click="deleteItem(cart._id)"
                  >Delete</button>
                </form>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="carts.length > 1">
            <tr>
              <td colspan="3">
                <form class="delete-all-products-in-your-cart-form" @submit.prevent>
                  <button type="submit" class="btn btn-danger" @click="deleteAllItems">Delete All</button>
                </form>
              </td>
              <td colspan="3">
                <form class="order-all-products-in-your-cart-form" @submit.prevent>
                  <p class="alert alert-danger" v-if="orderAllError">{{ orderAllError }}</p>
                  <input
                    type="text"
                    placeholder="Please Enter Address Then Click Order All"
                    class="form-control mb-3"
                    v-model.trim="generalAddress"
                  />
                  <button type="submit" class="btn btn-success" @click="orderAllItems">Order All</button>
                </form>
              </td>
            </tr>
          </tfoot>
        </table>
        <!-- Start Products Info -->
        <section class="products-info" v-if="windowInnerWidth < 767">
          <!-- Start Product Details Box -->
          <div class="product-details-box mb-5" v-for="(cart, index) in carts" :key="cart._id">
            <h5 class="mb-4">Product #{{ index + 1 }} info :</h5>
            <table>
              <tbody>
                <tr>
                  <td class="fw-bold p-3">Name</td>
                </tr>
                <tr>
                  <td class="p-3">{{ cart.name }}</td>
                </tr>
                <tr>
                  <td class="fw-bold">Price</td>
                </tr>
                <tr>
                  <td class="p-3">{{ cart.price }}$</td>
                </tr>
                <tr>
                  <td class="fw-bold">Amount</td>
                </tr>
                <tr>
                  <td class="p-3">
                    <input type="number" class="form-control" />
                  </td>
                </tr>
                <tr>
                  <td class="fw-bold">Total</td>
                </tr>
                <tr>
                  <td class="p-3">{{ cart.price * cart.amount }} $</td>
                </tr>
                <tr>
                  <td class="fw-bold">Processes</td>
                </tr>
                <tr>
                  <td class="p-3">
                    <form class="cart-form" @submit.prevent>
                      <button
                        type="submit"
                        class="btn btn-success d-block mx-auto mb-3"
                        @click="
                          editItem(cart.productId, amountList[index], index)
                        "
                      >change order amount</button>
                      <p class="alert alert-danger mt-4" v-if="errorMessage">{{ errorMessage }}</p>
                      <hr />
                      <p class="alert alert-danger" v-if="orderError">{{ orderError }}</p>
                      <input
                        type="text"
                        placeholder="Please Enter Address Then Click Order"
                        class="form-control mb-3"
                      />
                      <button
                        type="submit"
                        class="btn btn-success d-block mx-auto mb-3"
                        @click="orderItem(cart, addressList[index], index)"
                      >Order</button>
                      <hr />
                      <button
                        type="submit"
                        class="btn btn-danger d-block mx-auto"
                        @click="deleteItem(cart._id)"
                      >Delete</button>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- End Product Info Box -->
          <!-- Start Shortcut Processes Box -->
          <h5 class="mb-4" v-if="carts.length > 1">Shortcut Processes Box :</h5>
          <div
            class="shortcut-processes-box border border-3 border-success p-3"
            v-if="carts.length > 1"
          >
            <form
              class="delete-all-products-in-your-cart-form mb-3 p-3 border border-3"
              @submit.prevent
            >
              <h6 class="mb-3">For Delete All Products Please On Button In Down:</h6>
              <button type="submit" class="btn btn-danger" @click="deleteAllItems">Delete All</button>
            </form>
            <form class="order-all-products-in-your-cart-form p-3 border border-3" @submit.prevent>
              <p class="alert alert-danger" v-if="orderAllError">{{ orderAllError }}</p>
              <input
                type="text"
                placeholder="Please Enter Address Then Click Order All"
                class="form-control mb-3"
              />
              <button type="submit" class="btn btn-success" @click="orderAllItems">Order All</button>
            </form>
          </div>
          <!-- End Shortcut Processes Box -->
        </section>
      </div>
      <!-- End Container -->
    </div>
    <!-- End Cart Page -->
  </div>
</template>

<script>
import Header from "@/components/public/Header/index.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Cart",
  data() {
    return {
      carts: [],
      amountList: [],
      addressList: [],
      generalAddress: "",
      windowInnerWidth: window.innerWidth,
      errorMessage: "",
      errorMessageIndex: null,
      orderError: "",
      orderAllError: ""
    };
  },
  computed: {
    ...mapGetters(["userInfo", "base_api_url"])
  },
  components: {
    Header
  },
  mounted() {
    window.addEventListener("resize", this.resizeHandler);
    axios
      .get(`${this.base_api_url}/api/cart?userId=${this.userInfo._id}`)

      .then(res => {
        let data = res.data;

        this.carts = data;

        let tempAmountList = [];

        for (let i = 0; i < data.length; i++) {
          tempAmountList.push(data[i].amount);
        }

        this.amountList = tempAmountList;
      })
      .catch(err => console.log(err));
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    ...mapActions(["redirectToPage"]),
    resizeHandler(){
      this.windowInnerWidth = window.innerWidth;
    },
    handleAmountChange(e, index) {
      this.amountList[index] = parseInt(e.target.value);
    },
    handleAddressChange(e, index) {
      this.addressList[index] = e.target.value;
    },
    editItem(productId, newAmount, index) {
      if (this.amountList[index] < 1 || this.amountList[index] > 6) {
        this.errorMessage =
          "Sorry Can't Edit Amount Because It Less Than One Or Greater Than 6 ...";
        this.errorMessageIndex = index;
        const amountInputError = setTimeout(() => {
          this.errorMessage = "";

          clearTimeout(amountInputError);
        }, 3000);
      } else {
        axios
          .put(`${this.base_api_url}/api/cart/save/${productId}`, { newAmount })
          .then(() => {
            document.location.reload();
          })
          .catch(err => console.log(err));
      }
    },
    deleteItem(cartId) {
      axios
        .delete(`${this.base_api_url}/api/cart/delete/${cartId}`)
        .then(() => {
          document.location.reload();
        })
        .catch(err => console.log(err));
    },
    deleteAllItems() {
      axios
        .delete(`${this.base_api_url}/api/cart/delete-all/${this.userInfo._id}`)
        .then(() => {
          document.location.reload();
        })
        .catch(err => console.log(err));
    },
    orderItem(productInfo, address, index) {
      if (!this.addressList[index]) {
        this.orderError = "Please Enter Your Address ..";

        const addressError = setTimeout(() => {
          this.orderError = "";

          clearTimeout(addressError);
        }, 3000);
      } else {
        axios
          .post(`${this.base_api_url}/api/orders`, {
            productInfo,
            address
          })
          .then(() => {
            this.redirectToPage("/orders");
          })
          .catch(err => console.log(err));
      }
    },
    orderAllItems() {
      if (!this.generalAddress) {
        this.orderAllError = "Please Enter Your Address ..";
        const addressError = setTimeout(() => {
          this.orderAllError = "";
          clearTimeout(addressError);
        }, 3000);
      } else {
        axios
          .post(`${this.base_api_url}/api/orders/order-all-items`, {
            carts: this.carts,
            generalAddress: this.generalAddress
          })
          .then(() => {
            this.redirectToPage("/orders");
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>