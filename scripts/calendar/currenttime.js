export const highlightDate = () => {
	const getCurTimeEl = document.querySelector('.current-time');
	const getTimeSlotsArr = [
		...document.querySelectorAll('.calendar__day_time-slot'),
	];
	return getTimeSlotsArr.map((slot) => {
		if (
			slot.dataset.slotDate ===
				`${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}` &&
			slot.dataset.timeSlot === `${new Date().getHours() + 1}`
		) {
			getCurTimeEl.classList.remove('hidden');
			getCurTimeEl.style.position = 'absolute';
			getCurTimeEl.style.left = '-5px';
			getCurTimeEl.style.top = `${new Date().getMinutes()}px`;
			slot.style.position = 'relative';
			slot.append(getCurTimeEl);
		}
	});
};
