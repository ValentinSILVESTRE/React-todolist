import '../assets/styles/TaskList.css';
import Task from './Task';
import { TaskModel } from '../assets/models/task.model';

export interface ITaskListProps {
	tasks: TaskModel[];
	updateTask: Function;
	deleteTask: Function;
}

export default function TaskList(props: ITaskListProps) {
	return (
		<>
			<ul className="list-group row flex-column mw-100 mt-3 m-5 shadow-sm rounded">
				{props.tasks
					.sort(
						(t1, t2) =>
							t1.deadline.valueOf() - t2.deadline.valueOf()
					)
					.map((task) => (
						<li
							key={task.id}
							className="list-group-item bg-transparent"
						>
							<Task
								task={task}
								updateTask={props.updateTask}
								deleteTask={props.deleteTask}
							/>
						</li>
					))}
			</ul>
		</>
	);
}
