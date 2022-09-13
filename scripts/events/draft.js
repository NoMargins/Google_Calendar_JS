const createEventElement = (event) => {
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
	newEventElement.append(newParagrNameEl, newParagrTimeEl, newParagrDescEl);

	//let's optimize our divs sizes
	// const allElProps = window.getComputedStyle(newEventElement);
	// if (parseInt(`${allElProps.height}`) <= 80) {
	// 	newParagrNameEl.style.flexDirection = 'row';
	// 	newParagrNameEl.style.fontSize = '8px';
	// 	newParagrNameEl.style.lineHeight = newParagrNameEl.style.height;
	// 	newParagrNameEl.style.background = 'red';
	// 	newParagrNameEl.style.textAlign = 'start';
	// }
	newEventElement.append(newParagrNameEl, newParagrTimeEl, newParagrDescEl);

	newEventElement.innerHTML = `<div class="displayed-event" data-event-id="${
		event.id
	}" data-event-date="${new Date(event.startTime).getFullYear()}${new Date(
		event.startTime
	).getMonth()}${new Date(
		event.startTime
	).getDate()}" data-event-hour="${new Date(
		event.startTime
	).getHours()}" data-event-duration="${calcTimeDiffInMinutes(
		event.startTime,
		event.endTime
	)}">
	<p class = "displayed-event__name">${event.title}
	</p>
	<p class="displayed-event__time">${new Date(
		event.startTime
	).getHours()}:${new Date(event.startTime).getMinutes()} - ${new Date(
		event.endTime
	).getHours()}:${new Date(event.endTime).getMinutes()}
	</p>
	<p class="displayed-event__description">${event.description}
	</p>
	</div>`;

	if (parseInt(`${newEventElement.style.height}`) <= 10) {
		newEventElement.classList.add('displayed-event__small-text');
	}
};
