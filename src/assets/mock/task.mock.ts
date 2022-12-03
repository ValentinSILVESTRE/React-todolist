import { getRandomInt } from '../functions/maths.functions';
import { TaskModel } from '../models/task.model';
import { taskStatus } from '../models/taskStatus.model';

// * Création de quelques tâches avec un id aléatoire

const taskCount = 2;
const taskStatusCount = 2;

const MockTasks: TaskModel[] = [];

for (let i = 0; i < taskCount; i++) {
	const id = crypto.randomUUID(),
		title = `Task #${i + 1}`,
		status: taskStatus =
			Object.values(taskStatus)[getRandomInt(taskStatusCount - 1)],
		deadline: Date = new Date();
	MockTasks.push({ id, title, status, deadline });
}

export default MockTasks;
