import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';
import { getStartOfWeek } from '../common/time.utils.js';

const getTimeScaleElem = document.querySelector('.calendar__time-scale');
const getWeekElem = document.querySelector('.calendar__week');

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderWeek = () => {
	// функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
	// разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
	// массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
	// каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
	// после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents

	const getDatesRange = generateWeekRange(
		new Date(getItem('displayedWeekStart'))
	);

	//new elements for the day

	const result = getDatesRange.map((dayNumb) => {
		const createNewDiv = document.createElement('div');
		createNewDiv.classList.add('calendar__day');
		const createNewNameParag = document.createElement('p');
		createNewNameParag.classList.add('calendar__day_name');
		const createNewNumbParag = document.createElement('p');
		createNewNumbParag.classList.add('calendar__day_numb');
		const createDecorationParag = document.createElement('p');
		createDecorationParag.classList.add('calendar__day_decoration');

		//new time slots
		const newSlots = createNumbersArray(1, 24).map((timeNumber) => {
			const newTimeSlotEL = document.createElement('div');
			newTimeSlotEL.classList.add('calendar__day_time-slot');
			newTimeSlotEL.setAttribute('data-time-slot', timeNumber);
			newTimeSlotEL.setAttribute(
				'data-slot-date',
				`${dayNumb.getFullYear()}${dayNumb.getMonth()}${dayNumb.getDate()}`
			);
			newTimeSlotEL.innerText = `${timeNumber}`;
			// newTimeSlotEL.innerText = ` `;

			return newTimeSlotEL;
		});
		// .join('');
		// proceed
		createNewDiv.setAttribute(
			'data-day-date',
			`${dayNumb.getFullYear()}${dayNumb.getMonth()}${dayNumb.getDate()}`
		);
		createNewNameParag.innerText = `${daysOfWeek[dayNumb.getDay()]}`;
		createNewNumbParag.innerText = `${dayNumb.getDate()}`;
		createNewDiv.append(
			createNewNameParag,
			createNewNumbParag,
			createDecorationParag
		);
		createNewDiv.append(...newSlots);
		return createNewDiv;
	});

	getWeekElem.innerHTML = '';
	getWeekElem.prepend(...result);
	renderEvents(getItem('events'));
};

const getChoosenEl = [...document.querySelectorAll('.for-choose-options')];

export const getChoosenDay = () =>
	getChoosenEl.forEach((el) => {
		el.addEventListener('click', function () {
			el.classList.add('calendar__chosen-date');
		});
	});
