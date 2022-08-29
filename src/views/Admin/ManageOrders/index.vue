<template>
  <div>
    <Header></Header>
    <!-- Start Manage Orders Page -->
    <div class="orders pt-5 pb-5">
      <h1 class="text-center fw-bold mb-5">Manage Orders</h1>
      <!-- Start Container -->
      <div class="container text-center">
        <form
          class="orders-filter-form mb-5"
          @submit.prevent
          v-if="listOrdersByStatus.length > 0 || isInitOrdersData"
        >
          <button
            type="submit"
            :class="[
            'btn btn-primary',
            { 'me-3': windowInnerWidth > 991 },
            { 'd-block mx-auto mb-3 w-100': windowInnerWidth < 991 },
          ]"
            @click="getAllOrders"
          >All</button>
          <button
            type="submit"
            :class="[
            'btn btn-primary',
            { 'me-3': windowInnerWidth > 991 },
            { 'd-block mx-auto mb-3 w-100': windowInnerWidth < 991 },
          ]"
            @click="getSpecificOrders('Pending')"
          >Pending</button>
          <button
            type="submit"
            :class="[
            'btn btn-primary',
            { 'me-3': windowInnerWidth > 991 },
            { 'd-block mx-auto mb-3 w-100': windowInnerWidth < 991 },
          ]"
            @click="getSpecificOrders('Sent')"
          >Sent</button>
          <button
            type="submit"
            :class="[
            'btn btn-primary',
            { 'me-3': windowInnerWidth > 991 },
            { 'd-block mx-auto mb-3 w-100': windowInnerWidth < 991 },
          ]"
            @click="getSpecificOrders('Completed')"
          >Completed</button>
        </form>
        <p class="alert alert-danger" v-if="listOrdersByStatus.length === 0">There Is Not Orders !!</p>
        <table v-else-if="windowInnerWidth > 991">
          <thead class="fw-bold">
            <tr>
              <td>no</td>
              <td>Product Name</td>
              <td>Price</td>
              <td>Amount</td>
              <td>Total</td>
              <td>Address</td>
              <td>Status</td>
              <td>Change Status</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in listOrdersByStatus" :key="order._id">
              <td>{{ index + 1 }}</td>
              <td>{{ order.name }}</td>
              <td>{{ order.price }}$</td>
              <td>{{ order.amount }}</td>
              <td>{{ order.price * order.amount }}$</td>
              <td>{{ order.address }}</td>
              <td>{{ order.status }}</td>
              <td class="fw-bold">
                <form @submit.prevent class="order-status-form">
                  <select class="status-select form-select mb-3" @change="handle_order_status_change($event, index)">
                    <option value hidden>Choose New Status Order</option>
                    <option value="Pending">Pending</option>
                    <option value="Sent">Sent</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button class="btn btn-danger" @click="editOrderStatus(index)">Save</button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Start Orders Info -->
        <section class="orders-info" v-else>
          <!-- Start Product Details Box -->
          <div
            class="order-details-box mb-5"
            v-for="(order, index) in listOrdersByStatus"
            :key="order._id"
          >
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
                  <td class="fw-bold">Change Stauts</td>
                </tr>
                <tr>
                  <td>
                    <form @submit.prevent class="order-status-form">
                      <select class="status-select form-select mb-3">
                        <option value hidden>Choose New Status Order</option>
                        <option value="Pending">Pending</option>
                        <option value="Sent">Sent</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button class="btn btn-danger" @click="editOrderStatus(index)">Save</button>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- End Product Info Box -->
        </section>
      </div>
      <!-- End Container -->
    </div>
    <!-- End Manage Orders Page -->
  </div>
</template>

<script>
import Header from "@/components/public/Header/index.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ManageOrders",
  data() {
    return {
      ordersStatus: [],
      listOrdersByStatus: [],
      isInitOrdersData: [],
      windowInnerWidth: window.innerWidth
    };
  },
  computed: {
    ...mapGetters(["userInfo", "base_api_url"])
  },
  components: {
    Header
  },
  mounted() {
    // Protect Add Product Route
    if (!this.userInfo) this.redirectToPage("/login");
    else if (!this.userInfo.isAdmin) this.redirectToPage("/");
    else {
      window.addEventListener("resize", this.resizeHandler);
      this.getAllOrders();
    }
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    ...mapActions(["redirectToPage"]),
    resizeHandler() {
      this.windowInnerWidth = window.innerWidth;
    },
    getSpecificOrders(orderStatus) {
      axios
        .get(
          `${this.base_api_url}/api/admin/manage-orders/orders/specific-orders?orderStatus=${orderStatus}`
        )
        .then(res => {
          this.listOrdersByStatus = res.data;
        })
        .catch(err => console.log(err));
    },
    getAllOrders() {
      axios
        .get(`${this.base_api_url}/api/admin/manage-orders/orders/all-orders`)
        .then(res => {
          if (res.data.length > 0) {
            this.listOrdersByStatus = res.data;
            this.isInitOrdersData = true;
          }
        });
    },
    handle_order_status_change(e, index) {
      this.ordersStatus[index] = e.target.value;
    },
    editOrderStatus(orderIndex) {
      axios
        .put(
          `${this.base_api_url}/api/admin/manage-orders/edit-order-status/${this.listOrdersByStatus[orderIndex]._id}`,
          {
            newOrderStatus: this.ordersStatus[orderIndex]
          }
        )
        .then(() => {
          document.location.reload();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>