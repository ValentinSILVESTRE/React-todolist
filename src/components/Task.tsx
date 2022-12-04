import { useState } from 'react';
import { TaskModel } from '../assets/models/task.model';
import '../assets/styles/Task.css';
import EditTask from './EditTask';
import ShowTask from './ShowTask';

interface ITaskProps {
	task: TaskModel;
	updateTask: Function;
	deleteTask: Function;
}

export default function Task(props: ITaskProps) {
	const [editable, setEditable] = useState(false);

	const toggleEditable = () => {
		setEditable(!editable);
	};

	return (
		<>
			{editable ? (
				<EditTask
					task={props.task}
					updateTask={props.updateTask}
					deleteTask={props.deleteTask}
					toggleEditable={toggleEditable}
				/>
			) : (
				<ShowTask
					task={props.task}
					updateTask={props.updateTask}
					deleteTask={props.deleteTask}
					toggleEditable={toggleEditable}
				/>
			)}
		</>
	);
}
