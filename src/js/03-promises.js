import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

let formData = {};

formEl.addEventListener('input', throttle(onInput, 1000));
formEl.addEventListener('submit', onFormSubmit);

function onInput(evt) {
  formData[evt.target.name] = evt.target.value;
};

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(formData);
  let {delay, step, amount} = formData;
  delay = parseInt(delay);
  step = parseInt(step);
  
  for (let i = 0; i < amount; i += 1 ) {
    createPromise( i, delay )
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
  };
};

function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({position, delay});
      } else {
        // Reject
        rej({position, delay});
      }
    }, delay)
    
  })
  return promise;
}


