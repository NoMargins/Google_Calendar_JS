import { getItem, setItem } from '../common/storage.js';
import { renderEvents, renderEventBoard, onDeleteEvent } from './events.js';
import { getDateTime, checkForDigits } from '../common/time.utils.js';
import { openModal, closeModal } from '../common/modal.js';
import { openPopup } from '../common/popup.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');
const getInputValues = [...document.querySelectorAll('.event-form__field')];
const errorBoard = document.querySelector('.error-board');

function clearEventForm() {
	[...document.querySelectorAll('.event-form__field')].map(
		(el) => (el.value = '')
	);
}

function onCloseEventForm() {
	closeModal();
	clearEventForm();
}

export const onCreateEvent = () => {
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
	setItem('events', newEvent);
};

const onTimeSlotClick = (event) => {
	// this is a function which react to the click on the week table
	// if the click occured for the empty time-slot elements, the function performes the following algorithm
	if (event.target.classList.contains('calendar__day_time-slot')) {
		openModal();
		setItem('eventIdToDelete', null);

		const [title, date, startTime, endTime, description] = getInputValues;
		let month = new Date(Number(event.target.dataset.fullDate)).getMonth() + 1;
		const year = new Date(Number(event.target.dataset.fullDate)).getFullYear();
		let dateNeeded = new Date(Number(event.target.dataset.fullDate)).getDate();
		let hourNeeded = new Date(Number(event.target.dataset.fullDate)).getHours();
		let hourPlusTime = hourNeeded + 1;

		date.value = `${year}-${checkForDigits(month)}-${checkForDigits(
			dateNeeded
		)}`;
		startTime.value = `${checkForDigits(hourNeeded)}:00`;
		endTime.value = `${checkForDigits(hourPlusTime)}:00`;
	}
	// if the click complies with some of the Displayed Events, the function performes this algorithm
	if (
		event.target.classList.contains('displayed-event') ||
		event.target.parentNode.classList.contains('displayed-event')
	) {
		if (event.target.parentNode.classList.contains('displayed-event')) {
			parent = event.target.parentNode;
		} else {
			parent = event.target;
		}
		const getElemProps = parent.getBoundingClientRect();
		if (getElemProps.x > (window.screen.width * 2) / 3) {
			openPopup(getElemProps.left - getElemProps.width, getElemProps.top);
		} else {
			openPopup(getElemProps.left + getElemProps.width, getElemProps.top);
		}
		const popupContent = document.querySelector('.popup__content');
		popupContent.setAttribute('data-popup-id', parent.dataset.eventId);
		setItem('eventIdToDelete', parent.dataset.eventId);

		// and reveal the popup with the given event information through the renderEventBoard function
		renderEventBoard(event);
	}
};

const onTimeInputChange = () => {
	const [title, date, startTime, endTime, description] = getInputValues;
	const start = getDateTime(date.value, startTime.value);
	const end = getDateTime(date.value, endTime.value);
	if (new Date(end).getTime() < new Date(start).getTime()) {
		return (errorBoard.textContent =
			'The EndTime should not prеcedе to the StartTime of your event');
	}
	if (
		new Date(end).getTime() > new Date(start).getTime() &&
		new Date(new Date(end).getTime() - new Date(start).getTime()) / 60000 < 15
	) {
		return (errorBoard.textContent =
			'Your event duration should exceed 15 minutes');
	} else {
		return (errorBoard.textContent = '');
	}
};

// this function provides event-listeners for the Event Form submit
export function initEventForm() {
	// let's check the accuracy of the entered values for Input
	document
		.querySelector('#endTime')
		.addEventListener('change', onTimeInputChange);
	document
		.querySelector('#startTime')
		.addEventListener('change', onTimeInputChange);

	eventFormElem.addEventListener('submit', function (e) {
		e.preventDefault();
		if (document.querySelector('.error-board').textContent.length >= 1) {
			return;
		} else {
			onCreateEvent();
			clearEventForm();
			closeModal();
			if (getItem('eventIdToDelete') != null) {
				document.querySelector('.event-form__submit-btn').textContent =
					'Create';
				onDeleteEvent();
				setItem('eventIdToDelete', null);
			} else {
				renderEvents(getItem('events'));
			}
		}
	});

	closeEventFormBtn.addEventListener('click', onCloseEventForm);

	document
		.querySelector('.calendar__week-container')
		.addEventListener('click', onTimeSlotClick);

	document.querySelector('.svg-logo-plus').addEventListener('click', openModal);
}
