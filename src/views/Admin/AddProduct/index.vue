<template>
  <Header />
  <!-- Start Add Product Page -->
  <div class="add-product pt-5 pb-5">
    <h1 class="text-center fw-bold mb-5">Add Product</h1>
    <!-- Start Container -->
    <div class="container text-center">
      <form class="add-product-form" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Name"
          class="form-control mb-4"
          required
        />
        <input
          type="number"
          placeholder="Price"
          class="form-control mb-4"
          required
        />
        <textarea
          placeholder="Description"
          class="form-control mb-4"
          required
        ></textarea>
        <select class="form-select mb-4" required>
          <option value="" hidden>Choose Category</option>
          <option value="phones">Phones</option>
          <option value="clothes">Clothes</option>
          <option value="computers">Computers</option>
        </select>
        <input type="file" name="file" class="form-control mb-4" required />
        <button type="submit" class="btn btn-primary me-4">Add Product</button>
        <button type="reset" class="btn btn-primary">Reset</button>
      </form>
    </div>
    <!-- End Container -->
  </div>
  <!-- End Add Product -->
</template>

<script>
import Header from "@/components/public/Header/index.vue";
export default {
  name: "AddProduct",
  components: {
    Header,
  },
};
</script>