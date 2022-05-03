<template>
    <i class="material-icons-outlined">{{ icon }}</i>
</template>
<script lang="ts">
export default defineComponent({
    props: {
        icon: {
            required: true,
            type: String,
        }
    }
});
</script>
<style lang="scss">
i {
    margin-right: 3px;
    font-size: 16px !important;
}
</style>