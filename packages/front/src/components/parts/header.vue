<template>
    <header>
        <div class="wrapper">
            <div style="height: 100%">
                <div class="logo" @click="navigate('/')">
                    <h1><span class="s">S</span>ha<span class="f">F</span>uku</h1>
                    <span class="subtitle">-社内副業システム-</span>
                </div>
            </div>
            <div class="v-center" style="height: 100%">
                <router-link to="/tasks" class="menu-item mr-10 v-center">
                    <GoogleIcon icon="search" />仕事を探す
                </router-link>
                <router-link to="/achievements" class="menu-item mr-10 v-center">
                    <GoogleIcon icon="emoji_events" />実績
                </router-link>
                <DropdownMenu :title="'管理者用'" :menu-items="adminMenuItems" />
                <DropdownMenu icon="manage_accounts" :menu-items="menuItems" />
            </div>
        </div>
    </header>
</template>
<script lang="ts">
import DropdownMenu, { DropdownItem } from "@/components/parts/dropdown-menu.vue";
import GoogleIcon from "./google-icon.vue";
export default defineComponent({
    setup() {
        const logout = () => {
            const { $auth } = useNuxtApp();
            $auth.logout();
        };

        const menuItems: DropdownItem[] = [
            { message: '設定', icon: 'settings', link: '/settings' },
            { message: 'ログアウト', icon: 'logout', onclick: logout }
        ];

        const adminMenuItems: DropdownItem[] = [
            { message: '仕事の依頼', icon: 'playlist_add', link: '/management/tasks' },
            { message: 'メンバーの状況', icon: 'supervised_user_circle' },
            { message: 'ユーザー一覧', icon: 'groups', link: '/management/users' },
        ];

        return { menuItems, adminMenuItems }
    },
    methods: {
        navigateTop() {
            const router = useRouter();
            router.push('/');
        },
        navigate(path: string) {
            const router = useRouter();
            router.push(path);
        },
    },
    components: { DropdownMenu, GoogleIcon }
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
    background-color: rgba(230, 230, 255, 0.2);

    .wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
    }
}

.logo {
    position: relative;
    user-select: none;
    height: 100%;
    line-height: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 5px;
    text-align: center;

    .s,
    .f {
        color: #9999ff;
        font-size: 26px;
    }

    h1 {
        font-size: 1.2em;
        font-style: italic;
        margin: 0;
    }

    .subtitle {
        font-size: 0.6em;
        zoom: 95%;
        color: #aaaa66
    }
}

.logo:hover {
    background-color: rgba(230, 230, 255, 0.4);
    cursor: pointer;
}
</style>