import { useState } from 'react';
import { TaskModel } from '../assets/models/task.model';

export interface ITaskFormProps {
	addTask: Function;
}

export default function TaskForm(props: ITaskFormProps) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const id = crypto.randomUUID();
		const newTask: TaskModel = { id, title: 'New task' };
		props.addTask(newTask);
		console.log(e);
		console.log(form);
		form.reset();
		// console.table(newTask);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Titre de la tâche :
				<input type="text" />
			</label>
			<button type="submit">Valider</button>
		</form>
	);
}
