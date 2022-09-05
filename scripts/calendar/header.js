import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderHeader = () => {
	// на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
	// на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
	// полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
	// в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
	const getHeaderElem = document.querySelector('.calendar__header');
	const getWeekArray = generateWeekRange(storage.displayedWeekStart);
	const result = getWeekArray.map((el) => () => {
		const formatter = new Intl.DateTimeFormat('en', {
			month: 'short',
			day: 'numeric',
		});
		formatter.format(new Date(el));
	});
	getHeaderElem.innerHTML = result;
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
const getCreateEventButton = document.querySelector('.create-event-btn');
getCreateEventButton.addEventListener('onclick', () => {
	const getModalWindow = document.querySelector('.modal');
	getModalWindow.classList.remove('.hidden');
});
