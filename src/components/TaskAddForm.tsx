import { useState } from 'react';
import { Priority } from '../assets/models/priority.model';
import { TaskModel } from '../assets/models/task.model';
import { taskStatus } from '../assets/models/taskStatus.model';
import '../assets/styles/TaskForm.css';

export interface ITaskAddFormProps {
	onSubmit: Function;
}

/** - La tâche par défaut qui sert à initialiser le formulaire */
const defaultTask: TaskModel = {
	deadline: new Date(),
	id: crypto.randomUUID(),
	priority: Priority.medium,
	status: taskStatus.todo,
	title: '',
};

export default function TaskAddForm(props: ITaskAddFormProps) {
	const [newTask, setNewTask] = useState(defaultTask);
	const constraints = {
		titleMinLength: 1,
		titleMaxLength: 30,
	};

	const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTask({ ...newTask, title: e.target.value });
	};

	const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTask({ ...newTask, deadline: new Date(e.target.value) });
	};

	const updatePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setNewTask({
			...newTask,
			priority: Priority[e.target.value as keyof typeof Priority],
		});
	};

	/**
	 * - Vérifie la longueure du titre et que la deadline ne soit pas déjà passée
	 */
	const formIsValid: () => boolean = () => {
		const titleIsValid =
			constraints.titleMinLength <= newTask.title.length &&
			newTask.title.length <= constraints.titleMaxLength;
		const dateIsValid =
			new Date(new Date().toISOString().split('T')[0]).valueOf() <=
			new Date(newTask.deadline.toISOString().split('T')[0]).valueOf();
		return titleIsValid && dateIsValid;
	};

	const resetForm = () => {
		// On redéfinit un nouvel id sinon il garde l'ancien
		setNewTask({ ...defaultTask, id: crypto.randomUUID() });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		// * On empêche l'actualisation de la page
		e.preventDefault();

		const form: HTMLFormElement = document.getElementsByTagName('form')[0];

		// Si le formulaire est valide on ajoute la task et on reset le formulaire, sinon on affiche un message d'erreur avec Bootstrap
		if (formIsValid()) {
			props.onSubmit(newTask);
			resetForm();
			form.classList.remove('was-validated');
		} else {
			form.classList.add('was-validated');
		}
	};

	return (
		<form
			className="needs-validation d-flex p-0 m-0 ms-5"
			onSubmit={handleSubmit}
			noValidate
		>
			<div className="form-row d-flex">
				<div className="me-1">
					<input
						type="text"
						className="form-control"
						autoComplete="off"
						placeholder="Title"
						minLength={constraints.titleMinLength}
						maxLength={constraints.titleMaxLength}
						value={newTask.title}
						onChange={updateTitle}
						required
					/>
					<div className="invalid-feedback">
						The title must be between {constraints.titleMinLength}{' '}
						to {constraints.titleMaxLength} caracters long.
					</div>
				</div>
				<div className="me-1">
					<input
						type="date"
						className="form-control"
						autoComplete="off"
						min={new Date().toISOString().split('T')[0]}
						value={newTask.deadline.toISOString().split('T')[0]}
						onChange={updateDeadline}
						required
					/>
					<div className="invalid-feedback">
						You can't create a past task.
					</div>
				</div>
				<div className="me-1">
					<select
						name="priority"
						id="priority"
						className="form-control"
						value={newTask.priority}
						onChange={updatePriority}
					>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>
				<button className="btn btn-success submit-button" type="submit">
					Add
				</button>
			</div>
		</form>
	);
}
