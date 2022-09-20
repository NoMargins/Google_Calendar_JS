import { createNumbersArray } from '../common/createNumbersArray.js';

const getTimeScaleElem = document.querySelector('.calendar__time-scale');
const timeZoneEl = document.createElement('div');
const svgAddLogo = document.createElement('div');
svgAddLogo.classList.add('svg-logo-plus');
svgAddLogo.innerHTML = `<svg width="36" height="36" viewBox="0 0 36 36"><path fill="#34A853" d="M16 16v14h4V20z"/><path fill="#4285F4" d="M30 16H20l-4 4h14z"/><path fill="#FBBC05" d="M6 16v4h10l4-4z"/><path fill="#EA4335" d="M20 16V6h-4v14z"/><path fill="none" d="M0 0h36v36H0z"/></svg>`;
const getTimeZone = new Date().getTimezoneOffset() / 60;
if (getTimeZone < 0) {
	timeZoneEl.innerHTML = `<div class="calendar__time-zone"><p class="calendar__time-zone_name">GMT+${Math.abs(
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
			0${timeNumber}:00   —</p></div>`;
		}
		if (timeNumber >= 10) {
			newTimeSlotNav.innerHTML = `<div class="calendar__time-slot" style="position: relative"><p class="calendar__time-slot_numb" style="position: absolute">${timeNumber}:00    —</p></div>`;
		}
		if (timeNumber === 24) {
			newTimeSlotNav.innerHTML = `<div class="calendar__time-slot" style="position: relative"><p class="calendar__time-slot_numb" style="position: absolute">
			</p></div>`;
		}

		newTimeSlotNav.setAttribute('data-time-slot', timeNumber);

		return newTimeSlotNav;
	});

	svgAddLogo.append(timeZoneEl);
	getTimeScaleElem.append(svgAddLogo);
	getTimeScaleElem.append(...result);
};
