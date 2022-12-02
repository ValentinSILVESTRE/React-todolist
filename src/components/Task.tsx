import { TaskModel } from '../assets/models/task.model';
import '../assets/styles/Task.css';

export interface ITaskProps {
	task: TaskModel;
}

export default function Task(props: ITaskProps) {
	return <p className="m-0 text-start">{props.task.title}</p>;
}
