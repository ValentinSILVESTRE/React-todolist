import { getRandomInt } from '../functions/maths.functions';
import { TaskModel } from '../models/task.model';
import { taskStatus } from '../models/taskStatus.model';

// * Création de quelques tâches avec un id aléatoire

const taskCount = 10;
const taskStatusCount = 2;

const MockTasks: TaskModel[] = [];

for (let i = 0; i < taskCount; i++) {
	const id = crypto.randomUUID(),
		title = `Task #${i + 1}`,
		status: taskStatus =
			Object.values(taskStatus)[getRandomInt(taskStatusCount - 1)];
	MockTasks.push({ id, title, status });
}

export default MockTasks;
