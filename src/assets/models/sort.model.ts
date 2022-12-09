export type Order = 'asc' | 'desc';

/** - Un sort est un objet des clées d'une task avec leur priorité et leur ordre ( asc | desc ) */
export default interface Sort {
	id: { priority: number; order: Order };
	title: { priority: number; order: Order };
	status: { priority: number; order: Order };
	deadline: { priority: number; order: Order };
	priority: { priority: number; order: Order };
}
