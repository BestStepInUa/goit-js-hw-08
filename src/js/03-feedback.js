// throttle lib
import throttle from 'lodash.throttle';
// DOM El refs
const refs = {
    form: document.querySelector('form'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea')
}

// init obj for storing inputs data
let formData = {};

populateForm();

// form input func
refs.form.addEventListener('input', throttle(onFormInput, 500));
// form submit func
refs.form.addEventListener('submit', onFormSubmit);

// form input handler
function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}
// form submit handler
function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
    formData = {};
}
// func of reading data from Local Storege and their writing into forms fields
function populateForm() {
    const savedData = JSON.parse(localStorage.getItem("feedback-form-state"));
    if (savedData) {
        const { email, message } = savedData;
        if (email) {            
            refs.input.value = email;
            formData.email = email;     
        
        }
        if (message) {
            refs.textarea.value = message;
            formData.message = message;  
        }
    }    
}