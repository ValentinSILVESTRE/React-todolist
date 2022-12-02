import { TaskModel } from '../models/task.model';

// * Création de 10 tâches avec un id aléatoire

const taskCount = 10;

const MockTasks: TaskModel[] = [];

for (let i = 0; i < taskCount; i++) {
	const id = crypto.randomUUID(),
		title = `Task #${i + 1}`;
	MockTasks.push({ id, title });
}

export default MockTasks;
