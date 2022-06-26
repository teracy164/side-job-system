<template>
  <div>
    <h4 class="headline">
      <label>発行済みの仕事</label>
      <button class="primary" style="margin-left: 20px" @click="addTask">追加</button>
    </h4>
    <table class="row-clickable">
      <thead>
        <tr>
          <th>タイトル</th>
          <th>報酬</th>
          <th>期限</th>
          <th>募集状況</th>
          <th>状況</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task of tasks" @click="editTask(task)">
          <td>{{ task.title }}</td>
          <td>{{ $currency(task.price) }}</td>
          <td>{{ $dateFormat(task.expireDate) }}</td>
          <td>{{ task.assigners?.length || 0 }}/{{ task.recruitmentNumber }}</td>
          <td>開始前</td>
        </tr>
      </tbody>
    </table>
    <TaskEditOverlay v-if="visibleAddDialog" v-model:visible="visibleAddDialog" @update:task="onupdate" />
    <TaskDetailOverlay v-if="detail" v-model:visible="visibleDialog" :task="detail" :editable="true"
      @update:task="onupdate" />
  </div>
</template>
<script lang="ts">
import TaskDetailOverlay from "~~/components/task/task-detail-overlay.vue";
import { Task } from "~~/lib/api-client";

definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
  setup() {
    const data = reactive<{
      tasks: Task[];
      detail: Task | null;
      visibleDialog: boolean;
      visibleAddDialog: boolean;
    }>({ tasks: [], detail: null, visibleDialog: false, visibleAddDialog: false });
    return data;
  },
  async mounted() {
    this.loadTasks();
  },
  methods: {
    async loadTasks() {
      this.tasks = await this.$api.getTasks();
    },
    editTask(task: Task) {
      this.detail = task;
      this.visibleDialog = true;
    },
    addTask() {
      this.detail = null;
      this.visibleAddDialog = true;
    },
    onupdate(task: Task) {
      this.loadTasks();
      this.oncloseDialog();
    },
    oncloseDialog() {
      this.visibleDialog = false;
      this.visibleAddDialog = false;
      this.detail = null;
    }
  },
  components: { TaskDetailOverlay }
});
</script>
<style lang="scss" scoped>
</style>