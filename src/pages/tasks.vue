<template>
  <div>
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
import { Task } from '@/types/task';
import TaskDetailOverlay from '~~/components/task/task-detail-overlay.vue';

definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
  async setup(props, context) {
    const data = reactive<{ tasks: Task[]; detail: Task | null }>({ tasks: [], detail: null });

    return data;
  },
  async mounted() {
    const { $api } = useNuxtApp();
    this.tasks = await $api.getTasks();
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() === 'escape') {
        this.detail = null;
      }
    })
  },
  methods: {
    searchTasks() {
      const { $api } = useNuxtApp();
      return $api.getTasks();
    },
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