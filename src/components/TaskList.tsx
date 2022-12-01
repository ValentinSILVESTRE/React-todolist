import '../assets/styles/TaskList.css';
import Task from './Task';
import MockTasks from '../assets/mock/task.mock';

export interface ITaskListProps {}

export default function TaskList(props: ITaskListProps) {
	return (
		<ul className="gy-3 row flex-column mw-100">
			{MockTasks.map((task) => (
				<li key={task.id}>
					<Task task={task} />
				</li>
			))}
		</ul>
	);
}
