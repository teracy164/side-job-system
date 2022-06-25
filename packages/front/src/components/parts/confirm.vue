<template>
    <div class="overlay-panel" v-if="isShow" @click="clickOutside">
        <div class="wrapper">
            <div class="card shadow" @click.stop="">
                <div class="confirm-header">
                    <h4 style="margin: 0">{{ title }}</h4>
                </div>
                <div class="confirm-contents">
                    <pre>{{ message }}</pre>
                </div>
                <div class="confirm-footer">
                    <button @click="onCancel">キャンセル</button>
                    <button class="primary" @click="onAccept">OK</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import GoogleIcon from '@/components/parts/google-icon.vue';

interface Options {
    title: string;
    message: string;
    onaccept?: () => void;
    oncancel?: () => void;
}
interface State extends Options {
    isShow: boolean;
}
export default defineComponent({
    setup(props, context) {
        const state = reactive<State>({ isShow: false, title: '', message: '', onaccept: undefined, oncancel: undefined });
        return state;
    },
    mounted() {
        document.addEventListener('keyup', (e) => {
            if (e.key.toLocaleLowerCase() === 'escape') {
                this.close();
            }
        })
    },
    methods: {
        show(options: Options) {
            this.isShow = true;
            this.title = options.title;
            this.message = options.message;
            this.onaccept = options.onaccept;
            this.oncancel = options.oncancel;
        },
        close() {
            this.isShow = false;
        },
        clickOutside() {
            this.close();
        },
        onAccept() {
            this.close();
            if (this.onaccept) this.onaccept();
        },
        onCancel() {
            this.close();
            if (this.oncancel) this.oncancel();
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
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper {
        padding: 20px;

        .card {
            min-width: 300px;

            .confirm-header {
                h4 {
                    margin: 0;
                }
            }

            .confirm-contents {
                padding: 10px 0;

                pre {
                    font: inherit;
                }
            }

            .confirm-footer {
                text-align: right;
            }
        }
    }
}
</style>