<template>
  <div class="online-store">
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/public/Footer/index.vue";

export default {
  components: {
    Footer,
  },
};
</script>