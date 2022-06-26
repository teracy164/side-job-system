import { Task } from '~~/lib/api-client';

export class TaskUtil {
  getNowStatus(task: Task) {
    if (task.statuses && task.statuses.length) {
      return task.statuses[0].status;
    }
    return 0;
  }
  toStatusName(task: Task) {
    const status = this.getNowStatus(task);
    // TODO サーバー側とステータス値を定数で共有
    switch (status) {
      case 2:
        return '完了';
      case 3:
        return 'クローズ';
      default:
        return 'オープン';
    }
  }
}
