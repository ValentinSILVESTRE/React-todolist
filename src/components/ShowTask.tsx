import { useState } from 'react';
import { TaskModel } from '../assets/models/task.model';
import { taskStatus } from '../assets/models/taskStatus.model';
import '../assets/styles/Task.css';

interface IShowTaskProps {
	task: TaskModel;
	updateTask: Function;
	deleteTask: Function;
	toggleEditable: Function;
}

export default function ShowTask(props: IShowTaskProps) {
	const [editable, setEditable] = useState(false);

	// const toggleEditable = () => {
	// 	setEditable(!editable);
	// };

	const toggleStatus = () => {
		const status =
			props.task.status === taskStatus.done
				? taskStatus.todo
				: taskStatus.done;
		props.updateTask({ ...props.task, status });
	};

	// const onUpdateTask = () => {
	// 	props.updateTask(props.task);
	// 	toggleEditable();
	// };

	return (
		<div
			className="task d-flex justify-content-between row mx-0 align-items-center"
			data-priority={props.task.priority}
		>
			<div className="content d-flex col justify-content-between">
				<div
					className="status me-3 d-flex align-items-center"
					onClick={toggleStatus}
				>
					{props.task.status === taskStatus.done && (
						<i className="bi bi-check-circle"></i>
					)}
					{props.task.status === taskStatus.todo && (
						<i className="bi bi-circle"></i>
					)}
				</div>

				<p className="m-0 task__title d-flex align-items-center">
					{props.task.title}
				</p>

				<div className="date col-5 d-flex justify-content-end">
					<p className="d-flex align-items-center m-0">
						{props.task.deadline.toDateString()}
					</p>
				</div>
			</div>

			<ul className="d-flex justify-content-end p-0 col-2 cta-buttons">
				<li className="">
					<button
						className="btn btn-sm p-0 me-1 btn-primary"
						onClick={() => props.toggleEditable()}
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
