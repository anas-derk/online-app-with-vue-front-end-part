<template>
  <!-- Start Header -->
  <header>
    <!-- Start Navbar From Bootstrap -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/"
          >Online Shop</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div class="navbar-nav">
            <router-link class="nav-link text-white" aria-current="page" to="/">
              Home
            </router-link>
            <router-link class="nav-link text-white" to="/cart" v-if="userInfo">
              Cart
            </router-link>
            <router-link
              class="nav-link text-white"
              to="/orders"
              v-if="userInfo"
            >
              Orders
            </router-link>
            <router-link
              class="nav-link text-white"
              to="/login"
              v-if="!userInfo"
            >
              Login
            </router-link>
            <router-link
              class="nav-link text-white"
              to="/sign-up"
              v-if="!userInfo"
            >
              Signup
            </router-link>
            <router-link
              class="nav-link text-white"
              to="/admin/add-product"
              v-if="userInfo && userInfo.isAdmin"
            >
              Add Product
            </router-link>
            <router-link
              class="nav-link text-white"
              to="/admin/manage-orders"
              v-if="userInfo && userInfo.isAdmin"
            >
              Manage Orders
            </router-link>
            <button class="btn btn-danger" @click="logout" v-if="userInfo">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <!-- End Navbar From Bootstrap -->
  </header>
  <!-- End Header -->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapMutations(["clearUserInfo"]),
    ...mapActions(["redirectToPage"]),
    logout() {
      // clear user-info key from local storage
      localStorage.removeItem("user-info");
      // update the user info state in store by dispatch method
      this.clearUserInfo();
      // redirect to login page after logout process is successfuly !
      this.redirectToPage("/login");
    },
  },
};
</script>