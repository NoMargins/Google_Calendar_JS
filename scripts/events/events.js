import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { getStartOfWeek, twoDigits } from '../common/time.utils.js';
import { renderWeek } from '../calendar/calendar.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');
const getGivenMondayEl = getItem('displayedWeekStart');
const getAllEventsInStorage = getItem('events');
const getShowStorageEl = document.querySelector('.show-storage');
const getDelEvForm = document.querySelector('.delete-event-form');

function handleEventClick(event) {
	// если произошел клик по событию, то нужно паказать попап с кнопкой удаления
	// установите eventIdToDelete с id события в storage
	const getElemProps = event.target.getBoundingClientRect();
	if (event.target.classList.contains('displayed-event')) {
		event.target.addEventListener('click', function () {
			openPopup(getElemProps.left + getElemProps.width, getElemProps.top);
			setItem('eventIdToDelete', event.target.dataset.eventId);
			return getItem('eventIdToDelete');
		});
	}
}

function removeEventsFromCalendar() {
	// ф-ция для удаления всех событий с календаря
	return (getItem('events').length = 0);
}

//

const createEventElement = (event) => {
	// ф-ция создает DOM элемент события
	// событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
	// нужно добавить id события в дата атрибут
	// здесь для создания DOM элемента события используйте document.createElement
	function calcTimeDiffInMinutes(startTimeFunct, endTimeFunct) {
		const startTime = new Date(startTimeFunct);
		const endTime = new Date(endTimeFunct);
		return (endTime - startTime) / 60000;
	}
	const newEventElement = document.createElement('div');

	newEventElement.classList.add('displayed-event');
	newEventElement.setAttribute('data-event-id', event.id);
	newEventElement.setAttribute(
		'data-event-date',
		`${new Date(event.startTime).getFullYear()}${new Date(
			event.startTime
		).getMonth()}${new Date(event.startTime).getDate()}`
	);
	newEventElement.setAttribute(
		'data-event-hour',
		new Date(event.startTime).getHours()
	);
	newEventElement.setAttribute(
		'data-event-duration',
		calcTimeDiffInMinutes(event.startTime, event.endTime)
	);
	const newParagrNameEl = document.createElement('p');
	newParagrNameEl.classList.add('displayed-event__name');
	newParagrNameEl.innerText = `${event.title}`;
	const newParagrDescEl = document.createElement('p');
	newParagrDescEl.classList.add('displayed-event__description');
	newParagrDescEl.innerText = `${event.description}`;
	const newParagrTimeEl = document.createElement('p');
	newParagrTimeEl.classList.add('displayed-event__time');
	newParagrTimeEl.innerText = `${new Date(
		event.startTime
	).getHours()}:${new Date(event.startTime).getMinutes()} - ${new Date(
		event.endTime
	).getHours()}:${new Date(event.endTime).getMinutes()}`;

	newEventElement.append(newParagrNameEl, newParagrTimeEl);
	newEventElement.style.marginTop = `${new Date(
		event.startTime
	).getMinutes()}px`;
	newEventElement.style.height = `${calcTimeDiffInMinutes(
		event.startTime,
		event.endTime
	)}px`;

	return newEventElement;
};

export const renderEvents = (eventsArr) => {
	// достаем из storage все события и дату понедельника отображаемой недели
	// фильтруем события, оставляем только те, что входят в текущую неделю
	// создаем для них DOM элементы с помощью createEventElement
	// для каждого события находим на странице временную ячейку (.calendar__day_time-slot)
	// и вставляем туда событие
	// каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
	// не забудьте удалить с календаря старые события перед добавлением новых

	const getAllTimeSlotsArr = [
		...document.querySelectorAll('.calendar__day_time-slot'),
	];
	const thisWeekEventsHTML = eventsArr.map((obj) => createEventElement(obj));

	return getAllTimeSlotsArr.map((slot) => {
		thisWeekEventsHTML.map((dispEvent) => {
			if (
				slot.dataset.slotDate === dispEvent.dataset.eventDate &&
				slot.dataset.timeSlot === dispEvent.dataset.eventHour
			) {
				slot.style.position = 'relative';
				dispEvent.style.position = 'absolute';
				return slot.prepend(dispEvent);
			}
		});
	});
};

function onDeleteEvent() {
	// достаем из storage массив событий и eventIdToDelete
	// удаляем из массива нужное событие и записываем в storage новый массив
	// закрыть попап
	// перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
	const delEventId = getItem('eventIdToDelete');
	const getEventToDel = document.querySelector(
		`.displayed-event[data-event-id="${delEventId}"]`
	);
	closePopup();
	return getEventToDel.classList.add('hidden');
}

weekElem.addEventListener('click', handleEventClick);

deleteEventBtn.onclick = onDeleteEvent;
