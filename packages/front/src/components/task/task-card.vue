<template>
    <div class="card task" @click="onclick($event, task)">
        <div class="header">
            <p class="title" :title="task.title">{{ task.title }}</p>
            <div style="display:flex; align-items: center; font-size: 0.7rem;">
                <GoogleIcon icon="account_circle" title="依頼者" font-size="1.3em" />{{ task.client }}
            </div>
        </div>
        <div class="contents">
            <pre>{{ task.description }}</pre>
        </div>
        <div class="footer">
            <div style="font-size: 0.8em">
                <div style="display: flex; ">
                    <div class="v-center" style="margin-right: 10px">
                        <GoogleIcon icon="payments" title="報酬" /> {{ $currency(task.price) }}
                    </div>
                    <div class="v-center">
                        <GoogleIcon icon="event" title="期限" />{{ $dateFormat(task.expireDate) }}
                    </div>
                </div>
                <div class="v-center">
                    <GoogleIcon icon="people" title="募集人数" />{{ task.assigners?.length }}/{{ task.recruitmentNumber }}
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
        const onclick = (event: Event, task: Task) => context.emit('onclick', event, task);
        return { onclick }
    },
    components: { GoogleIcon },
});
</script>
<style lang="scss" scoped>
.header {
    .title {
        white-space: nowrap;
        max-width: 100%;
        overflow-x: hidden;
        text-overflow: ellipsis;
        margin: 0
    }
}

.task {
    min-width: 250px;
    max-width: 250px;
    margin: 5px;
}

.task:hover {
    background-color: #f9f9ff;
    cursor: pointer;
}

.card {
    .contents {
        height: 120px;
        max-height: 120px;
        overflow-y: auto;
    }
}
</style>