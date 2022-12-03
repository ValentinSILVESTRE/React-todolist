type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type DayNumber =
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31;

/**
 * - Renvoie vrai si la prémière date est avant la seconde, faux sinon
 * @param firstDate
 * @param secondDate
 */
function isBefore(firstDate: Date, secondDate: Date) {
	return firstDate.valueOf() < secondDate.valueOf();
}

/**
 * - Renvoie vrai si l'année est bissextile, faux sinon.
 * @param {Number} year
 * @returns {Boolean}
 */
export function isLeap(year: number): boolean {
	// Les multiples de 400 le sont
	if (year % 400 === 0) return true;

	// Les multiples de 100 ne le sont pas
	if (year % 100 === 0) return false;

	// Les multiples de 4 le sont
	return year % 4 === 0;
}

/**
 * - Renvoie le nombre de jours du mois
 * @param monthNumber - Numéro du mois entre 1 et 12
 * @returns {Number}
 */
export function daysCount(year: number, monthNumber: MonthNumber): DayNumber {
	if (monthNumber === 1) return 31;
	if (monthNumber === 2) return isLeap(year) ? 29 : 28;
	if (monthNumber === 3) return 31;
	if (monthNumber === 4) return 30;
	if (monthNumber === 5) return 31;
	if (monthNumber === 6) return 30;
	if (monthNumber === 7) return 31;
	if (monthNumber === 8) return 31;
	if (monthNumber === 9) return 30;
	if (monthNumber === 10) return 31;
	if (monthNumber === 11) return 30;
	return 31;
}

/**
 * - Renvoie la différence entre baseDate et date dans une chaîne de charactères
 */
export function getStringDifference(baseDate: Date, date: Date): string {
	if (getDifference(baseDate, date).year)
		return `Y${isBefore(baseDate, date) ? '-' : '+'}${
			getDifference(baseDate, date).year
		}`.replace('D', 'J');
	if (getDifference(baseDate, date).month)
		return `M${isBefore(baseDate, date) ? '-' : '+'}${
			getDifference(baseDate, date).month
		}`.replace('D', 'J');
	if (getDifference(baseDate, date).day)
		return `D${isBefore(baseDate, date) ? '-' : '+'}${
			getDifference(baseDate, date).day
		}`.replace('D', 'J');
	if (getDifference(baseDate, date).hour)
		return `H${isBefore(baseDate, date) ? '-' : '+'}${
			getDifference(baseDate, date).hour
		}`.replace('D', 'J');
	if (getDifference(baseDate, date).minute)
		return `M${isBefore(baseDate, date) ? '-' : '+'}${
			getDifference(baseDate, date).minute
		}`.replace('D', 'J');
	if (getDifference(baseDate, date).second)
		return `S${isBefore(baseDate, date) ? '-' : '+'}${
			getDifference(baseDate, date).second
		}`.replace('D', 'J');
	return 'Now';
}

/**
 * - Renvoie la différence absolue (positive) entre deux dates, dans un objet comportant le nombre d'années, mois, jours, heures, minutes et secondes d'écart.
 */
export function getDifference(
	date1: Date,
	date2: Date
): {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
} {
	if (isBefore(date2, date1)) return getDifference(date2, date1);
	// Ici date1 est avant date2

	const difference = {
		year: date2.getFullYear() - date1.getFullYear(),
		month: date2.getMonth() - date1.getMonth(),
		day: date2.getDate() - date1.getDate(),
		hour: date2.getHours() - date1.getHours(),
		minute: date2.getMinutes() - date1.getMinutes(),
		second: date2.getSeconds() - date1.getSeconds(),
	};

	if (difference.month < 0 && difference.year === 1) {
		difference.month += 12;
		difference.year--;
	}

	if (difference.day < 0 && difference.month === 1) {
		difference.day += daysCount(
			date1.getFullYear(),
			(date1.getMonth() + 1) as MonthNumber
		);
		difference.month--;
	}

	if (difference.hour < 0 && difference.day === 1) {
		difference.hour += 24;
		difference.day--;
	}

	if (difference.minute < 0 && difference.hour === 1) {
		difference.minute += 60;
		difference.hour--;
	}

	if (difference.second < 0 && difference.minute === 1) {
		difference.second += 60;
		difference.minute--;
	}

	return difference;
}

/**
 * - Renvoie vrai si la date est maintenant, à la seconde près
 */
export const isNow = (date: Date): boolean => {
	return (
		Math.floor(new Date().valueOf() / 1000) ===
		Math.floor(date.valueOf() / 1000)
	);
};

/**
 * - Renvoie vrai si les deux dates sont le meme jour, faux sinon
 */
export const areSameDate = (date1: Date, date2: Date): boolean => {
	// Renvoie vrai si les deux dates ont en commun l'année, le mois et le jour
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

/**
 * - Renvoie vrai si les deux dates sont distant d'un jour au plus, faux sinon
 */
export const maxDistance1Day = (date1: Date, date2: Date): boolean => {
	// On s'assure que date1 est avant date2
	if (date2.valueOf() < date1.valueOf()) return maxDistance1Day(date2, date1);

	// Renvoie vrai si le nombre de jours qui les séparent est au plus 6 - #jourDeLaSemaineDeDate1

	return (
		getDifference(date1, date2).year == 0 &&
		getDifference(date1, date2).month == 0 &&
		getDifference(date1, date2).day < 2
	);
};

/**
 * - Renvoie vrai si les deux dates sont de la meme semaine, faux sinon
 */
export const areSameWeek = (date1: Date, date2: Date): boolean => {
	// On s'assure que date1 est avant date2
	if (date2.valueOf() < date1.valueOf()) return areSameWeek(date2, date1);

	// Renvoie vrai si le nombre de jours qui les séparent est au plus 6 - #jourDeLaSemaineDeDate1
	return (
		getDifference(date1, date2).year == 0 &&
		getDifference(date1, date2).month == 0 &&
		getDifference(date1, date2).day < 7 &&
		(date1.getDay() + 6) % 7 <= (date2.getDay() + 6) % 7
	);
};
