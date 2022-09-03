const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана

const openModal = () => {
	modalElem.classList.remove('.hiden');
	return modalElem;
};

const closeModal = () => {
	modalElem.classList.add('.hiden');
	return modalElem;
};

const createEventBtnEl = document.querySelector('.create-event-btn');
createEventBtnEl.addEventListener('onclick', openModal);
