import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const getTodayButton = document.querySelector('button[data-direction="today"]');
const getPreviousButton = document.querySelector(
	'button[data-direction="prev"]'
);
const getNextButton = document.querySelector('button[data-direction="next"]');
const displayedMonthElem = document.querySelector(
	'.navigation__displayed-month'
);
let getDisplayedWeekStart = new Date(getItem('displayedWeekStart'));

function renderCurrentMonth() {
	// отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
	// вставить в .navigation__displayed-month
	let result = getDisplayedMonth(getDisplayedWeekStart);
	displayedMonthElem.innerHTML = `<span class="navigation__displayed-month"> ${result} </span>`;
}

const functionForNow = () => {
	return (getDisplayedWeekStart = new Date());
};

const functionForPrev = () => {
	return getDisplayedWeekStart.setDate(getDisplayedWeekStart.getDate() - 7);
};

const functionForNext = () => {
	return getDisplayedWeekStart.setDate(getDisplayedWeekStart.getDate() + 7);
};

export const initNavigation = () => {
	getTodayButton.addEventListener('click', function () {
		functionForNow();
		setItem('displayedWeekStart', getStartOfWeek(getDisplayedWeekStart));
		renderHeader();
		renderWeek();
		renderCurrentMonth();
	});
	getPreviousButton.addEventListener('click', function () {
		functionForPrev();
		setItem('displayedWeekStart', getStartOfWeek(getDisplayedWeekStart));
		renderHeader();
		renderWeek();
		renderCurrentMonth();
	});
	getNextButton.addEventListener('click', function () {
		functionForNext();
		setItem('displayedWeekStart', getStartOfWeek(getDisplayedWeekStart));
		renderHeader();
		renderWeek();
		renderCurrentMonth();
	});
};
