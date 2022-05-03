<template>
    <div class="card task">
        <div class="title">
            {{ task.title }}
            <div style="display:flex; align-items: center; font-size: 0.6em; zoom:90%;">
                <GoogleIcon icon="account_circle" title="依頼者" />{{ task.client }}
            </div>
        </div>
        <div class="contents">
            <pre>{{ task.description }}</pre>
        </div>
        <div class="footer">
            <div style="font-size: 0.8em">
                <div style="display: flex; ">
                    <div class="v-center">
                        <GoogleIcon icon="payments" title="報酬" /> {{ $currency(task.price) }}
                    </div>
                    <div class="v-center">
                        <GoogleIcon icon="event" title="期限" />{{ $dateFormat(task.expireDate) }}
                    </div>
                </div>
                <div class="v-center">
                    <GoogleIcon icon="people" />{{ task.assigners?.length }}/{{ task.recruitmentNumber }}
                </div>
            </div>
            <button>詳細</button>
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
    components: { GoogleIcon },
});
</script>
<style lang="scss">
.task {
    width: 300px;
    margin: 5px;
}

.card {
    .contents {
        height: 150px;
        max-height: 150px;
        overflow-y: auto;

        pre {
            font: inherit;
            white-space: pre-wrap;
        }
    }
}
</style>