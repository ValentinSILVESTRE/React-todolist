import { useState } from 'react';
import MockTasks from './assets/mock/task.mock';
import { TaskModel } from './assets/models/task.model';
import { taskStatus } from './assets/models/taskStatus.model';
import './assets/styles/App.css';
import TaskAddForm from './components/TaskAddForm';
import TaskList from './components/TaskList';

function App() {
	const [taskList, setTaskList] = useState([...MockTasks]);

	const addTask = (newTask: TaskModel) => {
		// Si l'id de la nouvelle tâche est inconnu, alors on l'ajoute
		if (taskList.find((task) => task.id === newTask.id) === undefined) {
			setTaskList([...taskList, newTask]);
		}
	};

	const updateTask = (updatedTask: TaskModel) => {
		// On filtre les tasks qui ont un id différent de celui qu'on veut modifier
		const filteredTasks = taskList.filter(
			(task) => task.id !== updatedTask.id
		);

		// On y ajoute la task modifiée
		filteredTasks.push(updatedTask);

		// On persiste les changements
		setTaskList(filteredTasks);
	};

	const deleteTask = (id: string) => {
		// On filtre les tâches qui ont un id différent de celui passé en paramètre
		setTaskList(taskList.filter((task) => task.id !== id));
	};

	return (
		<main className="App">
			<TaskAddForm onSubmit={addTask} />

			<h2>Todo tasks</h2>
			<TaskList
				tasks={taskList.filter(
					(task) => task.status === taskStatus.todo
				)}
				updateTask={updateTask}
				deleteTask={deleteTask}
			/>

			<h2>Done tasks</h2>
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
