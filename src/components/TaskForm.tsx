import { useState } from 'react';
import { TaskModel } from '../assets/models/task.model';

export interface ITaskFormProps {
	addTask: Function;
}

export default function TaskForm(props: ITaskFormProps) {
	const [title, setTitle] = useState('');

	const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const id = crypto.randomUUID();
		const newTask: TaskModel = { id, title };
		props.addTask(newTask);
		form.reset();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="d-flex align-items-center mw-100 p-0 m-0 ms-5"
		>
			<label htmlFor="title" className="">
				<input
					type="text"
					id="title"
					name="title"
					placeholder="New task"
					value={title}
					onChange={updateTitle}
				/>
			</label>
			<button type="submit" className="btn btn-success ms-2">
				Add
			</button>
		</form>
	);
}
