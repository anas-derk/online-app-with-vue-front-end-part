<template>
  <Header />
  <!-- Start Signup Page -->
  <div class="sign-up pt-5 pb-5">
    <h1 class="text-center fw-bold mb-5">Create Account</h1>
    <!-- Start Container -->
    <div class="container text-center">
      <!-- Start Signup Form -->
      <form class="signup-form mb-4" @submit.prevent="createAccount">
        <input
          type="text"
          placeholder="User Name"
          class="form-control mb-4"
          required
          v-model.trim="userName"
        />
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
          class="form-control password mb-4"
          required
          pattern=".{8,}"
          title="Password Must contain at least Eight Number"
          v-model.trim="password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          class="form-control confirm-password mb-4"
          required
          pattern=".{8,}"
          title="Password Must contain at least Eight Number"
          v-model.trim="confirmPassword"
        />
        <button type="submit" class="btn btn-primary create-account-btn">
          Create Account
        </button>
      </form>
      <!-- End Signup Form -->
      <p class="alert alert-danger error-in-user-side" v-if="signupError">
        {{ signupError }}
      </p>
      <p class="alert alert-info" v-if="signupWaitMessage">
        {{ signupWaitMessage }}
      </p>
      <p class="alert alert-success" v-if="signupSuccessMessage">
        {{ signupSuccessMessage }}
      </p>
      <h6>
        <span>Already have account ? </span>
        <router-link to="/login">Login</router-link>
      </h6>
    </div>
    <!-- End Container -->
  </div>
  <!-- End Signup Page -->
</template>

<script>
import Header from "@/components/public/Header/index.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      signupError: "",
      signupWaitMessage: "",
      signupSuccessMessage: "",
    };
  },
  mounted() {
    if (this.userInfo) this.redirectToPage("/");
  },
  computed: {
    ...mapGetters(["base_api_url", "userInfo"]),
  },
  components: {
    Header,
  },
  methods: {
    ...mapActions(["redirectToPage"]),
    createAccount() {
      // validation that the password it same confirm password
      if (this.password !== this.confirmPassword) {
        this.signupError =
          "There is no Matches Between Password And Confirm Password !!";
        const signupTimeout = setTimeout(() => {
          this.signupError = "";
          clearTimeout(signupTimeout);
        }, 2000);
      } else {
        this.signupWaitMessage =
          "Please Wait While Verification And Signup ...";
        // create account by API Call
        axios
          .post(`${this.base_api_url}/api/auth/signup`, {
            userName: this.userName,
            password: this.password,
            email: this.email,
          })
          .then((res) => {
            const signupWaitTimeout = setTimeout(() => {
              this.signupWaitMessage = "";
              let data = res.data;
              if (typeof data === "string") {
                this.signupError = data;
                const signupTimeout = setTimeout(() => {
                  this.signupError = "";
                  clearTimeout(signupTimeout);
                }, 2000);
              } else {
                this.signupSuccessMessage =
                  "Ok, The Signup Process Is Successfuly ...";
                setTimeout(() => {
                  this.signupSuccessMessage = "";
                  this.redirectToPage("/login");
                }, 2000);
              }
              clearTimeout(signupWaitTimeout);
            }, 2000);
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>