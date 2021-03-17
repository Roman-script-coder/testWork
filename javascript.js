"use strict";
const objectAllForm = [];
let objectForm;
let nameForm = document.querySelector('.nameForm');
let birthDateForm = document.querySelector('.birthDateForm');
let descriptionForm = document.querySelector('.descriptionForm');
/* Заполняет главную страницу данными */
function fillForm() {
	let formLocalStorage = localStorage.getItem('form');
	let value = JSON.parse(formLocalStorage);
    if(value != null) {
    	const wrapper = document.querySelector('.wrapper');
    	for (let key in value) {
    		const wrapperDiv = document.createElement('div');
    		wrapperDiv.setAttribute('id', key);
    		let subValue = value[key];
		    for (let subKey in subValue) {
		    	const div = document.createElement('div');
			    div.classList.add('divConteiner');
			   	div.setAttribute('title', subValue[subKey]);
			    div.innerText = subValue[subKey];
			    wrapperDiv.append(div);
		    }
			const pre = document.createElement('pre');
			const buttonEdit = document.createElement('button');
			const buttonRemove = document.createElement('button');
			buttonEdit.classList.add('edit');
			buttonEdit.addEventListener('click', editForm);
			buttonRemove.classList.add('remove');
			buttonRemove.addEventListener('click', removeForm);
			pre.append(buttonEdit);
			pre.append(buttonRemove);
			wrapperDiv.append(pre);
			wrapperDiv.classList.add('row');
			wrapper.append(wrapperDiv);
		}
    }
}
/* Переход на страницу формы 1 */
function jumpToNewForm() {
	document.location.href = 'formOne.html';
}
/* Выполняет заполнение полей формы 1 в объект */
function introductionForm() {
	objectForm = {};
	fullNameForm();
	fullDateForm();
	fullDescriptionForm();
}
/* Выполняет проверку на заполенение полей формы 1 и 
сохраняет правильно заполненую форму 1 в LocalStorage */
function saveForm() {
	introductionForm();
	const wrongFirstNameForm = objectForm.firstName == '';
	const wrongLastNameForm = objectForm.lastName == '';
	const wrongBirthDateForm = objectForm.birthDate == '';
	if(wrongFirstNameForm || wrongLastNameForm || wrongBirthDateForm) {
		introductionForm();
	} else {
		if (localStorage.getItem('form') !== null) {
			let newFormLocalStorage = localStorage.getItem('form');
			let newValue = JSON.parse(newFormLocalStorage);
			newValue.push(objectForm);
			let newLabel = JSON.stringify(newValue); 
			localStorage.setItem('form', newLabel);
		} else {
			objectAllForm[0] = objectForm;
			let label = JSON.stringify(objectAllForm); 
			localStorage.setItem('form', label);
		}
		document.location.href = 'index.html';
	}
}
const modal = document.querySelector('.modal');
const editNameForm = document.querySelector('.editNameForm');
const editBirthDateForm = document.querySelector('.editBirthDateForm');
const editDescriptionForm = document.querySelector('.editDescriptionForm');
let subValue;
let editId;
let editValue;
/* Вызывает блок по форме 1 и заполнет его данными */
const editForm = (e) => {
    modal.style.display = "block";
    const currentTarget = e.currentTarget;
	const parent = currentTarget.parentElement.parentElement;
	editId = parent.getAttribute('id');
	const editFormLocalStorage = localStorage.getItem('form');
	editValue = JSON.parse(editFormLocalStorage);
	for (let editKey in editValue) {
		if(editKey ==  editId) {
			subValue = editValue[editKey];
		   	for (let subKey in subValue) {
				editNameForm.value = subValue.lastName + ' ' + subValue.firstName + ' ' + subValue.middleName;
				editBirthDateForm.value = subValue.birthDate;
				editDescriptionForm.value = subValue.description;
			}
		}
	}
}
/* Сохраняет изменения в блоке по форме 1 и сохраняет изменения в localStorage */
const saveEditForm = () => {
	const arrEditName = editNameForm.value.split(' ');
	subValue.firstName = arrEditName[1];
	subValue.lastName = arrEditName[0];
	if(arrEditName[2] == undefined) {
		subValue.middleName = '';
	} else {
		subValue.middleName = arrEditName[2];
	}
 	subValue.birthDate = editBirthDateForm.value;
	subValue.description = editDescriptionForm.value;
	for (let saveEditKey in editValue) {
		if(saveEditKey ==  editId) {
			subValue = editValue[saveEditKey];
		}
	}
	let editLabel = JSON.stringify(editValue); 
	localStorage.setItem('form', editLabel);
	window.location.reload();
}
/* Закрывает блок по форме 1 */
const closeEditForm = () => {
    modal.style.display = "none";
}
/* Удаляет запись и сохраняет изменения в localStorage */
const removeForm = (e) => {
	const currentTarget = e.currentTarget;
	const parent = currentTarget.parentElement.parentElement;
	const answerModal = confirm('Запись будет удалена. Уверены?');
	if(answerModal) {
		let removeFormLocalStorage = localStorage.getItem('form');
		let removeValue = JSON.parse(removeFormLocalStorage);
		const removeId = parent.getAttribute('id');
		for (let removeKey in removeValue) {
			if(removeKey ==  removeId) {
				removeValue.splice(removeKey, 1);
				let removeLabel = JSON.stringify(removeValue); 
				localStorage.setItem('form', removeLabel);
			}
		}
		window.location.reload();
	}
}
/* Выполняет проверку данных в заполененом поле "ФИО" формы 1 и записывает в objectForm */
function fullNameForm() {
	const arrName = nameForm.value.split(' ');
	if(arrName.length-1 == 0) {
		objectForm.firstName = '';
		objectForm.lastName = '';
		objectForm.middleName = '';
		nameForm.setAttribute('placeholder', 'Введите фамилию и имя');
		nameForm.value= '';
	} else if(arrName.length-1 == 1) {
		objectForm.firstName = arrName[1];
		objectForm.lastName = arrName[0];
		objectForm.middleName = '';	
	} else {
		objectForm.firstName = arrName[1];
		objectForm.lastName = arrName[0];
		objectForm.middleName = arrName[2];
	}
}
/* Выполняет проверку данных в заполененом поле "даты рождения" формы 1 и записывает в objectForm */
function fullDateForm() {
   	const arrBirthDate = birthDateForm.value.split('-');
	arrBirthDate[1] -= 1;
   	const hyphenCheck = birthDateForm.value.includes('-');
  	const dateCorrectly  = new Date(arrBirthDate[0], arrBirthDate[1], arrBirthDate[2]);
   	const dateFormCorrectly = (dateCorrectly.getFullYear() == arrBirthDate[0]) && (dateCorrectly.getMonth() == arrBirthDate[1]) && (dateCorrectly.getDate() == arrBirthDate[2])
	if(hyphenCheck && dateFormCorrectly) {
		objectForm.birthDate = birthDateForm.value;
	} else {
		objectForm.birthDate = '';
		birthDateForm.value= '';
		birthDateForm.setAttribute('placeholder', 'Введена неверная дата');
	}
}
/* Записывает данные поля "описание" формы 1 в objectForm */
function fullDescriptionForm() {
   	objectForm.description = descriptionForm.value;
}
