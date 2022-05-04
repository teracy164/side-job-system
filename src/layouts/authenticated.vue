<template>
    <div>
        <Header />
        <main>
            <slot></slot>
        </main>
    </div>
</template>
<script lang="ts">
import Header from "@/components/parts/header.vue";
export default defineComponent({
    components: { Header }
});
</script>
<style lang="scss">
@import '@/assets/css/valiable.scss';

main {
    margin-top: $headerHeight;
    padding: 10px;
}
</style>