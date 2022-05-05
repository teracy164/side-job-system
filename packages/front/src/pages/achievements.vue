<template>
  <div>
    <h4>収支</h4>
    <div>TODO　月単位の収入を棒グラフで表示</div>
  </div>
  <div>
    <h4>受領中</h4>

  </div>
  <div>
    <div class="v-center">
      <h4>完了した仕事</h4>
      <div style="padding: 0 20px;">
        <input type="month" style="width: 100px">
      </div>
    </div>
    <table>
      <thead>
        <th>仕事</th>
        <th>依頼者</th>
        <th style="width: 120px;min-width: 100px">報酬</th>
        <th style="width: 120px;min-width: 100px">完了日</th>
      </thead>
      <tbody>
        <tr v-for="task of tasks" @click="detail = task">
          <td>{{ task.title }}</td>
          <td>{{ task.client }}</td>
          <td>{{ $currency(task.price) }}</td>
          <td>{{ $dateFormat(task.updatedAt) }}</td>
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
table {
  tbody {
    tr {
      cursor: pointer;
    }

    tr:hover {
      background-color: #eeeeff;
    }
  }
}
</style>