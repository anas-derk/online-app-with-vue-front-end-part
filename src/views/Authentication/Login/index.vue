<template>
  <div>
    <!-- Start Login Page -->
    <Header></Header>
    <div class="login pt-5 pb-5">
      <h1 class="text-center fw-bold mb-5">Login</h1>
      <!-- Start Container -->
      <div class="container text-center">
        <!-- Start Login Form -->
        <form
          :class="[
            'login-form',
            { 'mb-4': loginError },
            { 'mb-5': !loginError },
          ]"
          @submit.prevent
        >
          <input
            type="email"
            placeholder="Email"
            class="form-control mb-4"
            required
            v-model.trim="email"
          />
          <input
            type="password"
            placeholder="Password"
            class="form-control mb-4"
            required
            v-model.trim="password"
          />
          <button
            type="submit"
            class="btn btn-primary create-account-btn"
            @click="loginNow(email, password)"
          >
            Login
          </button>
        </form>
        <!-- End Login Form -->
        <p class="alert alert-danger" v-if="loginError">{{ loginError }}</p>
        <p class="alert alert-info" v-if="waitMessage">{{ waitMessage }}</p>
        <h6>
          <span>Don't have account ? </span>
          <router-link to="/sign-up">Create Account</router-link>
        </h6>
      </div>
      <!-- End Container -->
    </div>
    <!-- End Login Page -->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Header from "@/components/public/Header/index.vue";
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      waitMessage: "",
      loginError: "",
    };
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters(["base_api_url"]),
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    ...mapActions(["redirectToPage"]),
    loginNow(email, password) {
      this.waitMessage = "Please Wait While Verification And Logging In ...";
      axios
        .get(
          `${this.base_api_url}/api/auth/login?email=${email}&password=${password}`
        )
        .then((res) => {
          let data = res.data;
          setTimeout(() => {
              this.waitMessage = "";
              if (typeof data == "string") {
                this.loginError = data;
                setTimeout(() => {
                  this.loginError = "";
                }, 2000);
              } else {
                localStorage.setItem("user-info", JSON.stringify(data));
                this.setUserInfo(data);
                setTimeout(() => {
                  this.waitMessage = "";
                  this.redirectToPage("/");
                }, 2000);
              }
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>