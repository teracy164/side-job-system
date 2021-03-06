<template>
    <Dialog :visible="visible" @update:visible="close">
        <template v-slot:header>
            <h1> {{ task.title }} </h1>
            <div style="font-size: 0.8em">
                <div class="v-center">
                    <div class="mr-10 ">依頼者：{{ task.client }}</div>
                    <div class="mr-10 ">作成日：{{ $dateFormat(task.createdAt) }}</div>
                    <div class="mr-10 ">作成者：{{ task.createUserId }}</div>
                </div>
                <div class="tags">
                    <div v-for="tag of tags()" class="tag">{{ tag }}</div>
                </div>
            </div>
        </template>
        <div>
            <h4><label>概要</label></h4>
            <div class="content">
                <pre>{{ task.description }}</pre>
            </div>

            <h4><label>条件等</label></h4>
            <div class="content" style="display: flex; flex-wrap: wrap">
                <div style="flex-basis: 30%"><label>報酬</label></div>
                <div style="flex-basis: 70%">{{ $currency(task.price) }}</div>
                <div style="flex-basis: 30%"><label>期限</label></div>
                <div style="flex-basis: 70%">{{ $dateFormat(task.expireDate) }}</div>
                <div style="flex-basis: 30%"><label>備考</label></div>
                <div style="flex-basis: 70%">
                    <pre>{{ task.note }}</pre>
                </div>
            </div>

            <h4><label>募集状況</label></h4>
            <div class="content" style="display: flex; flex-wrap: wrap">
                <div style="flex-basis: 30%"><label>募集人数</label></div>
                <div style="flex-basis: 70%">{{ task.recruitmentNumber }}</div>
                <div style="flex-basis: 30%"><label>仕事を受けた人</label></div>
                <div style="flex-basis: 70%">
                    <div v-if="task.assigners?.length" v-for="assigner of task.assigners">
                        {{ assigner.name }}
                    </div>
                    <div v-else>なし</div>
                </div>
            </div>
        </div>
        <template v-slot:footer>
            <div>
                <button v-if="isAssigned()" class="danger" @click="cancelTask">仕事をキャンセル</button>
                <template v-else>
                    <button v-if="acceptable" class="primary" @click="takeTask">仕事を受ける</button>
                </template>
            </div>
            <div>
                <button @click="close">閉じる</button>
                <button v-if="editable" class="primary" @click="edit">編集</button>
            </div>
        </template>
    </Dialog>
    <TaskEditOverlay v-if="visible && editable" :visible="visibleEditDialog" :task="task" @update:task="updateTask"
        @update:visible="oncloseEditDialog" />
    <Confirm ref="confirm" />
</template>
<script lang="ts">
import GoogleIcon from '@/components/parts/google-icon.vue';
import Confirm from '@/components/parts/confirm.vue';
import dayjs from 'dayjs';
import { PropType } from 'vue';
import { Task } from '~~/lib/api-client';
import Dialog from '../parts/dialog.vue';
import TaskEditOverlay from './task-edit-overlay.vue';

export default defineComponent({
    props: {
        visible: {
            required: true,
            type: Boolean,

        },
        task: {
            required: true,
            type: Object as PropType<Task>,
        },
        editable: {
            required: false,
            type: Boolean,
            default: false,
        }
    },
    setup(props, context) {
        const task = props.task;

        // 受領可能かチェック
        let acceptable = dayjs().isBefore(task.expireDate, 'date');
        if (task.assigners?.length) {
            if (task.assigners.length === task.recruitmentNumber) {
                // すでに募集人数に達している場合は受託負荷
                acceptable = false;
            }
        }

        const data = reactive({ visibleDialog: props.visible, visibleEditDialog: false, acceptable });
        return data;
    },
    methods: {
        tags() {
            return this.task.tags.split(',');
        },
        edit() {
            // 詳細ダイアログを閉じて、編集ダイアログを表示
            this.visibleDialog = false;
            this.visibleEditDialog = true;
        },
        updateTask(task: Task) {
            this.visibleEditDialog = false;
            this.visibleDialog = false;
            this.$emit('update:task', task);
            this.$emit('update:visible', false)
        },
        oncloseEditDialog() {
            // 編集ダイアログを閉じて、詳細ダイアログを再表示
            this.visibleEditDialog = false;
            this.visibleDialog = true;
        },
        close() {
            this.$emit('update:visible', false)
        },
        isAssigned() {
            const loginUserId = this.$auth.getLoginUser()?.id || -1;
            if (loginUserId > 0) {
                return this.task.assigners?.some(a => a.id === loginUserId) || false;
            }
            return false;
        },
        async takeTask() {
            (this.$refs.confirm as any).show({
                title: '確認',
                message: 'タスクを受領します。よろしいですか？',
                onaccept: this.procTakeTask
            });
        },
        async procTakeTask() {
            try {
                const task = await this.$api.assignTask({ id: this.task.id as number });
                this.task.assigners?.splice(0, this.task.assigners.length, ...(task.assigners || []));
                this.$emit('update:assigner', task);
            } catch (err) {
                alert(err);
            }
        },
        cancelTask() {
            (this.$refs.confirm as any).show({
                title: '確認',
                message: 'キャンセルしてよろしいですか？',
                onaccept: this.procCancelTask
            });
        },
        async procCancelTask() {
            try {
                await this.$api.cancelTask({ id: this.task.id as number });

                if (this.task.assigners?.length) {
                    const userId = this.$auth.getLoginUser()?.id || -1;
                    const targetIndex = this.task.assigners.findIndex(a => a.id === userId);
                    if (targetIndex >= 0) this.task.assigners?.splice(targetIndex, 1);
                }
                this.$emit('update:assigner', this.task);
            } catch (err) {
                alert(err)
            }
        }
    },
    components: { GoogleIcon, Dialog, TaskEditOverlay, Confirm },
});
</script>
<style lang="scss" scoped>
.card {
    box-shadow: unset !important;
}

h1 {
    margin: 0;
    font-size: 1.5em;
}

h4 {
    margin-bottom: 0;

    label {
        border-bottom: 1px solid black;
    }
}

.tags {
    display: flex;
    flex-wrap: wrap;

    .tag {
        background-color: #9999ff;
        border-radius: 20px;
        padding: 0px 10px;
        margin-right: 3px;
        color: white;
    }
}

.content {
    padding: 5px 10px;
}
</style>