<template>
  <div>
    <div class="tasks">
      <TaskCard v-for="task of tasks" :task="task" @onclick="showDetail" />
    </div>
    <div v-if="selected" class="detail-panel" @click="hiddenDetail">
      <div class="wrapper">
        <button class="btn-close icon-btn" @click="hiddenetail">
          <GoogleIcon icon="close" />
        </button>
        <TaskDetail :task="selected" @onclose="hiddenDetail" @click.stop="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TaskCard from '@/components/task/task-card.vue';
import TaskDetail from '@/components/task/task-detail.vue';
import GoogleIcon from '@/components/parts/google-icon.vue';
import { Task } from '@/types/task';

definePageMeta({ layout: 'authenticated' });

export default defineComponent({
  async setup(props, context) {
    const { $api } = useNuxtApp();
    const tasks = await $api.getTasks();
    const data = reactive<{ selected: Task | null }>({ selected: null });

    return {
      tasks,
      ...data,
    };
  },
  methods: {
    searchTasks() {
      const { $api } = useNuxtApp();
      return $api.getTasks();
    },
    showDetail(event: Event, task: Task) {
      this.selected = task;
      this.$forceUpdate();
    },
    hiddenDetail() {
      this.selected = null;
      this.$forceUpdate();
    }
  },
  components: { TaskCard, TaskDetail, GoogleIcon }
});
</script>
<style lang="scss">
.tasks {
  display: flex;
  flex-wrap: wrap;
}

.detail-panel {
  $panelPadH: 20px;
  $panelPadV: 40px;

  position: fixed;
  top: 0;
  left: 0;
  padding: $panelPadV $panelPadH;
  width: calc(100vw - ($panelPadH * 2));
  height: calc(100vh - ($panelPadV * 2));
  overflow: auto;
  background-color: rgb(0, 0, 0, 0.7);

  .wrapper {
    position: relative;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    width: calc(100% - 40px);

    .btn-close {
      position: absolute;
      bottom: 100%;
      right: 0;
      color: white;
    }

    .btn-close:hover {
      background-color: rgba(100, 100, 100, 0.7);
    }
  }
}
</style>