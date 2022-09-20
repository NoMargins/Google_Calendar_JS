let storage = {
	// используется для удаления события
	eventIdToDelete: null,
	// хранит дату понедельника той отображаемой недели
	displayedWeekStart: new Date(),
	// хранит массив всех событий
	events: [
		{
			id: 0.7520027086457333, // id понадобится для работы с событиями
			title: "Dad's b-day",
			description: 'Congratulate dad by phone',
			startTime: new Date(2022, 8, 21, 0),
			endTime: new Date(2022, 8, 21, 23, 59),
		},
		{
			id: 0.652076457333, // id понадобится для работы с событиями
			title: 'Gromcode studying',
			description: 'Learn about the browser local storage',
			startTime: new Date(2022, 8, 23, 10, 30),
			endTime: new Date(2022, 8, 23, 17),
		},
		{
			id: 0.452002708676633, // id понадобится для работы с событиями
			title: 'English lesson',
			description: 'learn Past Perfect',
			startTime: new Date(2022, 8, 23, 11, 30),
			endTime: new Date(2022, 8, 23, 13),
		},
		{
			id: 0.23476457333, // id понадобится для работы с событиями
			title: 'Gromcode studying',
			description: 'Learn about the browser local storage',
			startTime: new Date(2022, 8, 25, 10, 30),
			endTime: new Date(2022, 8, 25, 17),
		},
		{
			id: 0.123408676633, // id понадобится для работы с событиями
			title: 'English lesson',
			description: 'learn Past Perfect continuous',
			startTime: new Date(2022, 8, 25, 10, 45),
			endTime: new Date(2022, 8, 25, 13),
		},
		{
			id: 0.15434308676633, // id понадобится для работы с событиями
			title: 'Very Long title in a small window',
			description: "let's try how it will be shown",
			startTime: new Date(2022, 8, 24, 8, 45),
			endTime: new Date(2022, 8, 24, 9),
		},
	],
	// это все данные, которые вам нужно хранить для работы приложения
};

export const setItem = (key, value) => {
	// ф-ция должна устанавливать значения в объект storage

	storage[key] = value;
};

export const getItem = (key) => {
	// ф-ция должна возвращать по ключу значения из объекта storage
	return storage[key];
};

// пример объекта события
const eventExample = {
	id: 0.7520027086457333, // id понадобится для работы с событиями
	title: 'Title',
	description: 'Some description',
	start: new Date('2020-03-17T01:10:00.000Z'),
	end: new Date('2020-03-17T04:30:00.000Z'),
};
