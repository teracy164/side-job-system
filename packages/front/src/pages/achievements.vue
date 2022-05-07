<template>
  <div>
    <div>
      <div style="padding:10px;">
        <BarChart :data="chart.data" :height="chart.height" />
      </div>
    </div>
    <div>
      <h4><label>受領中</label></h4>
      <div style="padding:10px;">
        <div class="wrapper" style="max-width: 100%; overflow-x: auto;display: flex; zoom: 80%;">
          <TaskCard v-for="task of tasks" :task="task" @click="showDetail(task)" />
        </div>
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
        <table class="row-clickable">
          <thead>
            <tr>
              <th>仕事</th>
              <th>依頼者</th>
              <th style="width: 120px;min-width: 100px">報酬</th>
              <th style="width: 120px;min-width: 100px">完了日</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task of tasks" @click="showDetail(task)">
              <td>{{ task.title }}</td>
              <td>{{ task.client }}</td>
              <td>{{ $currency(task.price) }}</td>
              <td>{{ $dateFormat(task.updatedAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <TaskDetailOverlay v-if="detail" :task="detail" @onclose="hiddenDetail()" />
    </div>
  </div>
</template>
<script lang="ts">
import TaskDetailOverlay from "~~/components/task/task-detail-overlay.vue";
import BarChart from "~~/components/parts/chart/bar-chart.vue";
import TaskCard from "~~/components/task/task-card.vue";
import { ChartData } from "chart.js";
import { Task } from "~~/lib/api-client";

definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
  setup() {
    const tasks: Task[] = [];
    const chart = ref<{ showable: boolean; height: number; data: ChartData | null }>({
      showable: false,
      height: 200,
      data: null,
    });

    const data = reactive<{ detail: Task | null }>({ detail: null });
    return { ...data, tasks, chart };
  },
  async mounted() {
    this.tasks = await this.$api.getTasks();
    this.setChartData();
  },
  methods: {
    setChartData() {
      this.chart.showable = false;
      const test = Math.random() * 10000
      this.chart.data = {
        labels: ["12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"],
        datasets: [{
          label: "月ごとの合計報酬",
          data: [test, 0, 0, 1500, 0, 6000, 10000, 0, 2000, 0, 0, 1500],
          backgroundColor: '#9999ff'
        }]
      };
      this.$nextTick(() => this.chart.showable = true)
    },
    showDetail(task: Task) {
      this.detail = task;
      this.$forceUpdate();
    },
    hiddenDetail() {
      this.detail = null;
      this.$forceUpdate();
    }
  },
  components: { TaskDetailOverlay, BarChart, TaskCard }
});
</script>
<style lang="scss" scoped>
h4 {
  margin: 0;

  label {
    border-bottom: 1px solid black;

  }
}
</style>