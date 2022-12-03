import { TaskModel } from '../assets/models/task.model';
import '../assets/styles/Task.css';

interface ITaskProps {
	task: TaskModel;
	deleteTask: Function;
}

export default function Task(props: ITaskProps) {
	return (
		<div className="task d-flex justify-content-between">
			<p className="m-0">{props.task.title}</p>
			<ul className="d-flex p-0">
				<li className="">
					<button
						className="btn btn-sm btn-info p-0 me-2"
						onClick={(event: React.MouseEvent<HTMLElement>) =>
							props.deleteTask(props.task.id)
						}
					>
						<i className="text-center p-1 bi bi-pencil"></i>
					</button>
				</li>
				<li className="">
					<button
						className="btn btn-sm btn-danger p-0"
						onClick={(event: React.MouseEvent<HTMLElement>) =>
							props.deleteTask(props.task.id)
						}
					>
						<i className="text-center p-1 bi bi-x"></i>
					</button>
				</li>
			</ul>
		</div>
	);
}
