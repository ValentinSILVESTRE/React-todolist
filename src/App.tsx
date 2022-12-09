import { useEffect, useState } from 'react';
import MockTasks from './assets/mock/task.mock';
import Sort from './assets/models/sort.model';
import { TaskModel } from './assets/models/task.model';
import { taskStatus } from './assets/models/taskStatus.model';
import './assets/styles/App.css';
import SortForm from './components/SortForm';
import Order from './components/SortForm';
import TaskAddForm from './components/TaskAddForm';
import TaskList from './components/TaskList';

const taskIsBefore = (taskA: TaskModel, taskB: TaskModel, sort: Sort) => {
	/** Liste des clées triée par priority */
	const sortedKeys = Object.keys(sort).sort((keyA, keyB) => {
		return (
			sort[keyB as keyof Sort].priority -
			sort[keyA as keyof Sort].priority
		);
	});

	// On veut une liste

	const dateA = new Date(
		taskA.deadline.toISOString().split('T')[0]
	).valueOf();
	const dateB = new Date(
		taskB.deadline.toISOString().split('T')[0]
	).valueOf();

	// Si les dates sont sont différentes, alors on renvoie la première
	if (dateA !== dateB) return dateA - dateB;

	// On renvoie celle qui a un titre inférieur alphabétiquement
	return taskA.title.toUpperCase() < taskB.title.toUpperCase() ? -1 : 1;
};

const defaultSort: Sort = {
	id: { order: 'asc', priority: 0 },
	deadline: { order: 'asc', priority: 4 },
	priority: { order: 'desc', priority: 3 },
	title: { order: 'asc', priority: 2 },
	status: { order: 'asc', priority: 1 },
};

function App() {
	const [sort, setSort] = useState(defaultSort);
	const [taskList, setTaskList] = useState(MockTasks);

	useEffect(() => {
		console.log('UseEffect');
		// * On tri la liste des tâches
		const sortEntries = Object.entries(sort);
		// setTaskList(taskList.sort((t1, t2) => taskIsBefore(t1, t2, sort)));
		const sortEntriesSorted = sortEntries.sort(
			(a, b) => b[1].priority - a[1].priority
		);
		const sortedKeyList = sortEntriesSorted.map(
			(data: [string, { order: typeof Order; priority: number }]) => {
				return { key: data[0], order: data[1].order };
			}
		);

		console.table(sortedKeyList);

		// todo
		// * 1) Trier les tâches par "key" de sortedKeyList dans l'ordre "order" de la première à la dernière si égalité
	});

	const addTask = (newTask: TaskModel) => {
		// Si l'id de la nouvelle tâche est inconnu, alors on l'ajoute
		if (taskList.find((task) => task.id === newTask.id) === undefined) {
			setTaskList(
				[...taskList, newTask].sort((t1, t2) =>
					taskIsBefore(t1, t2, sort)
				)
			);
		}
	};

	const updateTask = (updatedTask: TaskModel) => {
		// On filtre les tâches qui ont un id différent de celle qu'on veut modifier
		const filteredTasks = taskList.filter(
			(task) => task.id !== updatedTask.id
		);

		// On y ajoute la tâche modifiée
		filteredTasks.push(updatedTask);

		// On persiste les changements
		setTaskList(filteredTasks.sort((t1, t2) => taskIsBefore(t1, t2, sort)));
	};

	const deleteTask = (id: string) => {
		if (window.confirm('Are you sure you want to delete this task ?')) {
			// On filtre les tâches qui ont un id différent de celui passé en paramètre
			setTaskList(taskList.filter((task) => task.id !== id));
		}
	};

	return (
		<main className="App mt-3 m-5">
			<TaskAddForm onSubmit={addTask} />

			<h2>Todo</h2>
			<TaskList
				tasks={taskList.filter(
					(task) => task.status === taskStatus.todo
				)}
				updateTask={updateTask}
				deleteTask={deleteTask}
			/>

			<h2>Done</h2>
			<TaskList
				tasks={taskList.filter(
					(task) => task.status === taskStatus.done
				)}
				updateTask={updateTask}
				deleteTask={deleteTask}
			/>
		</main>
	);
}

export default App;
