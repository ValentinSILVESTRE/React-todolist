import { Priority } from './priority.model';
import { taskStatus } from './taskStatus.model';

export interface TaskModel {
	id: string;
	title: string;
	status: taskStatus;
	deadline: Date;
	priority: Priority;
}
