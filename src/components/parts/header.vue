<template>
    <header>
        <div class="wrapper">
            <div>
                <div class="title">
                    <h1>ShaFuku</h1>
                    <span class="subtitle">-社内副業システム-</span>
                </div>
            </div>
            <div class="v-center">
                <a class="menu-item">仕事を探す</a>
                <a class="menu-item">マイボード</a>
                <DropdownMenu :title="'管理'" :menu-items="adminMenuItems" />
                <DropdownMenu :title="'ログインユーザー'" :menu-items="menuItems" />
            </div>
        </div>
    </header>
</template>
<script lang="ts">
import DropdownMenu, { DropdownItem } from "@/components/parts/dropdown-menu.vue";
export default defineComponent({
    setup() {
        const logout = () => {
            const { $auth } = useNuxtApp();
            $auth.logout();
        };

        const menuItems: DropdownItem[] = [
            { message: '実績', link: 'achievements' },
            { message: 'ランキング', link: 'ranking' },
            { message: 'ログアウト', onclick: logout }
        ];

        const adminMenuItems: DropdownItem[] = [
            { message: '仕事を依頼する' },
            { message: '確認' },
            { message: 'ユーザー一覧' },
        ];

        return { menuItems, adminMenuItems }
    },
    components: { DropdownMenu }
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/valiable.scss';

header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: $headerHeight;
    background-color: rgba(200, 200, 255, 0.2);

    .wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
    }
}

.title {
    position: relative;
    user-select: none;

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

.menu-item {
    margin-right: 10px;
}
</style>