<template>
    <Dialog :visible="visible" @update:visible="onclose">
        <template v-slot:header>
            <h1>{{ isEdit() ? '編集' : '追加' }}</h1>
        </template>
        <div @click.stop="">
            <div class="form-item">
                <label>タイトル</label>
                <input v-model="editData.title">
            </div>
            <div class="form-item">
                <label>概要</label>
                <textarea v-model="editData.description"></textarea>
            </div>
            <div class="form-item">
                <label>依頼者</label>
                <input v-model="editData.client">
            </div>
            <div class="form-item">
                <label>タグ</label>
                <input v-model="editData.tags">
            </div>
            <div class="form-item">
                <label>報酬</label>
                <input style="width: 150px" v-model="editData.price">円
            </div>
            <div class="form-item">
                <label>期限</label>
                <input type="date" style="width: 150px" v-model="editData.expireDate">
            </div>
            <div class="form-item">
                <label>備考</label>
                <textarea v-model="editData.note"></textarea>
            </div>
        </div>
        <template v-slot:footer>
            <div></div>
            <div>
                <button @click="cancel">キャンセル</button>
                <button class="primary" @click="save">保存</button>
            </div>
        </template>
    </Dialog>
</template>
<script lang="ts">
import GoogleIcon from '@/components/parts/google-icon.vue';
import { PropType } from 'vue';
import { Task } from '~~/lib/api-client';
import Dialog from '../parts/dialog.vue';

export default defineComponent({
    props: {
        visible: {
            required: true,
            type: Boolean,
        },
        task: {
            required: false,
            type: Object as PropType<Task>,
            default: () => { }
        },
    },
    setup(props, context) {
        const editData = {
            title: '',
            description: '',
            client: '',
            expireDate: '',
            price: 0,
            recruitmentNumber: 0,
            tags: '',
            note: '',
        };
        if (props.task) {
            Object.assign(editData, props.task);
        }
        const data = reactive<{ editData: Task | null }>({ editData });
        return { ...data }
    },
    methods: {
        isEdit() {
            return !!this.task?.id;
        },
        async save() {
            if (!this.editData) {
                return;
            }
            // TODO バリデーション

            let result: Task;
            if (this.isEdit()) {
                result = await this.$api.updateTask({ id: this.task.id as number, task: this.editData });
            } else {
                result = await this.$api.addTask({ task: this.editData });
            }
            this.$emit('update:task', result);
        },
        cancel() {
            this.onclose(false);
        },
        onclose(closed: boolean) {
            this.$emit('update:visible', closed);
        }
    },
    components: { GoogleIcon, Dialog },
});
</script>
<style lang="scss" scoped>
h1 {
    margin: 0;
    font-size: 1.3em;
}
</style>