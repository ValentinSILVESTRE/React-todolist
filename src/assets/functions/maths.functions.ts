/**
 * - Une liste de nombres aléatoires
 * @param count - Nombre d'entiers à choisir
 * @param max - Valeur maximale des entiers
 * @param min - Valeur minimale des entiers, 0 par défaut
 * @param excludeList - Valeures à exclure
 * @returns Un sous-ensemble de [[ min ; max ]] \ excludeList
 */
export function randomIntegers(
	count: number,
	max: number,
	min: number = 0,
	excludeList: number[] = []
): number[] {
	/** - Valeure entière de count */
	const countInteger: number = Math.floor(count);
	/** - Valeure entière de min */
	const minInteger: number = Math.floor(min);
	/** - Valeure entière de max */
	const maxInteger: number = Math.floor(max);

	if (max < min) {
		return randomIntegers(count, min, max);
	}

	/** - Liste des nombres choisis */
	const numbers: number[] = [];

	if (countInteger >= 0 && countInteger <= maxInteger - minInteger + 1) {
		/** - Liste des nombres pas encore choisis */
		let unchoosenNumbers: number[] = [];

		// On remplit la liste des nombres pouvant être choisis
		for (let i = minInteger; i <= maxInteger; i++) {
			if (!excludeList.includes(i)) {
				unchoosenNumbers.push(i);
			}
		}

		// Tant qu'il reste un entier à choisir
		while (numbers.length < countInteger) {
			const i: number = getRandomInt(unchoosenNumbers.length - 1);
			numbers.push(unchoosenNumbers[i]);
			unchoosenNumbers = unchoosenNumbers.filter(
				(element) => element !== unchoosenNumbers[i]
			);
		}
	} else {
		throw new Error(
			`Impossible de choisir ${countInteger} entier${
				countInteger > 1 ? 's différents' : ''
			} dans [[ ${minInteger} ; ${maxInteger} ]]`
		);
	}

	return numbers;
}

/**
 * - Renvoie un nombre entier aléatoire
 * @param max - La borne maximale pouvant être atteinte
 * @param min - La borne minimale pouvant être atteinte
 * @returns Une valeure de [[ min ; max ]]
 */
export function getRandomInt(max: number, min: number = 0): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/** - Renvoie la valeure binaire (string) de l'entier à convertir */
export function dec2bin(dec: number): string {
	return (dec >>> 0).toString(2);
}
