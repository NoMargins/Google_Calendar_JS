import { createNumbersArray } from '../common/createNumbersArray.js';

const getTimeScaleElem = document.querySelector('.calendar__time-scale');
const timeZoneEl = document.createElement('div');
const getTimeZone = new Date().getTimezoneOffset() / 60;
if (getTimeZone < 0) {
	timeZoneEl.innerHTML = `<div class="calendar__time-zone"><p class="calendar__time-zone_name">GMT+${Math.abs(
		getTimeZone
	)}</p><p class="calendar__time-zone_decoration"></p></div>`;
} else {
	timeZoneEl.innerHTML = `<div class="calendar__time-zone"><p class="calendar__time-zone_name">GMT${getTimeZone}</p><p class="calendar__time-zone_decoration"></p></div>`;
}

export const renderTimescale = () => {
	// ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
	// полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
	const result = createNumbersArray(1, 24).map((timeNumber) => {
		const newTimeSlotNav = document.createElement('div');
		newTimeSlotNav.setAttribute('data-time-slot', timeNumber);
		newTimeSlotNav.innerHTML = `<div class="calendar__time-slot"><p class='calendar__time-slot_numb'>${
			timeNumber + ':' + '00'
		}</p><p class="calendar__time-slot_decoration"></p></div>`;
		return newTimeSlotNav;
	});

	getTimeScaleElem.append(timeZoneEl);
	getTimeScaleElem.append(...result);
};
