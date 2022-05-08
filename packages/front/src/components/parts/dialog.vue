<template>
    <div class="overlay-panel" v-if="isShow" @click="clickOutside">
        <div class="wrapper">
            <div class="btn-area">
                <button class="btn-close icon-btn" @click.stop="close">
                    <GoogleIcon icon="close" />
                </button>
            </div>

            <div class="card" :style="{ width: width || '600px', 'max-width': '90vw' }" @click.stop="">
                <div class="header">
                    <slot name="header"></slot>
                </div>
                <div class="contents">
                    <slot></slot>
                </div>
                <div class="footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import GoogleIcon from '@/components/parts/google-icon.vue';

export default defineComponent({
    props: {
        visible: {
            required: false,
            type: Boolean,
            default: false,
        },
        width: {
            required: false,
            type: String,
            default: '',
        },
        closeOnOutside: {
            required: false,
            tyep: Boolean,
            default: false,
        }
    },
    watch: {
        visible(value: boolean) {
            this.isShow = value;
        }
    },
    setup(props, context) {
        const { isShow } = reactive({ isShow: props.visible || false });
        return { onclose, isShow }
    },
    mounted() {
        document.addEventListener('keyup', e => {
            if (e.key.toLocaleLowerCase() === 'escape') {
                this.close(e);
            }
        })
    },
    methods: {
        show() {
            this.isShow = true;
        },
        close(event: Event) {
            this.isShow = false;
            this.$emit('onclose', event);
        },
        clickOutside(event: Event) {
            if (this.closeOnOutside) {
                this.close(event);
            }
        }
    },
    components: { GoogleIcon },
});
</script>
<style lang="scss" scoped>
.overlay-panel {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgb(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;

    .wrapper {
        padding: 20px;

        .btn-area {
            width: 100%;
            text-align: right;

            .btn-close {
                color: white;
            }

            .btn-close:hover {
                background-color: rgba(100, 100, 100, 0.7);
            }
        }
    }
}
</style>