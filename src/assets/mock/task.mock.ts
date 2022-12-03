import { TaskModel } from '../models/task.model';

// * Création de quelques tâches avec un id aléatoire

const taskCount = 1;

const MockTasks: TaskModel[] = [];

for (let i = 0; i < taskCount; i++) {
	const id = crypto.randomUUID(),
		title = `Task #${i + 1}`;
	MockTasks.push({ id, title });
}

export default MockTasks;
