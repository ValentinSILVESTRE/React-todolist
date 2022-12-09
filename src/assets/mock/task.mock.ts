import { getRandomInt } from '../functions/maths.functions';
import { Priority } from '../models/priority.model';
import { TaskModel } from '../models/task.model';
import { taskStatus } from '../models/taskStatus.model';

// * Création de quelques tâches avec un id aléatoire

const taskCount = 20;
const taskStatusCount = 2;
const priorityCount = 3;

const MockTasks: TaskModel[] = [];
// const MockTasks: TaskModel[] = [
// 	{
// 		id: 'a',
// 		title: 'a',
// 		status: taskStatus.done,
// 		deadline: new Date(2000, 1, 1),
// 		priority: Priority.low,
// 	},
// 	{
// 		id: 'b',
// 		title: 'a',
// 		status: taskStatus.todo,
// 		deadline: new Date(2000, 1, 1),
// 		priority: Priority.high,
// 	},
// ];

for (let i = 0; i < taskCount; i++) {
	const id = crypto.randomUUID(),
		title = `Task #${i + 1}`,
		status: taskStatus =
			Object.values(taskStatus)[getRandomInt(taskStatusCount - 1)],
		/** Une date aléatoire allant d'aujourd'hui jusqu'à dans 50 jours */
		deadline: Date = new Date(
			new Date().valueOf() + 1000 * 3600 * 24 * getRandomInt(4)
		),
		priority: Priority =
			Object.values(Priority)[getRandomInt(priorityCount - 1)];

	MockTasks.push({ id, title, status, deadline, priority });
}

export default MockTasks;
