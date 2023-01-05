import { getStoredDate } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';

const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const getHeaderElem = document.querySelector('.calendar__header');

export const renderHeader = () => {
	const getWeekArray = generateWeekRange(new Date(getStoredDate()));
	const result = getWeekArray
		.map((el) => {
			return `<header class="calendar__header">
			<div class="day_name">${daysOfWeek[el.getDay()]}</div>
			<div class="day_numb">${el.getDate()}</div>
			</header>`;
		})
		.join('');
	getHeaderElem.innerHTML = result;
};

const getCreateEventButton = document.querySelector('.create-event-btn');
getCreateEventButton.addEventListener('click', () => {
	const getModalWindow = document.querySelector('.modal');
	getModalWindow.classList.remove('.hidden');
});
