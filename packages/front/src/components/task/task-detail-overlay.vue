<template>
    <div class="detail-panel" @click="onclose($event, task)">
        <div class="wrapper">
            <div class="btn-area">
                <button class="btn-close icon-btn" @click.stop="onclose($event, task)">
                    <GoogleIcon icon="close" />
                </button>
            </div>

            <div class="task" @click.stop="">
                <div class="task-wrapper">
                    <TaskDetail :task="task" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import GoogleIcon from '@/components/parts/google-icon.vue';
import { PropType } from 'vue';
import { Task } from '~~/lib/api-client';

export default defineComponent({
    props: {
        task: {
            required: true,
            type: Object as PropType<Task>,
        }
    },
    setup(props, context) {
        const onclose = (event: Event, task: Task) => context.emit('onclose', event, task);
        document.addEventListener('keyup', e => {
            if (e.key.toLocaleLowerCase() === 'escape') {
                onclose(e, props.task);
            }
        })
        return { onclose }
    },
    components: { GoogleIcon },
});
</script>
<style lang="scss" scoped>
.detail-panel {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgb(0, 0, 0, 0.7);
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

        .task {
            width: 800px;
            max-width: 95vw;

            .task-wrapper {
                background-color: white;
                border-radius: 5px;
                padding: 20px;

            }
        }

    }
}
</style>