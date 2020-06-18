

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const succPara = document.querySelector('#succ-msg');
const errorPara = document.querySelector('#error-msg');

weatherForm.addEventListener('submit', (e) => {
    succPara.textContent = 'Loading...';
    errorPara.textContent = '';

    e.preventDefault();
    const location = search.value;

    fetch('/weather?address=' + location)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                succPara.textContent = '';
                errorPara.textContent = data.error;
            } else {
                succPara.textContent = data.forecast;
            }
        });
});