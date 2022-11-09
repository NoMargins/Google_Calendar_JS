import { getItem, setItem } from '../common/storage.js';
import { closePopup } from '../common/popup.js';
import { checkForDigits, calcTimeDiffInMinutes } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

export const removeEventsFromCalendar = () => {
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
};

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

export const renderEvents = (eventsArr) => {
	removeEventsFromCalendar();
	const getAllTimeSlotsArr = [
		...document.querySelectorAll('.calendar__day_time-slot'),
	];
	const thisWeekEventsHTML = eventsArr
		.sort((a, b) => (b.startTime > a.startTime ? 1 : -1))
		.map((obj) => createEventElement(obj));
	getAllTimeSlotsArr.map((slot) => {
		thisWeekEventsHTML.map((dispEvent) => {
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

export const renderEventBoard = (event) => {
	const daysOfWeek = [
		`Sunday`,
		`Monday`,
		`Tuesday`,
		`Wednesday`,
		`Thursday`,
		`Friday`,
		`Saturday`,
	];

	const monthsNames = [
		'December',
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
	];

	getItem('events')
		.filter(
			(el) =>
				Number(el.id) === Number(event.target.dataset.eventId) ||
				Number(el.id) === Number(event.target.parentNode.dataset.eventId)
		)
		.map(({ title, description, startTime, endTime }) => {
			const getInfoBlock = document.querySelector('.popup__info');
			const createInfoBlock = document.createElement('div');
			createInfoBlock.innerHTML = `<p class="event-info_name">${title}
	</p><p class="event-info_time">${daysOfWeek[new Date(startTime).getDay()]}, ${
				monthsNames[new Date(startTime).getMonth()]
			} ${new Date(startTime).getDate()} ${checkForDigits(
				new Date(startTime).getHours()
			)}:${checkForDigits(new Date(startTime).getMinutes())} - ${checkForDigits(
				new Date(endTime).getHours()
			)}:${checkForDigits(new Date(endTime).getMinutes())}
	</p><p class="event-info_description">${description}
	</p>`;
			return (getInfoBlock.innerHTML = createInfoBlock.innerHTML);
		});
};

export const onDeleteEvent = () => {
	const delEventId = getItem('eventIdToDelete');
	const result = getItem('events').filter((el) => el.id != delEventId);
	localStorage.setItem('events', JSON.stringify(result));
	setItem('eventIdToDelete', null);
};

function editEventData(event) {
	const getTheParent = event.target.parentNode.parentNode.parentNode;
	if (getTheParent.classList.contains('popup__content')) {
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
		const getAllEventsInStorage = getItem('events');
		getAllEventsInStorage
			.filter((obj) => obj.id === Number(getTheParent.dataset.popupId))
			.map(({ id, date, title, description, startTime, endTime }) => {
				const getEventForm = document.querySelector('.event-form');
				getEventForm.setAttribute('id', id);
				const startTimeNeeded = `${checkForDigits(
					new Date(startTime).getHours()
				)}:${checkForDigits(new Date(startTime).getMinutes())}`;
				const endTimeNeeded = `${checkForDigits(
					new Date(endTime).getHours()
				)}:${checkForDigits(new Date(endTime).getMinutes())}`;
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
}

export const clearEventIdToDelete = () => {
	if (document.querySelectorAll('.hidden').length >= 1) {
		return setItem('eventIdToDelete', null);
	}
};

// let's add the event listeners to Edit, Delete, and Close buttons of the modal window
document
	.querySelector('.edit-event-btn')
	.addEventListener('click', function (event) {
		editEventData(event);
	});
document
	.querySelector('.delete-event-btn')
	.addEventListener('click', function () {
		onDeleteEvent();
		removeEventsFromCalendar();
		renderEvents(getItem('events'));
		closePopup();
	});
document
	.querySelector('.close-event-btn')
	.addEventListener('click', function () {
		document.querySelector('.popup__content').removeAttribute('data-popup-id');
		setItem('eventIdToDelete', null);
		closePopup();
	});
