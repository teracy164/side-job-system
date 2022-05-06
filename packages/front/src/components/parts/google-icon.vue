<template>
    <i class="material-icons-outlined" :style="{ 'font-size': `${fontSize} !important` }">{{ icon }}</i>
</template>
<script lang="ts">
export default defineComponent({
    props: {
        icon: {
            required: true,
            type: String,
        },
        fontSize: {
            required: false,
            type: String,
            default: '18px'
        }
    }
});
</script>
<style lang="scss" scoped>
i {
    margin-right: 3px;
    // font-size: 18px !important;
}
</style>