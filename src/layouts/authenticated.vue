<template>
    <header>
        <div class="wrapper">
            <div>
                <div class="title">
                    <h1>ShaFuku</h1>
                    <span class="subtitle">-社内副業システム-</span>
                </div>
            </div>
            <div>
                <a @click="$auth.logout">ログアウト</a>
            </div>
        </div>
    </header>
    <main>
        <slot></slot>
    </main>
</template>
<script lang="ts">
export default defineComponent({
    methods: {
        logout() {
            const { $auth } = useNuxtApp();
            $auth.logout();
        }
    }
});
</script>
<style lang="scss">
.title {
    position: relative;

    h1 {
        font-size: 1.2em;
        font-style: italic;
        line-height: 0.6em;
    }

    .subtitle {
        position: absolute;
        top: 100%;
        font-size: 0.6em;
        zoom: 95%;
        color: #aaaa66
    }
}
</style>