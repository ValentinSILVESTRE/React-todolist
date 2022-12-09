import { useState } from 'react';
import { Priority } from '../assets/models/priority.model';
import { TaskModel } from '../assets/models/task.model';
import '../assets/styles/Task.css';

interface IEditTaskProps {
	task: TaskModel;
	updateTask: Function;
	deleteTask: Function;
	toggleEditable: Function;
}

export default function EditTask(props: IEditTaskProps) {
	const [task, setTask] = useState(props.task);

	const updatePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const priority = Priority[e.target.value as keyof typeof Priority];
		setTask({ ...task, priority });
	};

	const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(12);
		const title = e.target.value;
		setTask({ ...task, title });
	};

	const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
		const deadline = new Date(e.target.value);
		setTask({ ...task, deadline });
	};

	const persist = () => {
		props.updateTask(task);
		props.toggleEditable();
	};

	return (
		<div
			className="task d-flex justify-content-between row mx-0"
			data-priority={task.priority}
		>
			<div className="content d-flex col flex-column">
				<div className="form-group row d-flex align-items-center mb-2 justify-content-between">
					<label htmlFor="title" className="me-1 col-3">
						Title
					</label>
					<input
						id="title"
						type="text"
						value={task.title}
						onChange={updateTitle}
						className="task__titleInput col"
					/>
				</div>

				<div className="date form-group row d-flex align-items-center mb-2 justify-content-between">
					<label htmlFor="date" className="me-1 col-3">
						Deadline
					</label>
					<input
						type="date"
						className="form-control col"
						autoComplete="off"
						min={new Date().toISOString().split('T')[0]}
						value={task.deadline.toISOString().split('T')[0]}
						onChange={updateDeadline}
						required
					/>
				</div>

				<div className="form-group row d-flex align-items-center justify-content-between">
					<label htmlFor="priority" className="me-1 col-3">
						Priority
					</label>
					<select
						name="priority"
						id="priority"
						className="form-select col"
						value={task.priority}
						onChange={updatePriority}
					>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>
			</div>

			<ul className="d-flex justify-content-end p-0 col-2 cta-buttons">
				<li className="d-flex align-items-center">
					<button
						className="btn btn-sm p-0 me-1 btn-success"
						onClick={persist}
					>
						<i className="bi bi-check-lg"></i>
					</button>
				</li>
				<li className="d-flex align-items-center">
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
