<template>
  <div>
    <div class="tasks">
      <h4><label>新着</label><a style="font-size: 0.8em; margin-left: 20px;" @click="navigate('/tasks')">探す</a></h4>
      <div class=" p-10">
        <div class="wrapper">
          <TaskCard v-for="task of tasks" :task="task" @onclick="showTaskDetail" />
        </div>
        <TaskDetailOverlay v-if="detail" :task="detail" @onclose="detail = null" />
      </div>
    </div>
    <div style="display: flex; justify-content: ;">
      <div style="flex-basis: 50%;">
        <h4><label>マイタスク</label></h4>
        <div class="p-10">
          <div class="card">
            <div class="title">XXXXXXXX</div>
            <div class="title">
              期限だけ表示
            </div>
          </div>
        </div>
      </div>
      <div style="flex-basis: 50%;">
        <h4><label>アクティビティ</label></h4>
        <ul>
          <li>YYYY/MM/DD XXXを完了</li>
          <li>YYYY/MM/DD XXXを受領</li>
          <li>YYYY/MM/DD XXXを受領（〇〇※メンバー名）</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TaskCard from "~~/components/task/task-card.vue";
import TaskDetail from "~~/components/task/task-detail.vue";
import { Task } from "~~/lib/api-client";

definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
  setup() {
    const data = reactive<{
      tasks: Task[];
      detail: Task | null;
    }>({ tasks: [], detail: null });
    return data;
  },
  async mounted() {
    const { $api } = useNuxtApp();
    const result = await $api.getTasks();
    this.tasks = result.data.slice(0, 5)
  },
  methods: {
    showTaskDetail(event: Event, task: Task) {
      this.detail = task;
    },
    navigate(path: string) {
      navigateTo(path);
    },
  },
  components: { TaskCard, TaskDetail }
});
</script>
<style lang="scss" scoped>
h4 {
  margin: 0;

  label {
    border-bottom: 1px solid black;
  }
}

.tasks {
  margin-bottom: 20px;

  .wrapper {
    display: flex;
    flex-wrap: nowrap;
    max-width: 100vw;
    overflow-x: auto;

    .task {
      zoom: 80%;
    }
  }
}
</style>