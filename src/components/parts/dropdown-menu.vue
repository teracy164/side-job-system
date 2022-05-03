<template>
    <div>
        <div ref="menu" class="dropdown-menu" :class="{ show: isShow }" @click.stop="toggle">
            <a>{{ title }}</a>
        </div>
        <div v-show="isShow" ref="overlayPanel" class="overlay-panel">
            <div v-if="isShow" class="menu-items">
                <div v-for="item of menuItems" class="menu-item">
                    <a @click="onclick($event, item)">{{ item.message }}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { PropType } from "vue";

export interface DropdownItem {
    message: string;
    link: string;
    onclick?: (event: Event) => void;
    // TODO
    children?: DropdownItem[];
}

export default defineComponent({
    props: {
        title: {
            required: true,
            type: String,
        },
        menuItems: {
            required: true,
            type: Object as PropType<DropdownItem[]>,
        }
    },
    setup() {
        const menu = ref(null);
        const overlayPanel = ref(null);
        const data = reactive({ isShow: false, top: 0, left: 0, menu, overlayPanel });

        return data;
    },
    mounted() {
        if (this.overlayPanel) {
            // パネル外クリック時に閉じるようにする
            document.addEventListener('click', (e) => {
                const el = e.target as HTMLElement;
                if (!el.closest('overlay-panel')) {
                    this.hidden();
                }
            })
        }

    },
    methods: {
        toggle(event: Event) {
            if (this.isShow) {
                this.hidden();
            } else {
                this.show();
            }
        },
        show() {
            this.isShow = true;
        },
        hidden() {
            this.isShow = false;
        },
        onclick(event: Event, item: DropdownItem) {
            if (item.onclick) {
                item.onclick(event);
            }
            if (item.link) {
                const router = useRouter();
                router.push(item.link);
            }
            this.hidden();
        },
    },
});
</script>
<style lang="scss">
.dropdown-menu {
    cursor: pointer;
    user-select: none;
    padding: 5px 10px;
    border-radius: 5px;
}

.dropdown-menu::after {
    content: '▼';
    font-size: 12px;
    color: lightgray;
}

.dropdown-menu.show::after {
    content: '▲';
}

.dropdown-menu:hover {
    background-color: #e9e9e9;
}

.overlay-panel {
    position: absolute;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 10px lightgray;

    .menu-items {
        .menu-item {
            margin-bottom: 5px;
        }

        .menu-item:last-child {
            margin-bottom: unset;
        }
    }

}
</style>