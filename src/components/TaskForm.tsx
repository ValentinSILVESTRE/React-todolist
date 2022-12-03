import { useState } from 'react';
import { TaskModel } from '../assets/models/task.model';
import { taskStatus } from '../assets/models/taskStatus.model';
import '../assets/styles/TaskForm.css';

export interface ITaskFormProps {
	addTask: Function;
}

export default function TaskForm(props: ITaskFormProps) {
	const defaultTitle = '';
	const defaultDeadline = new Date();

	const [title, setTitle] = useState(defaultTitle);
	const [deadline, setDeadline] = useState(defaultDeadline);
	const titleMinLength = 1,
		titleMaxLength = 30;

	const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDeadline(new Date(e.target.value));
	};

	/**
	 * - Vérifie la longueure du titre
	 */
	const formIsValid: () => boolean = () => {
		const titleIsValid =
			titleMinLength <= title.length && title.length <= titleMaxLength;
		const dateIsValid =
			new Date(new Date().toISOString().split('T')[0]).valueOf() <=
			new Date(deadline.toISOString().split('T')[0]).valueOf();
		return titleIsValid && dateIsValid;
	};

	const resetForm = () => {
		setTitle(defaultTitle);
		setDeadline(defaultDeadline);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		// * On empêche l'actualisation de la page
		e.preventDefault();

		const form: HTMLFormElement = document.getElementsByTagName('form')[0];

		// Si le formulaire est valide on ajoute la task et on reset le formulaire, sinon on affiche un message d'erreur avec Bootstrap
		if (formIsValid()) {
			const id = crypto.randomUUID();
			const status = taskStatus.todo;
			const newTask: TaskModel = { id, title, status, deadline };
			props.addTask(newTask);
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
						minLength={titleMinLength}
						maxLength={titleMaxLength}
						value={title}
						onChange={updateTitle}
						required
					/>
					<div className="invalid-feedback">
						The title must be between {titleMinLength} to{' '}
						{titleMaxLength} caracters long.
					</div>
				</div>
				<div className="me-1">
					<input
						type="date"
						className="form-control"
						autoComplete="off"
						min={new Date().toISOString().split('T')[0]}
						value={deadline.toISOString().split('T')[0]}
						onChange={updateDeadline}
						required
					/>
					<div className="invalid-feedback">
						You can't create a past task.
					</div>
				</div>
				<button className="btn btn-success submit-button" type="submit">
					Add
				</button>
			</div>
		</form>
	);
}
