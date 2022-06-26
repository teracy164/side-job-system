<template>
  <div>
    <div class="tasks">
      <h4><label>新着</label><a style="font-size: 0.8em; margin-left: 20px;" @click="navigate('/tasks')">探す</a></h4>
      <div class=" p-10">
        <div class="wrapper">
          <TaskCard v-for="task of tasks" :task="task" @onclick="showTaskDetail" />
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: ;">
      <div class="my-tasks" style="flex-basis: 50%;">
        <h4><label>マイタスク</label></h4>
        <div class="p-10">
          <div v-for="task of myTasks">
            <div class="card shadow" @click="detail = task">
              <h4 class="title">{{ task.title }}</h4>
              <div class="date">
                <GoogleIcon icon="event" />
                {{ $dateFormat(task.expireDate) }}
              </div>
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
    <TaskDetailOverlay v-if="detail" :visible="!!detail" :task="detail" @update:visible="detail = null"
      @update:assigner="onUpdateAssigner" />
  </div>
</template>
<script lang="ts">
import TaskCard from "~~/components/task/task-card.vue";
import { Task } from "~~/lib/api-client";
import TaskDetailOverlay from "~~/components/task/task-detail-overlay.vue";
import GoogleIcon from '@/components/parts/google-icon.vue';

definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
  setup() {
    const data = reactive<{
      tasks: Task[];
      myTasks: Task[];
      detail: Task | null;
    }>({ tasks: [], myTasks: [], detail: null });
    return data;
  },
  mounted() {
    this.loadTasks();
    this.loadMyTasks();
  },
  methods: {
    async loadTasks() {
      const tasks = await this.$api.getTasks();
      this.tasks = tasks?.slice(0, 10) || []
    },
    async loadMyTasks() {
      const tasks = await this.$api.getMyTasks();
      // 期限が古い方から降順に並び替え
      this.myTasks = tasks?.sort((s1, s2) => s1.expireDate < s2.expireDate ? -1 : 1) || []
    },
    showTaskDetail(event: Event, task: Task) {
      this.detail = task;
    },
    navigate(path: string) {
      navigateTo(path);
    },
    onUpdateAssigner() {
      this.loadMyTasks();
    }
  },
  components: { TaskCard, TaskDetailOverlay, GoogleIcon },
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

.my-tasks {
  .card {
    display: flex;
    margin-bottom: 5px;
    cursor: pointer;

    .title {
      flex-basis: 100%;
      margin: 0;
    }

    .date {
      display: flex;
      justify-content: center;
      white-space: nowrap;

      i {
        line-height: 1.3em;
      }
    }
  }

  .card:hover {
    background-color: #f9f9ff;
  }
}
</style>