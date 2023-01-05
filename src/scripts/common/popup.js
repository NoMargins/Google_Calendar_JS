const popupElem = document.querySelector('.popup');
const popupContentElem = document.querySelector('.popup__content');

// в попап нужно передавать координаты, в которых показать попап
export function openPopup(x, y) {
	popupElem.classList.remove('hidden');
	popupContentElem.style.top = `${y}px`;
	popupContentElem.style.left = `${x}px`;
}

const cleanPopupInfo = () => {
	document.querySelector('.popup__event-title').textContent = '';
	document.querySelector('.popup__event-date').textContent = '';
	document.querySelector('.popup__event-description').textContent = '';
};

export function closePopup() {
	popupElem.classList.add('hidden');
	cleanPopupInfo();
}

function onClickInsidePopup(event) {
	event.stopPropagation();
}

popupContentElem.addEventListener('click', onClickInsidePopup);
popupElem.addEventListener('click', closePopup);
