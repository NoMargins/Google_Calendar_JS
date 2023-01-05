import { getStoredDate } from '../common/storage.js';
import { generateWeekRange, getStartOfWeek } from '../common/time.utils.js';
import { createNumbersArray } from '../common/createNumbersArray.js';
import { renderEvents } from '../events/events.js';

const getWeekElem = document.querySelector('.calendar__week');
const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderWeek = () => {
	const getDatesRange = generateWeekRange(
		new Date(getStartOfWeek(new Date(getStoredDate())))
	);
	//let's create 7 days
	const result = getDatesRange.map((dayNumb) => {
		const newDivForDay = document.createElement('div');
		newDivForDay.classList.add('calendar__day');
		const stickyContainer = document.createElement('div');
		stickyContainer.classList.add('sticky');
		stickyContainer.style.position = 'sticky';
		const createNewNameParag = document.createElement('p');
		createNewNameParag.classList.add('calendar__day_name');
		const createNewNumbParag = document.createElement('p');
		createNewNumbParag.classList.add('calendar__day_numb');
		const createDecorationParag = document.createElement('p');
		createDecorationParag.classList.add('calendar__day_decoration');
		//let's create new time slots in every Day element
		const newSlots = createNumbersArray(1, 24).map((timeNumber) => {
			const newTimeSlotEL = document.createElement('div');
			newTimeSlotEL.classList.add('calendar__day_time-slot');
			newTimeSlotEL.setAttribute('data-time-slot', timeNumber - 1);
			newTimeSlotEL.setAttribute(
				'data-slot-date',
				`${dayNumb.getFullYear()}${dayNumb.getMonth()}${dayNumb.getDate()}`
			);
			newTimeSlotEL.setAttribute(
				'data-full-date',
				`${new Date(dayNumb).setHours(timeNumber - 1)}`
			);
			newTimeSlotEL.innerText = ``;
			return newTimeSlotEL;
		});
		newDivForDay.setAttribute(
			'data-day-date',
			`${dayNumb.getFullYear()}${dayNumb.getMonth()}${dayNumb.getDate()}`
		);
		newDivForDay.setAttribute('data-day-fulldate', new Date(dayNumb));
		if (
			new Date(dayNumb).getFullYear() === new Date().getFullYear() &&
			new Date(dayNumb).getMonth() === new Date().getMonth() &&
			new Date(dayNumb).getDate() === new Date().getDate()
		) {
			newDivForDay.classList.add('calendar__day_today');
		}
		newDivForDay.setAttribute('data-day-numb', `${dayNumb.getDay()}`);
		createNewNameParag.innerText = `${daysOfWeek[dayNumb.getDay()]}`;
		createNewNumbParag.innerText = `${dayNumb.getDate()}`;
		stickyContainer.append(
			createNewNameParag,
			createNewNumbParag,
			createDecorationParag
		);
		newDivForDay.append(stickyContainer);
		newDivForDay.append(...newSlots);
		return newDivForDay;
	});

	getWeekElem.innerHTML = '';
	getWeekElem.prepend(...result);
	renderEvents();
};
