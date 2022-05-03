<template>
    <div class="detail">
        <div class="title">
            <h1>{{ task.title }}</h1>
            <div>
                依頼者：{{ task.client }}
            </div>
        </div>
        <div class="contents">
            <pre>{{ task.description }}</pre>
            <div>
                報酬：{{ $currency(task.price) }}
                期限：{{ $dateFormat(task.expireDate) }}
            </div>
            <div>
                仕事を受けた人
                <div v-if="task.assigners?.length" v-for="assigner of task.assigners">
                    {{ assigner.name }}
                </div>
                <div v-else>なし</div>
            </div>
        </div>
        <div class="footer">
            <div>

                <button>編集</button>

            </div>
            <div>
                <button>仕事を受ける</button>
                <button class="danger">仕事をキャンセル</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import GoogleIcon from '@/components/parts/google-icon.vue';
import { Task } from "@/types/task";
import { PropType } from 'vue';

export default defineComponent({
    props: {
        task: {
            required: true,
            type: Object as PropType<Task>,
        }
    },
    setup() {
        console.log('detail start')
    },
    components: { GoogleIcon },
});
</script>
<style lang="scss">
.detail {

    pre {
        margin: 0;
        font: inherit;
        white-space: pre-wrap;
    }

    .footer {
        display: flex;
        justify-content: space-between;
    }
}
</style>