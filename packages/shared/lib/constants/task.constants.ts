export enum TaskStatus {
  OPEN = 1,
  COMPLETE,
  CLOSE,
}

export const TaskStatusName = {
  [TaskStatus.OPEN]: { name: "オープン" },
  [TaskStatus.COMPLETE]: { name: "完了" },
  [TaskStatus.CLOSE]: { name: "クローズ" },
};
