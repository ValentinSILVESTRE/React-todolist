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

	return (
		<>
			<TaskForm addTask={addTask} />
			<ul className="row flex-column mw-100 p-3 mt-0 m-5 shadow-sm rounded">
				{taskList.map((task) => (
					<li key={task.id}>
						<Task task={task} />
					</li>
				))}
			</ul>
		</>
	);
}
