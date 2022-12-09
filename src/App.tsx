import { useEffect, useState } from 'react';
import { taskIsBefore } from './assets/functions/taskIsBefore.function';
import MockTasks from './assets/mock/task.mock';
import Sort, { _Order } from './assets/models/sort.model';
import { TaskModel } from './assets/models/task.model';
import { taskStatus } from './assets/models/taskStatus.model';
import './assets/styles/App.css';
import FilterForm from './components/FilterForm';
import SortForm from './components/SortForm';
import TaskAddForm from './components/TaskAddForm';
import TaskList from './components/TaskList';

type sortKey = 'deadline' | 'title' | 'priority';

const defaultSort: Sort = {
	deadline: { order: 'asc', priority: 4 },
	priority: { order: 'desc', priority: 3 },
	title: { order: 'asc', priority: 2 },
	status: { order: 'asc', priority: 1 },
	id: { order: 'asc', priority: 0 },
};
const defaultQuery = '';

function App() {
	const [sort, setSort] = useState(defaultSort);
	const [taskList, setTaskList] = useState(MockTasks);
	const [query, setQuery] = useState(defaultQuery);

	useEffect(() => {
		// * On tri la liste des tâches
		setTaskList(
			taskList.sort((taskA, taskB) => taskIsBefore(taskA, taskB, sort))
		);
	}, []);

	// * Modification de la liste des tâches quand la query est modifiée
	useEffect(() => {
		const filteredTasks = MockTasks.filter((task) =>
			task.title.includes(query)
		);
		setTaskList(filteredTasks);
	}, [query]);

	// * Modification de la liste des tâches quand la query est modifiée
	useEffect(() => {
		// * On tri la liste des tâches
		setTaskList(
			taskList.sort((taskA, taskB) => taskIsBefore(taskA, taskB, sort))
		);
	}, [sort]);

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

	const todoTaskCount: () => number = () => {
		return taskList.filter((task) => task.status === taskStatus.todo)
			.length;
	};

	const doneTaskCount: () => number = () => {
		return taskList.filter((task) => task.status === taskStatus.done)
			.length;
	};

	const updateQuery = (newQuery: string) => {
		setQuery(newQuery);
	};

	const getMainSortKey: () => sortKey = () => {
		const max = {
			key: Object.entries(sort)[0][0] as string,
			priority: Object.entries(sort)[0][1].priority as number,
		};

		for (let i = 1; i < Object.entries(sort).length; i++) {
			const data = Object.entries(sort)[i];
			if (data[1].priority > max.priority) {
				max.key = data[0];
				max.priority = data[1].priority;
			}
		}

		return max.key as sortKey;
	};

	const updateSort = (key: sortKey) => {
		console.table(sort);
		const newSort: Sort = { ...sort };
		// * On récupère la priorite de key dans sort
		// console.log(key);
		// console.table(newSort);
		// console.log(sort[getMainSortKey()].priority);
		// * On lui attribue la valeure maximale + 1 pour qu'elle passe devant tous les autres sans modifier l'ordre des autres clés
		newSort[key].priority = sort[getMainSortKey()].priority + 1;
		console.table(newSort);
		setSort(newSort);
		// console.table(sort);
	};

	return (
		<main className="App mt-3 m-5">
			<TaskAddForm onSubmit={addTask} />

			<div
				id="sortFilterContainer"
				className="row m-3 border p-3 rounded"
			>
				<FilterForm query={query} updateQuery={updateQuery} />
				<SortForm sortKey={getMainSortKey()} updateSort={updateSort} />
			</div>

			{query.length > 0 && (
				<p>
					{taskList.length || 'No'} corresponding {query} task
					{taskList.length !== 1 && 's'} found
				</p>
			)}

			<h2>
				{todoTaskCount() || 'No'} task{todoTaskCount() !== 1 && 's'} to
				do
			</h2>
			<TaskList
				tasks={taskList.filter(
					(task) => task.status === taskStatus.todo
				)}
				updateTask={updateTask}
				deleteTask={deleteTask}
			/>

			<h2>
				{doneTaskCount() || 'No'} task{doneTaskCount() !== 1 && 's'}{' '}
				done
			</h2>
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
