import '../assets/styles/TaskList.css';
import Task from './Task';
import MockTasks from '../assets/mock/task.mock';

export interface ITaskListProps {}

export default function TaskList(props: ITaskListProps) {
	return (
		<ul className="row flex-column mw-100 p-3 mt-0 m-5 shadow-sm rounded">
			{MockTasks.map((task) => (
				<li key={task.id}>
					<Task task={task} />
				</li>
			))}
		</ul>
	);
}
