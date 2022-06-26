<template>
  <div>
    <div>
      <div style="padding:10px;">
        <BarChart :data="chart.data" :height="chart.height" />
      </div>
    </div>
    <div>
      <h4 class="headline"><label>受領中</label></h4>
      <div style="padding:10px;">
        <div class="wrapper" style="max-width: 100%; overflow-x: auto;display: flex; zoom: 80%;">
          <TaskCard v-for="task of openTasks" :task="task" @click="showDetail(task)" />
        </div>
      </div>
    </div>
    <div>
      <div class="v-center">
        <h4 class="headline"><label>すべて</label></h4>
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
              <th style="width: 120px;min-width: 100px">期限</th>
              <th style="width: 120px;min-width: 100px">ステータス</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task of tasks" @click="showDetail(task)">
              <td>{{ task.title }}</td>
              <td>{{ task.client }}</td>
              <td>{{ $currency(task.price) }}</td>
              <td>{{ $dateFormat(task.expireDate) }}</td>
              <td>{{ $utils.task.toStatusName(task) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <TaskDetailOverlay v-if="detail" :visible="!!detail" :task="detail" @update:visible="hiddenDetail()" />
    </div>
  </div>
</template>
<script lang="ts">
import TaskDetailOverlay from "~~/components/task/task-detail-overlay.vue";
import BarChart from "~~/components/parts/chart/bar-chart.vue";
import TaskCard from "~~/components/task/task-card.vue";
import { ChartData } from "chart.js";
import { Task } from "~~/lib/api-client";
import dayjs from "dayjs";

definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
  setup() {
    const tasks: Task[] = [];
    const openTasks: Task[] = [];
    const chart = ref<{ showable: boolean; height: number; data: ChartData | null }>({
      showable: false,
      height: 200,
      data: null,
    });

    const data = reactive<{ detail: Task | null }>({ detail: null });
    return { ...data, tasks, openTasks, chart };
  },
  async mounted() {
    await this.loadTasks();
    this.setChartData();
  },
  methods: {
    async loadTasks() {
      this.tasks = await this.$api.getMyTasks();
      this.openTasks = this.tasks.filter(t => ![1, 2].includes(this.$utils.task.getNowStatus(t)));
      console.log(this.openTasks)
    },
    setChartData() {
      this.chart.showable = false;
      const labels: string[] = [];
      const data: number[] = [];

      const formatYYYYMM = (date: string | dayjs.Dayjs) => dayjs(date).format('YYYY年MM月');

      let dMonth = dayjs();
      for (let i = 0; i < 12; i++) {
        labels.splice(0, 0, formatYYYYMM(dMonth));
        data.push(0);
        dMonth = dMonth.add(-1, 'months');
      }

      // 月ごとにカウント
      this.tasks.forEach(t => {
        const month = formatYYYYMM(t.expireDate);
        const index = labels.findIndex(l => l === month);
        if (index >= 0) data[index] += t.price;
      });

      this.chart.data = {
        labels,
        datasets: [{
          label: "月ごとの合計報酬",
          data,
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
    },
  },
  components: { TaskDetailOverlay, BarChart, TaskCard }
});
</script>
<style lang="scss" scoped>
</style>