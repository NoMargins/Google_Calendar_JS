let storage = {
	// используется для удаления события
	eventIdToDelete: null,
	// хранит дату понедельника той отображаемой недели
	displayedWeekStart: new Date(),
	// хранит массив всех событий
	events: [
		{
			id: 0.7520027086457333, // id понадобится для работы с событиями
			title: 'Title 1',
			description: 'Some description',
			startTime: new Date(2022, 8, 15, 14, 30),
			endTime: new Date(2022, 8, 15, 15, 10),
		},
		{
			id: 0.452002708676633, // id понадобится для работы с событиями
			title: 'Title 2',
			description: 'Some description',
			startTime: new Date(2022, 8, 13, 8, 45),
			endTime: new Date(2022, 8, 13, 14, 10),
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
