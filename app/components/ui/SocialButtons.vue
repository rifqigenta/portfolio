<script setup lang="ts">
import Button from "primevue/button";
</script>

<template>
  <div class="flex gap-4">
    <Button class="btn-linkedin" variant="outlined" severity="secondary">
      <i class="pi pi-linkedin text-2xl"></i>
    </Button>
    <Button class="btn-instagram" variant="outlined" severity="secondary">
      <i class="pi pi-instagram text-2xl"></i>
    </Button>
    <Button class="btn-github" variant="outlined" severity="secondary">
      <i class="pi pi-github text-2xl"></i>
    </Button>
  </div>
</template>

<style scoped>
.btn-linkedin:hover {
  background: #0077b5 !important;
  color: white !important;
  border-color: #0077b5 !important;
  box-shadow: 0 0 15px #0077b566;
}

.btn-instagram:hover {
  background: #e1306c !important;
  color: white !important;
  border-color: #e1306c !important;
  box-shadow: 0 0 15px #e1306c66;
}

.btn-github:hover {
  background: #ffffff !important;
  color: #000 !important;
  border-color: #ffffff !important;
  box-shadow: 0 0 15px #ffffff66;
}
</style>
