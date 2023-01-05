import {
	setEventIdToDelete,
	getEventIdToDelete,
	getAllStoredEvents,
	deleteEvent,
	getEvent,
} from '../common/storage.js';
import { closePopup } from '../common/popup.js';
import { checkForDigits, calcTimeDiffInMinutes } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';
import moment from 'moment';

function removeEventsFromCalendar() {
	return [...document.querySelectorAll('.calendar__day_time-slot')].map(
		(timeslot) => {
			let allEvents = [...document.querySelectorAll('.displayed-event')];
			for (let i = 0; i < allEvents.length; i++) {
				if (allEvents[i].parentNode === timeslot) {
					return timeslot.removeChild(allEvents[i]);
				}
			}
		}
	);
}

const createEventElement = (event) => {
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
	const newParagrNameEl = document.createElement('p');
	newParagrNameEl.classList.add('displayed-event__name');
	newParagrNameEl.innerText = `${event.title}`;
	const newParagrTimeEl = document.createElement('p');
	newParagrTimeEl.classList.add('displayed-event__time');
	const startHour = new Date(event.startTime).getHours();
	const endHour = new Date(event.endTime).getHours();
	const startMinutes = new Date(event.startTime).getMinutes();
	const endMinutes = new Date(event.endTime).getMinutes();
	newParagrTimeEl.innerText = `${checkForDigits(startHour)}:${checkForDigits(
		startMinutes
	)} - ${checkForDigits(endHour)}:${checkForDigits(endMinutes)}`;
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

export const renderEvents = () => {
	removeEventsFromCalendar();
	const getAllTimeSlotsArr = [
		...document.querySelectorAll('.calendar__day_time-slot'),
	];

	const allEvents = getAllStoredEvents();
	getAllTimeSlotsArr.map((slot) => {
		allEvents.then((res) => {
			res
				.sort((a, b) => (b.startTime > a.startTime ? 1 : -1))
				.map((obj) => createEventElement(obj))
				.map((dispEvent) => {
					if (
						slot.dataset.slotDate === dispEvent.dataset.eventDate &&
						slot.dataset.timeSlot === dispEvent.dataset.eventHour
					) {
						slot.style.position = 'relative';
						slot.style.display = 'flex';
						slot.style.flexDirection = 'column';
						dispEvent.style.position = 'absolute';
						return slot.prepend(dispEvent);
					}
				});
		});
	});

	[...document.querySelectorAll('.calendar__day_time-slot')]
		.filter((slot) => slot.childElementCount >= 2)
		.map((slot) =>
			[...slot.children].map((child) => {
				child.style.width = '50%';
				const allPropsOfChild = window.getComputedStyle([...slot.children][0]);
				[...slot.children][1].style.width = `${
					parseInt(allPropsOfChild.width) - 1
				}px`;
				[...slot.children][1].style.left = `${
					parseInt(allPropsOfChild.width) + 2
				}px`;
			})
		);
};

export const renderPopupBoard = (event) => {
	const getThisEvent = getEvent(Number(event.target.dataset.eventId));
	const popupInfoTitleElem = document.querySelector('.popup__event-title');
	const popupInfoDateElem = document.querySelector('.popup__event-date');
	const popupInfoDescriptionElem = document.querySelector(
		'.popup__event-description'
	);

	getThisEvent.then((res) => {
		const { title, description, startTime, endTime } = res;
		popupInfoTitleElem.textContent = `${title}`;

		popupInfoDateElem.textContent = `${moment(startTime).format(
			'MMMM, D, HH:mm'
		)} - ${moment(endTime).format('HH:mm')}`;

		popupInfoDescriptionElem.textContent = `${description}`;
	});
};

export const onDeleteEvent = () => {
	const delEventId = getEventIdToDelete();
	deleteEvent(delEventId).then(function () {
		renderEvents();
	});
	setEventIdToDelete(null);
	closePopup();
};

function editEventData() {
	const eventId = document.querySelector('.popup__content').dataset.popupId;
	closePopup();
	openModal();
	const getInputValues = document.querySelectorAll('.event-form__field');
	const [
		titleInput,
		dateInput,
		startTimeInput,
		endTimeInput,
		descriptionInput,
	] = getInputValues;

	const getEventFromStorage = getEvent(Number(eventId));
	getEventFromStorage.then((res) => {
		const { id, date, title, description, startTime, endTime } = res;
		const getEventForm = document.querySelector('.event-form');
		getEventForm.setAttribute('id', id);
		const startTimeNeeded = `${moment(startTime).format('HH:mm')}`;
		const endTimeNeeded = `${moment(endTime).format('HH:mm')}`;
		const dateNeeded = `${date}`;
		// return input values with the current event data;
		titleInput.value = title;
		descriptionInput.value = description;
		startTimeInput.value = startTimeNeeded;
		endTimeInput.value = endTimeNeeded;
		dateInput.value = dateNeeded;
		document.querySelector('.event-form__submit-btn').textContent = 'Edit';
	});
}

export const clearEventIdToDelete = () => {
	if (document.querySelectorAll('.hidden').length >= 1) {
		return setEventIdToDelete(null);
	}
};

// let's add the event listeners to Edit, Delete, and Close buttons of the modal window
[...document.querySelectorAll('.displayed-event')].map((el) =>
	el.addEventListener('click', () => {
		renderPopupBoard();
	})
);

document.querySelector('.edit-event-btn').addEventListener('click', () => {
	editEventData();
});

document
	.querySelector('.delete-event-btn')
	.addEventListener('click', function () {
		onDeleteEvent();
	});
document
	.querySelector('.close-event-btn')
	.addEventListener('click', function () {
		document.querySelector('.popup__content').removeAttribute('data-popup-id');
		setEventIdToDelete(null);
		closePopup();
	});
