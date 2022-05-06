<template>
  <div>

    <h4>発行済みの仕事<button style="margin-left: 20px">追加</button></h4>
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
        <tr v-for="task of tasks" @click="detail = task">
          <td>{{ task.title }}</td>
          <td>{{ $currency(task.price) }}</td>
          <td>{{ $dateFormat(task.expireDate) }}</td>
          <td>{{ task.assigners?.length || 0 }}/{{ task.recruitmentNumber }}</td>
          <td>開始前</td>
        </tr>
      </tbody>
    </table>
    <TaskDetailOverlay v-if="detail" :task="detail" @onclose="detail = null" />
  </div>
</template>
<script lang="ts">
import { Task } from "~~/types/task";
import TaskDetailOverlay from "~~/components/task/task-detail-overlay.vue";

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
    this.tasks = await this.$api.getTasks();
  },
  components: { TaskDetailOverlay }
});
</script>
<style lang="scss" scoped>
</style>