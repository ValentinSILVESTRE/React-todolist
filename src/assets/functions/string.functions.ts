/**
 * - Renvoie une nouvelle chaîne de caractère avec une majuscule au début
 * @param {String} s - Chaîne de caractères
 * @returns {String}
 */
export const capitalize = (s: string): string => {
	return s.replace(/^([a-z])/, (c: string) => c.toUpperCase());
};
