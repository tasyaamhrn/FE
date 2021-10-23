<template>
  <div class="form-group">
    <div class="d-flex flex-row align-items-center">
      <i :class="fa" class="fa-lg me-3 fa-fw"></i>
      &nbsp;&nbsp;
      <slot name="form"></slot>
    </div>
    <small class="text-danger" v-if="errors">{{ errors[0] }}</small>
  </div>
</template>

<script>
export default {
  props: ["fa", "errors", "val"],
};
</script>
