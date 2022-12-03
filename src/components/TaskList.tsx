import '../assets/styles/TaskList.css';
import Task from './Task';
import MockTasks from '../assets/mock/task.mock';
import TaskForm from './TaskForm';
import { TaskModel } from '../assets/models/task.model';
import { useState } from 'react';

export interface ITaskListProps {}

export default function TaskList(props: ITaskListProps) {
	const [taskList, setTaskList] = useState([...MockTasks]);

	const addTask = (newTask: TaskModel) => {
		// Si l'id de la nouvelle tâche est inconnu, alors on l'ajoute
		if (taskList.find((task) => task.id === newTask.id) === undefined) {
			setTaskList([...taskList, newTask]);
		}
	};

	const deleteTask = (taskId: string) => {
		// On filtre les tâches qui ont un id différent de celui passé en paramètre
		setTaskList(taskList.filter((task) => task.id !== taskId));
	};

	return (
		<>
			<TaskForm addTask={addTask} />
			<ul className="list-group row flex-column mw-100 mt-3 m-5 shadow-sm rounded">
				{taskList.map((task) => (
					<li
						key={task.id}
						className="list-group-item bg-transparent"
					>
						<Task task={task} deleteTask={deleteTask} />
					</li>
				))}
			</ul>
		</>
	);
}
