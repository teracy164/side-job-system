<template>
    <header>
        <div>
            システム名
        </div>
        <div>
            <a @click="$auth.logout">ログアウト</a>
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