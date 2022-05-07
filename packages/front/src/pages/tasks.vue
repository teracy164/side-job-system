<template>
  <div>
    <div>
      <fieldset>
        <label class="legend">検索する</label>
        <div class="v-center">
          <div class="form-item" style="margin-right: 20px">
            <label>キーワード</label>
            <input style="width: 200px">
          </div>
          <div class="form-item">
            <label>タグ</label>
            <input style="width: 200px">
          </div>
        </div>
        <div>
          <input type="checkbox" style="width: unset;">空きのあるタスクのみ表示
        </div>
      </fieldset>
    </div>
    <div class="tasks">
      <TaskCard v-for="task of tasks" :task="task" @onclick="showDetail" />
    </div>
    <TaskDetailOverlay v-if="detail" :task="detail" @onclose="detail = null" />
  </div>
</template>
<script lang="ts">
import TaskCard from '@/components/task/task-card.vue';
import TaskDetail from '@/components/task/task-detail.vue';
import GoogleIcon from '@/components/parts/google-icon.vue';
import TaskDetailOverlay from '~~/components/task/task-detail-overlay.vue';
import { Task } from '~~/lib/api-client';

definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
  async setup(props, context) {
    const data = reactive<{ tasks: Task[]; detail: Task | null }>({ tasks: [], detail: null });

    return data;
  },
  async mounted() {
    const { $api } = useNuxtApp();
    const result = await $api.getTasks();
    this.tasks = result.data;
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() === 'escape') {
        this.detail = null;
      }
    })
  },
  methods: {
    showDetail(event: Event, task: Task) {
      this.detail = task;
    },
  },
  components: { TaskCard, TaskDetail, GoogleIcon, TaskDetailOverlay }
});
</script>
<style lang="scss" scoped>
.tasks {
  display: flex;
  flex-wrap: wrap;
}
</style>