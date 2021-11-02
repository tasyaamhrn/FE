<template>
  <div>
    <small class="text-danger" v-if="errors">{{ errors[0] }}</small>
  </div>
</template>

<script>
export default {
  props: ["errors"],
};
</script>
