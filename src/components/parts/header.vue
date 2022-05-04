<template>
    <header>
        <div class="wrapper">
            <div style="height: 100%">
                <div class="logo" @click="navigate('/')">
                    <h1>ShaFuku</h1>
                    <span class="subtitle">-社内副業システム-</span>
                </div>
            </div>
            <div class="v-center" style="height: 100%">
                <a class="menu-item mr-10" @click="navigate('/tasks')">仕事を探す</a>
                <a class="menu-item mr-10" @click="navigate('/board')">マイボード</a>
                <DropdownMenu :title="'管理者用'" :menu-items="adminMenuItems" />
                <DropdownMenu icon="manage_accounts" :menu-items="menuItems" />
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
            { message: '設定', link: 'setting' },
            { message: 'ログアウト', onclick: logout }
        ];

        const adminMenuItems: DropdownItem[] = [
            { message: '仕事を依頼する' },
            { message: 'メンバーの状況を確認' },
            { message: 'ユーザー一覧' },
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

.logo {
    position: relative;
    user-select: none;
    height: 100%;
    line-height: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 5px;

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
    background-color: #e6e6ff;
    cursor: pointer;
}
</style>