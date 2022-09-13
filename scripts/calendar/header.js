import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const formatter = new Intl.DateTimeFormat('en', {
	month: 'short',
	day: 'numeric',
});
const getHeaderElem = document.querySelector('.calendar__header');

export const renderHeader = () => {
	// на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
	// на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
	// полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
	// в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
	const getWeekArray = generateWeekRange(
		new Date(getItem('displayedWeekStart'))
	);
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

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
const getCreateEventButton = document.querySelector('.create-event-btn');
getCreateEventButton.addEventListener('click', () => {
	const getModalWindow = document.querySelector('.modal');
	getModalWindow.classList.remove('.hidden');
});
