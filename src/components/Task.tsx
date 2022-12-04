import { useState } from 'react';
import { Priority } from '../assets/models/priority.model';
import { TaskModel } from '../assets/models/task.model';
import { taskStatus } from '../assets/models/taskStatus.model';
import '../assets/styles/Task.css';

interface ITaskProps {
	task: TaskModel;
	updateTask: Function;
	deleteTask: Function;
}

export default function Task(props: ITaskProps) {
	const [editable, setEditable] = useState(false);
	const [task, setTask] = useState(props.task);

	const toggleEditable = () => {
		setEditable(!editable);
	};

	const toggleStatus = () => {
		const status =
			task.status === taskStatus.done ? taskStatus.todo : taskStatus.done;
		props.updateTask({ ...task, status });
	};

	const updatePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const priority = Priority[e.target.value as keyof typeof Priority];
		setTask({ ...task, priority });
	};

	const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value;
		setTask({ ...task, title });
	};

	const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
		const deadline = new Date(e.target.value);
		setTask({ ...task, deadline });
	};

	const onUpdateTask = () => {
		props.updateTask(task);
		toggleEditable();
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

			<ul className="d-flex justify-content-end p-0 col-2 cta-buttons">
				<li className="">
					<button
						className={`btn btn-sm p-0 me-1 ${
							editable ? 'btn-success' : 'btn-primary'
						}`}
						onClick={onUpdateTask}
					>
						{!editable && (
							<i className="p-1 bi bi-pencil text-white"></i>
						)}
						{editable && <i className="bi bi-check-lg"></i>}
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
