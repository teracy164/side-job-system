<template>
    <div class="detail">
        <div class="title">
            <h1> {{ task.title }} </h1>
            <div class="v-center">
                <div class="mr-10 ">依頼者：{{ task.client }}</div>
                <div class="mr-10 ">作成日：{{ $dateFormat(task.createdAt) }}</div>
                <div class="mr-10 ">作成者：{{ task.createUserId }}</div>
            </div>
            <div class="tags">
                <div v-for="tag of task.tags" class="tag">{{ tag }}</div>
            </div>
        </div>
        <div class="contents">
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
                <div style="flex-basis: 30%"><label>受領条件</label></div>
                <div style="flex-basis: 70%">XX等級以上。Excel得意</div>
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

            <h4><label>その他備考</label></h4>
            <div class="content">
                <pre>{{ task.note }}</pre>
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
import { PropType } from 'vue';
import { Task } from '~~/lib/api-client';

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
<style lang="scss" scoped>
.detail {
    width: 100%;

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

    .status {
        border-radius: 5px;
        color: white;
        padding: 3px 5px;
        font-size: 0.8em;
    }

    .contents {
        .content {
            padding: 5px 20px;
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
            font-size: 0.8em;
            color: white;
        }
    }

    .footer {
        margin-top: 20px;
        border-top: 1px solid lightgray;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
    }
}
</style>