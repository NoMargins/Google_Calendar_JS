const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана

export const openModal = () => {
	modalElem.classList.remove('hidden');
	document.querySelector('input[type="text"]').focus();
};

export const closeModal = () => {
	modalElem.classList.add('hidden');
};

const createEventBtnEl = document.querySelector('.create-event-btn');
createEventBtnEl.addEventListener('click', openModal);
