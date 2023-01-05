import { setNewDate, getStoredDate } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getDisplayedMonth } from '../common/time.utils.js';

const todayBtn = document.querySelector('[data-direction="today"]');
const nextBtn = document.querySelector('[data-direction="next"]');
const prevBtn = document.querySelector('[data-direction="prev"]');

const displayedMonthElem = document.querySelector(
	'.navigation__displayed-month'
);

function renderCurrentMonth() {
	const storedDate = getStoredDate();
	displayedMonthElem.innerHTML = getDisplayedMonth(storedDate);
}

export const initNavigation = () => {
	renderCurrentMonth();
	todayBtn.addEventListener('click', function () {
		const newDate = new Date();
		setNewDate(newDate);
		renderHeader();
		renderWeek();
		renderCurrentMonth();
	});

	prevBtn.addEventListener('click', function () {
		const storedDate = getStoredDate();
		const newDate = new Date(
			new Date(storedDate).setDate(new Date(storedDate).getDate() - 7)
		);
		setNewDate(newDate);
		renderHeader();
		renderWeek();
		renderCurrentMonth();
	});

	nextBtn.addEventListener('click', function () {
		const storedDate = getStoredDate();
		const newDate = new Date(
			new Date(storedDate).setDate(new Date(storedDate).getDate() + 7)
		);
		setNewDate(newDate);
		renderHeader();
		renderWeek();
		renderCurrentMonth();
	});
};
