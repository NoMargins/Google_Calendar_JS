import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';
import { getStartOfWeek } from '../common/time.utils.js';

const getTimeScaleElem = document.querySelector('.calendar__time-scale');
const getWeekElem = document.querySelector('.calendar__week');

export const generateDay = () =>
	// функция должна сгенерировать и вернуть разметку дня в виде строки
	// разметка состоит из 24 часовых временных слотов (.calendar__time-slot)

	createNumbersArray(0, 24).map((timeNumber) => () => {
		if (timeNumber <= 12) {
			`
			<div
				class="calendar__time-slot"
				data-time-slot="${timeNumber}"
			>${timeNumber} AM<</div>
	`.join('');
		}
		if (timeNumber >= 13) {
			pmTimeSlot = timeNumber - 12;
			`
			<div
				class="calendar__time-slot"
				data-time-slot="${timeNumber}"
			>${pmTimeSlot} PM<</div>
	`.join('');
		}
	});

export const renderWeek = () => {
	// функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
	// разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
	// массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
	// каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
	// после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
	const startFromThisMonday = getStartOfWeek(date);
	const getDatesRange = generateWeekRange(new Date(newstartFromThisMonday));

	const result = createNumbersArray(1, 7)
		.map((dayNumb) => () => {
			for (elem of getDatesRange) {
				`
  <div
				class="calendar__day"
				data-day="${dayNumb}"
			>
      <p> ${new Date(elem).getMonth()}
      </p>
      <p>${new Date(elem).getDate()}</p>
      </div>`;
			}
		})
		.join('');

	getWeekElem.innerHTML = result;
};

renderWeek();
