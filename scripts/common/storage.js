export const setItem = (key, value) => {
	if (key === 'events') {
		let arr = JSON.parse(localStorage.getItem('events')) || [];
		arr.push(value);
		localStorage.setItem('events', JSON.stringify(arr));
	} else {
		localStorage.setItem(`${key}`, JSON.stringify(value));
	}
};

export const getItem = (key) => {
	if (key === 'events') {
		return JSON.parse(localStorage.getItem('events'));
	} else {
		return JSON.parse(localStorage.getItem(`${key}`));
	}
};

export const onStorageChange = (e) => console.log(e);
