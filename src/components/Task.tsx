import { useState } from 'react';
import { Priority } from '../assets/models/priority.model';
import { TaskModel } from '../assets/models/task.model';
import { taskStatus } from '../assets/models/taskStatus.model';
import '../assets/styles/Task.css';

interface ITaskProps {
	task: TaskModel;
	deleteTask: Function;
}

export default function Task(props: ITaskProps) {
	const [editable, setEditable] = useState(false);
	const [task, setTask] = useState(props.task);

	const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask({ ...task, title: e.target.value });
	};

	const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask({ ...task, deadline: new Date(e.target.value) });
	};

	const updatePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTask({
			...task,
			priority: Priority[e.target.value as keyof typeof Priority],
		});
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
		const status =
			task.status === taskStatus.done ? taskStatus.todo : taskStatus.done;
		setTask({ ...task, status });
	};

	return (
		<div
			className="task d-flex justify-content-between row mx-0"
			data-priority={task.priority}
		>
			<div className="content d-flex col-5">
				<div
					className="status me-3 d-flex align-items-center"
					onClick={toggleStatus}
				>
					{task.status === taskStatus.done && (
						<i className="bi bi-check-circle"></i>
					)}
					{task.status === taskStatus.todo && (
						<i className="bi bi-circle"></i>
					)}
				</div>
				{editable && (
					<>
						<label htmlFor="priority" className="my-auto">
							Priority:
						</label>
						<select
							name="priority"
							id="priority"
							className="form-control"
							value={task.priority}
							onChange={updatePriority}
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</>
				)}

				{!editable && (
					<p className="m-0 task__title d-flex align-items-center">
						{task.title}
					</p>
				)}
				{editable && (
					<input
						type="text"
						value={task.title}
						onChange={updateTitle}
						className="task__titleInput"
					/>
				)}
			</div>

			<div className="date col-5">
				{!editable && (
					<p className="d-flex align-items-center m-0">
						{task.deadline.toDateString()}
					</p>
				)}
				{editable && (
					<input
						type="date"
						className="form-control"
						autoComplete="off"
						min={new Date().toISOString().split('T')[0]}
						value={task.deadline.toISOString().split('T')[0]}
						onChange={updateDeadline}
						required
					/>
				)}
			</div>

			<ul className="d-flex justify-content-end p-0 col-2">
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
