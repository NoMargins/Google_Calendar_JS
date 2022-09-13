import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');
const submitBtnElem = document.querySelector('.event-form__submit-btn');
const getInputValues = [...document.querySelectorAll('.event-form__field')];
const getEventsArr = getItem('events');

function clearEventForm() {
	// ф-ция должна очистить поля формы от значений
	getInputValues.map((el) => (el.value = ''));
}

function onCloseEventForm() {
	// здесь нужно закрыть модальное окно и очистить форму
	closeModal();
	clearEventForm();
}

const onCreateEvent = () => {
	// задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
	// создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
	// при подтверждении формы нужно считать данные с формы
	// с формы вы получите поля date, startTime, endTime, title, description
	// на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
	// date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
	// полученное событие добавляем в массив событий, что хранится в storage
	// закрываем форму
	// и запускаем перерисовку событий с помощью renderEvents

	const [title, date, startTime, endTime, description] = getInputValues;
	const startDateEvent = getDateTime(date.value, startTime.value);
	const endDateEvent = getDateTime(date.value, endTime.value);

	const newEvent = {
		id: Math.random(),
		date: date.value,
		startTime: startDateEvent,
		endTime: endDateEvent,
		title: title.value,
		description: description.value,
	};
	getItem('events').push(newEvent);

	return getEventsArr;
};

export function initEventForm() {
	// подпишитесь на сабмит формы и на закрытие формы

	eventFormElem.addEventListener('submit', function (e) {
		e.preventDefault();
		onCreateEvent();
		renderEvents(getItem('events'));
		onCloseEventForm();
	});
	closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
