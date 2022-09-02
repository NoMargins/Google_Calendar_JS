import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
	const getTimeScaleElem = document.querySelector('.calendar__time-scale');

	// ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
	// полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
	const result = createNumbersArray(0, 24)
		.map((timeNumber) => () => {
			if (timeNumber <= 12) {
				`
			<div
				class="calendar__time-slot"
				data-time-slot="${timeNumber}"
			>${timeNumber} AM<</div>
	`;
			}
			if (timeNumber >= 13) {
				pmTimeSlot = timeNumber - 12;
				`
			<div
				class="calendar__time-slot"
				data-time-slot="${timeNumber}"
			>${pmTimeSlot} PM<</div>
	`;
			}
		})
		.join('');

	getTimeScaleElem.innerHTML = result;
};
