const calendarURL = 'https://63b4368c9f50390584aa3bd2.mockapi.io/calendar_data';

export const setNewDate = (date) => {
	localStorage.setItem('displayedWeekStart', JSON.stringify(date));
};

export const getStoredDate = () => {
	return new Date(JSON.parse(localStorage.getItem('displayedWeekStart')));
};

export const setEventIdToDelete = (eventId) => {
	return localStorage.setItem('eventIdToDelete', JSON.stringify(eventId));
};

export const getEventIdToDelete = () => {
	return Number(JSON.parse(localStorage.getItem('eventIdToDelete')));
};

export const setEvent = (eventData) => {
	return fetch(calendarURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(eventData),
	}).then((resp) => {
		if (resp.ok) {
			return resp.json();
		} else {
			throw new Error('Failed to save your data');
		}
	});
};

export const updateEvent = (eventId, updatedEvent) => {
	return fetch(`${calendarURL}/${eventId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify(updatedEvent),
	});
};

export const deleteEvent = (eventId) => {
	return fetch(`${calendarURL}/${eventId}`, {
		method: 'DELETE',
	});
};

export const getEvent = (eventId) => {
	return fetch(`${calendarURL}/${eventId}`).then((resp) => {
		if (resp.ok) {
			return resp.json();
		} else {
			throw new Error('Failed to load this event from storage');
		}
	});
};

export function getAllStoredEvents() {
	return fetch(calendarURL).then((resp) => {
		if (resp.ok) {
			return resp.json();
		} else {
			throw new Error('Failed to load all events from storage');
		}
	});
}
