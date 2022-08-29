<template>
  <div>
    <Header></Header>
    <!-- Start Orders Page -->
    <div class="orders pt-5 pb-5">
      <h1 class="text-center fw-bold">Orders</h1>
      <div class="container" v-if="orders.length === 0">
        <p class="alert alert-danger">There Is Not Orders In Your Cart !!</p>
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
              <td>Status</td>
              <td>Time</td>
              <td>Order Cancel</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="order._id">
              <td>{{ index + 1 }}</td>
              <td>{{ order.name }}</td>
              <td>{{ order.price }}</td>
              <td>{{ order.amount }}</td>
              <td>{{ order.price * order.amount }}$</td>
              <td class="fw-bold">{{ order.status }}</td>
              <td>{{ order.time }}</td>
              <td>
                <form class="cancel-order-form" @submit.prevent v-if="order.status === 'Pending'">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    @click="cancelOrder(order._id)"
                  >Cancel</button>
                </form>
                <p v-else class="mt-3 mb-3">"unavailable now"</p>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr v-if="orders.length > 1 && ordersStatus.includes('Pending')">
              <td colspan="8">
                <form class="cancel-all-orders-form" @submit.prevent>
                  <button
                    type="submit"
                    class="btn btn-danger mb-3"
                    @click="cancelAllOrders"
                  >Cancel All Orders</button>
                  <p class="mb-2 fw-bold">(For Orders That Her Status is Just Pending)</p>
                </form>
              </td>
            </tr>
          </tfoot>
        </table>
        <!-- Start Orders Info -->
        <section class="orders-info" v-if="windowInnerWidth < 767">
          <!-- Start Product Details Box -->
          <div class="order-details-box mb-5" v-for="(order, index) in orders" :key="order._id">
            <h5 class="mb-4">Order #{{ index + 1 }} info :</h5>
            <table>
              <tbody>
                <tr>
                  <td class="fw-bold p-3">Product Name</td>
                </tr>
                <tr>
                  <td class="p-3">{{ order.name }}</td>
                </tr>
                <tr>
                  <td class="fw-bold">Price</td>
                </tr>
                <tr>
                  <td class="p-3">{{ order.price }}$</td>
                </tr>
                <tr>
                  <td class="fw-bold">Amount</td>
                </tr>
                <tr>
                  <td class="p-3">{{ order.amount }}</td>
                </tr>
                <tr>
                  <td class="fw-bold">Total</td>
                </tr>
                <tr>
                  <td class="p-3">{{ order.price * order.amount }} $</td>
                </tr>
                <tr>
                  <td class="fw-bold">Status</td>
                </tr>
                <tr>
                  <td class="p-3 text-danger fw-bold">{{ order.status }}</td>
                </tr>
                <tr>
                  <td class="fw-bold">Order Cancel</td>
                </tr>
                <tr>
                  <td>
                    <form
                      class="cancel-order-form"
                      @submit.prevent
                      v-if="order.status === 'Pending'"
                    >
                      <button
                        type="submit"
                        class="btn btn-danger"
                        @click="cancelOrder(order._id)"
                      >Cancel</button>
                    </form>
                    <p v-else>"unavailable now"</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- End Product Info Box -->
          <!-- Start All Orders Cancel Box -->
          <h5 class="mb-4">All Orders Cancel Box :</h5>
          <div
            class="all-orders-cancel-box border border-3 border-success p-3"
            v-if="orders.length > 1"
          >
            <form class="cancel-all-orders-form" @submit.prevent>
              <button
                type="submit"
                class="btn btn-danger mb-3"
                @click="cancelAllOrders"
              >Cancel All Orders</button>
              <p class="mb-2 fw-bold">(For Orders That Her Status is Just Pending)</p>
            </form>
          </div>
          <!-- End All Orders Cancel Box -->
        </section>
      </div>
      <!-- End Container -->
    </div>
    <!-- End Orders Page -->
  </div>
</template>

<script>
import Header from "@/components/public/Header/index.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      ordersStatus: [],
      windowInnerWidth: window.innerWidth
    };
  },
  components: {
    Header
  },
  mounted() {
    window.addEventListener("resize", this.resizeHandler);
    this.getOrders();
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"])
  },
  methods: {
    resizeHandler() {
      this.windowInnerWidth = window.innerWidth;
    },
    getOrders() {
      axios
        .get(`${this.base_api_url}/api/orders?userId=${this.userInfo._id}`)

        .then(res => {
          this.orders = res.data;
          this.orders.forEach(element => {
            this.ordersStatus.push(element.status);
          });
        })
        .catch(err => console.log(err));
    },
    cancelOrder(orderId) {
      axios
        .delete(`${this.base_api_url}/api/orders/cancel/${orderId}`)
        .then(() => {
          document.location.reload();
        })
        .catch(err => console.log(err));
    },
    cancelAllOrders() {
      axios
        .delete(
          `${this.base_api_url}/api/orders/cancel-all/${this.userInfo._id}`
        )
        .then(() => {
          document.location.reload();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>