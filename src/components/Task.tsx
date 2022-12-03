import { useState } from 'react';
import { TaskModel } from '../assets/models/task.model';
import { taskStatus } from '../assets/models/taskStatus.model';
import '../assets/styles/Task.css';

interface ITaskProps {
	task: TaskModel;
	deleteTask: Function;
}

export default function Task(props: ITaskProps) {
	const [editable, setEditable] = useState(false);
	const [title, setTitle] = useState(props.task.title);
	const [status, setStatus] = useState(props.task.status);

	const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const toggleEditable = () => {
		setEditable(!editable);
	};

	const onModifyTaskClick = (event: React.MouseEvent<HTMLElement>) => {
		toggleEditable();

		// todo - Sélectionner le texte de l'input
		if (false && editable) {
			const HTMLTaskID = `task#${props.task.id}`;
			const HTMLTitleInput: HTMLInputElement = document
				.getElementById(HTMLTaskID)!
				.getElementsByClassName(
					'task__titleInput'
				)[0] as HTMLInputElement;
			HTMLTitleInput.select();
		}
	};

	const toggleStatus = () => {
		const newStatus =
			status === taskStatus.done ? taskStatus.todo : taskStatus.done;
		setStatus(newStatus);
	};

	return (
		<div className="task d-flex justify-content-between">
			<div className="content d-flex">
				<div
					className="status me-3 d-flex align-items-center"
					onClick={toggleStatus}
				>
					{status === taskStatus.done && (
						<i className="bi bi-check-circle"></i>
					)}
					{status === taskStatus.todo && (
						<i className="bi bi-circle"></i>
					)}
				</div>

				{!editable && (
					<p className="m-0 task__title d-flex align-items-center">
						{title}
					</p>
				)}
				{editable && (
					<input
						type="text"
						value={title}
						onChange={updateTitle}
						className="task__titleInput"
					/>
				)}
			</div>

			<div className="date">
				<p className="d-flex align-items-center m-0">
					{props.task.deadline.toDateString()}
				</p>
			</div>

			<ul className="d-flex p-0">
				<li className="">
					<button
						className="btn btn-sm btn-primary p-0 me-1"
						onClick={onModifyTaskClick}
					>
						<i className="p-1 bi bi-pencil text-white"></i>
					</button>
				</li>
				<li className="">
					<button
						className="btn btn-sm btn-danger p-0"
						onClick={(event: React.MouseEvent<HTMLElement>) =>
							props.deleteTask(props.task.id)
						}
					>
						<i className="p-1 bi bi-trash3"></i>
					</button>
				</li>
			</ul>
		</div>
	);
}
