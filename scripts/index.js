import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { highlightDate } from './calendar/currenttime.js';
import { initEventForm } from './events/createEvent.js';
import { getItem, setItem, onStorageChange } from './common/storage.js';
import {
	renderEvents,
	renderEventBoard,
	clearEventIdToDelete,
} from './events/events.js';

document.addEventListener('DOMContentLoaded', () => {
	// инициализация всех элементов
	renderTimescale();
	setItem('displayedWeekStart', new Date());
	renderWeek();
	renderHeader();
	initNavigation();
	initEventForm();
	highlightDate();
	clearEventIdToDelete();
	onEventsPresence();
});

window.addEventListener('storage', onStorageChange);

const onEventsPresence = () => {
	if (localStorage.events != undefined) {
		renderEvents(getItem('events'));
		renderEventBoard();
	}
};
