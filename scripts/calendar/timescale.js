import { createNumbersArray } from '../common/createNumbersArray.js';

const getTimeScaleElem = document.querySelector('.calendar__time-scale');
const timeZoneEl = document.createElement('div');
const getTimeZone = new Date().getTimezoneOffset() / 60;
if (getTimeZone < 0) {
	timeZoneEl.innerHTML = `<div class="calendar__time-zone" style="position: relative"><p class="calendar__time-zone_name" style="position: absolute">GMT+${Math.abs(
		getTimeZone
	)}</p></div>`;
} else {
	timeZoneEl.innerHTML = `<div class="calendar__time-zone"><p class="calendar__time-zone_name">GMT${getTimeZone}</p><p class="calendar__time-zone_decoration"></p></div>`;
}

export const renderTimescale = () => {
	// ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
	// полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
	const result = createNumbersArray(1, 24).map((timeNumber) => {
		const newTimeSlotNav = document.createElement('div');
		// const newDecorEl = document.createElement('div');
		// newDecorEl.innerHTML = `;
		if (timeNumber === 1) {
			newTimeSlotNav.setAttribute('id', 'first');
		}
		if (timeNumber < 10) {
			newTimeSlotNav.innerHTML = `<div class="calendar__time-slot" style="position: relative"><p class="calendar__time-slot_numb" style="position: absolute">
			0${timeNumber}:00  —</p></div>`;
		}
		if (timeNumber >= 10) {
			newTimeSlotNav.innerHTML = `<div class="calendar__time-slot" style="position: relative"><p class="calendar__time-slot_numb" style="position: absolute">${
				timeNumber + ':' + '00' + '   ' + '—'
			}</p></div>`;
		}
		if (timeNumber === 24) {
			newTimeSlotNav.innerHTML = `<div class="calendar__time-slot" style="position: relative"><p class="calendar__time-slot_numb" style="position: absolute">
			</p></div>`;
		}

		newTimeSlotNav.setAttribute('data-time-slot', timeNumber);

		return newTimeSlotNav;
	});

	getTimeScaleElem.append(timeZoneEl);
	getTimeScaleElem.append(...result);
};
