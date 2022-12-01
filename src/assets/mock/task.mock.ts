import { TaskModel } from '../models/task.model';

const taskCount = 10;

const MockTasks: TaskModel[] = [];

for (let i = 0; i < taskCount; i++) {
	const id = crypto.randomUUID(),
		name = `Task #${i + 1}`;
	MockTasks.push({ id, name });
}

export default MockTasks;
