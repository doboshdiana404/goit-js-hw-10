import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDaley = document.querySelector('.input-delay');
const form = document.querySelector(".form");

const makePromise = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (shouldResolve === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
  const selectedOption = document.querySelector('input[name="state"]:checked');

  const delayInput = inputDaley.value;
const shouldResolve = selectedOption.value;
  // Перевірка, чи вибрана радіокнопка
  if (selectedOption && delayInput) {
    const delay = parseInt(delayInput, 10);
    
    // Виконуємо проміс з затримкою
    makePromise(delay, shouldResolve)
      .then(successMessage => {
        iziToast.success({
          title: 'OK',
          message: successMessage,
          position: 'topRight',
          timeout: 5000
        });
      })
      .catch(failureMessage => {
        iziToast.error({
          title: 'Error',
          message: failureMessage,
          position: 'topRight',
          timeout: 5000
        });
      });
  }
  form.reset();
});
