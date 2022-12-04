import { getRandomInt } from '../functions/maths.functions';
import { Priority } from '../models/priority.model';
import { TaskModel } from '../models/task.model';
import { taskStatus } from '../models/taskStatus.model';

// * Création de quelques tâches avec un id aléatoire

const taskCount = 3;
const taskStatusCount = 2;
const priorityCount = 3;

const MockTasks: TaskModel[] = [];

for (let i = 0; i < taskCount; i++) {
	const id = crypto.randomUUID(),
		title = `Task #${i + 1}`,
		status: taskStatus =
			Object.values(taskStatus)[getRandomInt(taskStatusCount - 1)],
		/** Une date aléatoire allant d'aujourd'hui jusqu'à dans 50 jours */
		deadline: Date = new Date(
			new Date().valueOf() + 1000 * 3600 * 24 * getRandomInt(50)
		),
		priority: Priority =
			Object.values(Priority)[getRandomInt(priorityCount - 1)];

	MockTasks.push({ id, title, status, deadline, priority });
}

export default MockTasks;
