import { TaskStatus, TaskStatusName } from '~~/../../shared/lib';
import { Task } from '~~/lib/api-client';

export class TaskUtil {
  getNowStatus(task: Task) {
    if (task.statuses && task.statuses.length) {
      return task.statuses[0].status;
    }
    return 0;
  }
  toStatusName(task: Task) {
    const status = this.getNowStatus(task) as TaskStatus;
    const info = TaskStatusName[status] || TaskStatusName[TaskStatus.OPEN];
    return info.name;
  }
}
