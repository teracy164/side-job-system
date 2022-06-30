<template>
    <Dialog :visible="visible" @update:visible="onclose">
        <template v-slot:header>
            <h1>{{ isEdit() ? '編集' : '追加' }}</h1>
        </template>
        <div>
            <div class="form-item">
                <label>氏名</label>
                <input v-model="editData.name">
            </div>
            <div class="form-item">
                <label>ログインID</label>
                <input v-model="editData.loginId">
            </div>
            <div class="form-item">
                <label>パスワード</label>
                <input v-model="editData.password">
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
import dayjs from 'dayjs';
import { PropType } from 'vue';
import { Task, User } from '~~/lib/api-client';
import Dialog from '../parts/dialog.vue';

export default defineComponent({
    props: {
        visible: {
            required: true,
            type: Boolean,
        },
        user: {
            required: false,
            type: Object as PropType<User>,
            default: () => { }
        },
    },
    setup(props, context) {
        const editData = {
            name: '',
            loginId: '',
            password: '',
        };
        if (props.user) {
            Object.assign(editData, props.user);
        }
        const data = reactive<{ editData: User | null }>({ editData });
        return { ...data }
    },
    methods: {
        isEdit() {
            return !!this.user?.id;
        },
        async save() {
            if (!this.editData) {
                return;
            }
            // TODO バリデーション

            let result: User;
            if (this.isEdit()) {
                //                result = await this.$api.updateUser({ id: this.user.id as number, user: this.editData });
            } else {
                //                result = await this.$api.addUser({ user: this.editData });
            }
            //            this.$emit('update:user', result);
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