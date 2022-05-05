<template>
  <div>
    <div>
      <div style="padding:10px">
        <BarChart v-if="showableChart" :data="chartData" height="250" />
      </div>
    </div>
    <div>
      <h4><label>受領中</label></h4>
      <div style="padding:10px">
        TODO
      </div>
    </div>
    <div>
      <div class="v-center">
        <h4><label>完了した仕事</label></h4>
        <div style="padding: 0 20px;">
          <input type="month" style="width: 100px">
        </div>
      </div>
      <div style="padding: 10px">
        <table>
          <thead>
            <tr>
              <th>仕事</th>
              <th>依頼者</th>
              <th style="width: 120px;min-width: 100px">報酬</th>
              <th style="width: 120px;min-width: 100px">完了日</th>
            </tr>
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
      </div>
      <TaskDetailOverlay v-if="detail" :task="detail" @onclose="detail = null" />
    </div>
  </div>
</template>
<script lang="ts">
import { Task } from "~~/types/task";
import TaskDetailOverlay from "~~/components/task/task-detail-overlay.vue";
import BarChart from "~~/components/parts/chart/bar-chart.vue";

definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
  setup() {
    const chartData: any = null;
    const showableChart = ref(false);

    const data = reactive<{
      tasks: Task[];
      detail: Task | null;
      chartOptions: any,
    }>({ tasks: [], detail: null, chartOptions: null });
    return { ...data, showableChart, chartData };
  },
  async mounted() {
    this.tasks = await this.$api.getTasks();
    this.setChartData();
  },
  methods: {
    setChartData() {
      this.showableChart = false;
      const test = Math.random() * 10000
      this.chartData = {
        labels: ["12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"],
        datasets: [{
          label: "月ごとの合計報酬",
          data: [test, 0, 0, 1500, 0, 6000, 10000, 0, 2000, 0, 0, 1500],
          backgroundColor: 'lightblue'
        }]
      };
      this.$nextTick(() => this.showableChart = true)
    },
  },
  components: { TaskDetailOverlay, BarChart }
});
</script>
<style lang="scss" scoped>
h4 {
  margin: 0;

  label {
    border-bottom: 1px solid black;

  }
}

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