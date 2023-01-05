import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { highlightDate } from './calendar/currenttime.js';
import { initEventForm } from './events/createEvent.js';
import { setNewDate } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';

import '../styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
	setNewDate(new Date(getStartOfWeek(new Date())));
	renderTimescale();
	renderWeek();
	renderHeader();
	initNavigation();
	initEventForm();
	highlightDate();
});
