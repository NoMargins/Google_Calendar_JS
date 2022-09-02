export const createNumbersArray = (from, to) => {
	// ф-ция должна генерировать массив чисел от from до to
	let numbArray = [];
	if (from < to && Number.isInteger(from) && Number.isInteger(to)) {
		for (let i = from; i <= to; i++) {
			numbArray.push(i);
		}
		return numbArray;
	}
};
