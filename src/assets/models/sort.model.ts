export type _Order = 'asc' | 'desc';

/** - Un sort est un objet des clées d'une task avec leur priorité et leur ordre ( asc | desc ) */
export default interface Sort {
	id: { priority: number; order: _Order };
	title: { priority: number; order: _Order };
	status: { priority: number; order: _Order };
	deadline: { priority: number; order: _Order };
	priority: { priority: number; order: _Order };
}
