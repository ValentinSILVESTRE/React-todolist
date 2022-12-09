import Sort from '../models/sort.model';
import { TaskModel } from '../models/task.model';

export const taskIsBefore = (
	taskA: TaskModel,
	taskB: TaskModel,
	sort: Sort
) => {
	// * On récupère les clés du tri avec leur ordre, triées par priorité
	const sortEntries = Object.entries(sort);
	const sortEntriesSorted = sortEntries.sort(
		(a, b) => b[1].priority - a[1].priority
	);

	/** - Liste des clées triée par priority */
	const sortedKeyList = sortEntriesSorted.map(
		(data: [string, { order: 'asc' | 'desc'; priority: number }]) => {
			return { key: data[0], order: data[1].order };
		}
	);

	for (const sortKey of sortedKeyList) {
		if (sortKey.key === 'id') {
			if (sortKey.order === 'asc') return taskA.id < taskB.id ? -1 : 1;
			if (sortKey.order === 'desc') return taskA.id < taskB.id ? 1 : -1;
		}
		if (sortKey.key === 'deadline') {
			const dateA = new Date(
				taskA.deadline.toISOString().split('T')[0]
			).valueOf();
			const dateB = new Date(
				taskB.deadline.toISOString().split('T')[0]
			).valueOf();

			// Si les dates sont sont différentes, alors on renvoie la première
			if (dateA !== dateB) {
				if (sortKey.order === 'asc') return dateA - dateB;
				if (sortKey.order === 'desc') return dateB - dateA;
			}
		}
		if (sortKey.key === 'priority') {
			// De la priorité la moins importanta à la plus importante
			if (taskA.priority !== taskB.priority) {
				if (sortKey.order === 'asc') {
					return taskA.priority < taskB.priority ? 1 : -1;
				}
				if (sortKey.order === 'desc') {
					return taskA.priority > taskB.priority ? 1 : -1;
				}
			}
		}
		if (sortKey.key === 'title') {
			if (taskA.title !== taskB.title) {
				if (sortKey.order === 'asc') {
					// On renvoie celle qui a un titre inférieur alphabétiquement
					return taskA.title.toUpperCase() < taskB.title.toUpperCase()
						? -1
						: 1;
				}
				if (sortKey.order === 'desc') {
					return taskA.title.toUpperCase() < taskB.title.toUpperCase()
						? 1
						: -1;
				}
			}
		}
		if (sortKey.key === 'status') {
			// * On ne peut pas trier en fonction du status
		}
	}
	return 1;
};
