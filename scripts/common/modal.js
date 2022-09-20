const modalElem = document.querySelector('.modal');
// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана

export const openModal = () => {
	modalElem.classList.remove('hidden');
};

export const closeModal = () => {
	modalElem.classList.add('hidden');
};

document
	.querySelector('.create-event-btn')
	.addEventListener('click', openModal);
document
	.querySelector('.create-event__close-btn')
	.addEventListener('click', closeModal);
