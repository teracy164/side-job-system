<template>
  <div style="display: flex">
    ボード
    <br>
    タスクの受領状況、ステータスが見えます
  </div>
</template>
<script lang="ts">
definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
});
</script>
<style lang="scss" scoped>
</style>