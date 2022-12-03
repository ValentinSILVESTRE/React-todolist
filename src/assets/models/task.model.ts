import { taskStatus } from './taskStatus.model';

export interface TaskModel {
	id: string;
	title: string;
	status: taskStatus;
	deadline: Date;
}
