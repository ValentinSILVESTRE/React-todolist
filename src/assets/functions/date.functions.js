"use strict";
exports.__esModule = true;
exports.areSameWeek = exports.maxDistance1Day = exports.areSameDate = exports.isNow = exports.getDifference = exports.getStringDifference = exports.daysCount = exports.isLeap = void 0;
/**
 * - Renvoie vrai si la prémière date est avant la seconde, faux sinon
 * @param firstDate
 * @param secondDate
 */
function isBefore(firstDate, secondDate) {
    return firstDate.valueOf() < secondDate.valueOf();
}
/**
 * - Renvoie vrai si l'année est bissextile, faux sinon.
 * @param {Number} year
 * @returns {Boolean}
 */
function isLeap(year) {
    // Les multiples de 400 le sont
    if (year % 400 === 0)
        return true;
    // Les multiples de 100 ne le sont pas
    if (year % 100 === 0)
        return false;
    // Les multiples de 4 le sont
    return year % 4 === 0;
}
exports.isLeap = isLeap;
/**
 * - Renvoie le nombre de jours du mois
 * @param monthNumber - Numéro du mois entre 1 et 12
 * @returns {Number}
 */
function daysCount(year, monthNumber) {
    if (monthNumber === 1)
        return 31;
    if (monthNumber === 2)
        return isLeap(year) ? 29 : 28;
    if (monthNumber === 3)
        return 31;
    if (monthNumber === 4)
        return 30;
    if (monthNumber === 5)
        return 31;
    if (monthNumber === 6)
        return 30;
    if (monthNumber === 7)
        return 31;
    if (monthNumber === 8)
        return 31;
    if (monthNumber === 9)
        return 30;
    if (monthNumber === 10)
        return 31;
    if (monthNumber === 11)
        return 30;
    return 31;
}
exports.daysCount = daysCount;
/**
 * - Renvoie la différence entre baseDate et date dans une chaîne de charactères
 */
function getStringDifference(baseDate, date) {
    if (getDifference(baseDate, date).year)
        return "Y".concat(isBefore(baseDate, date) ? '-' : '+').concat(getDifference(baseDate, date).year).replace('D', 'J');
    if (getDifference(baseDate, date).month)
        return "M".concat(isBefore(baseDate, date) ? '-' : '+').concat(getDifference(baseDate, date).month).replace('D', 'J');
    if (getDifference(baseDate, date).day)
        return "D".concat(isBefore(baseDate, date) ? '-' : '+').concat(getDifference(baseDate, date).day).replace('D', 'J');
    if (getDifference(baseDate, date).hour)
        return "H".concat(isBefore(baseDate, date) ? '-' : '+').concat(getDifference(baseDate, date).hour).replace('D', 'J');
    if (getDifference(baseDate, date).minute)
        return "M".concat(isBefore(baseDate, date) ? '-' : '+').concat(getDifference(baseDate, date).minute).replace('D', 'J');
    if (getDifference(baseDate, date).second)
        return "S".concat(isBefore(baseDate, date) ? '-' : '+').concat(getDifference(baseDate, date).second).replace('D', 'J');
    return 'Now';
}
exports.getStringDifference = getStringDifference;
/**
 * - Renvoie la différence absolue (positive) entre deux dates, dans un objet comportant le nombre d'années, mois, jours, heures, minutes et secondes d'écart.
 */
function getDifference(date1, date2) {
    if (isBefore(date2, date1))
        return getDifference(date2, date1);
    // Ici date1 est avant date2
    var difference = {
        year: date2.getFullYear() - date1.getFullYear(),
        month: date2.getMonth() - date1.getMonth(),
        day: date2.getDate() - date1.getDate(),
        hour: date2.getHours() - date1.getHours(),
        minute: date2.getMinutes() - date1.getMinutes(),
        second: date2.getSeconds() - date1.getSeconds()
    };
    if (difference.month < 0 && difference.year === 1) {
        difference.month += 12;
        difference.year--;
    }
    if (difference.day < 0 && difference.month === 1) {
        difference.day += daysCount(date1.getFullYear(), (date1.getMonth() + 1));
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
exports.getDifference = getDifference;
/**
 * - Renvoie vrai si la date est maintenant, à la seconde près
 */
var isNow = function (date) {
    return (Math.floor(new Date().valueOf() / 1000) ===
        Math.floor(date.valueOf() / 1000));
};
exports.isNow = isNow;
/**
 * - Renvoie vrai si les deux dates sont le meme jour, faux sinon
 */
var areSameDate = function (date1, date2) {
    // Renvoie vrai si les deux dates ont en commun l'année, le mois et le jour
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
};
exports.areSameDate = areSameDate;
/**
 * - Renvoie vrai si les deux dates sont distant d'un jour au plus, faux sinon
 */
var maxDistance1Day = function (date1, date2) {
    // On s'assure que date1 est avant date2
    if (date2.valueOf() < date1.valueOf())
        return (0, exports.maxDistance1Day)(date2, date1);
    // Renvoie vrai si le nombre de jours qui les séparent est au plus 6 - #jourDeLaSemaineDeDate1
    return (getDifference(date1, date2).year == 0 &&
        getDifference(date1, date2).month == 0 &&
        getDifference(date1, date2).day < 2);
};
exports.maxDistance1Day = maxDistance1Day;
/**
 * - Renvoie vrai si les deux dates sont de la meme semaine, faux sinon
 */
var areSameWeek = function (date1, date2) {
    // On s'assure que date1 est avant date2
    if (date2.valueOf() < date1.valueOf())
        return (0, exports.areSameWeek)(date2, date1);
    // Renvoie vrai si le nombre de jours qui les séparent est au plus 6 - #jourDeLaSemaineDeDate1
    return (getDifference(date1, date2).year == 0 &&
        getDifference(date1, date2).month == 0 &&
        getDifference(date1, date2).day < 7 &&
        (date1.getDay() + 6) % 7 <= (date2.getDay() + 6) % 7);
};
exports.areSameWeek = areSameWeek;
