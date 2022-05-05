<template>
    <div class="dropdown-menu">
        <div ref="menu" class="title" :class="{ show: isShow }" @click.stop="toggle">
            <a>
                <GoogleIcon v-if="icon" :icon="icon" />{{ title }}
            </a>
        </div>
        <div v-show="isShow" ref="overlayPanel" class="overlay-panel">
            <div v-if="isShow" class="menu-items">
                <div v-for="item of menuItems" class="menu-item" @click="onclick($event, item)">
                    <a>{{ item.message }}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { PropType } from "vue";
import GoogleIcon from "./google-icon.vue";

export interface DropdownItem {
    message: string;
    link?: string;
    icon?: string;
    onclick?: (event: Event) => void;
    // TODO
    // children?: DropdownItem[];
}

export default defineComponent({
    props: {
        title: {
            required: false,
            default: '',
        },
        icon: {
            required: false,
            default: '',
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
            document.addEventListener("click", (e) => {
                const el = e.target as HTMLElement;
                if (!el.closest("overlay-panel")) {
                    this.hidden();
                }
            });
        }
    },
    methods: {
        toggle(event: Event) {
            if (this.isShow) {
                this.hidden();
            }
            else {
                this.show();
            }
        },
        show() {
            this.isShow = true;
            this.$nextTick(() => {
                if (this.overlayPanel) {
                    // 画面からはみ出る場合は右寄せで表示
                    const el = this.overlayPanel as HTMLElement;
                    const right = el.getBoundingClientRect().left + el.clientWidth;
                    if ((window.innerWidth - 20) < right) {
                        el.style.left = 'unset';
                        el.style.right = '0';
                    }
                }
            })
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
    components: { GoogleIcon }
});
</script>
<style lang="scss" scoped>
.dropdown-menu {
    position: relative;
}

.title {
    cursor: pointer;
    user-select: none;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;

    a {
        line-height: 1em;
    }

    a:active {
        transform: unset !important;
    }
}

.title::after {
    content: '▼';
    font-size: 12px;
    color: lightgray;
}

.title.show::after {
    content: '▲';
}

// .title:hover {
//     background-color: #e6e6ff;
// }

.title:active {
    transform: translateX(1px) translateY(1px);
}

.overlay-panel {
    position: absolute;
    padding: 10px 0;
    background-color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 10px lightgray;
    z-index: 1001;

    .menu-items {
        .menu-item {
            padding: 3px 10px;
            cursor: pointer;
            white-space: nowrap;

            a:hover {
                color: #6666ff;
            }
        }

        .menu-item:hover {
            background-color: #e6e6ff;
        }

        .menu-item:last-child {
            margin-bottom: unset;
        }
    }

}
</style>