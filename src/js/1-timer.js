import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const resultDays = document.querySelector('#label-days');
const resultHours = document.querySelector('#label-hours');
const resultMinutes = document.querySelector('#label-minutes');
const resultSeconds = document.querySelector('#label-second');
const datePicker = document.querySelector('#datetime-picker');
const mainBtn = document.querySelector('.btn');
let targetDate = null;
function showNotification() {
  iziToast.show({
    message: 'Please choose a date in the future',
    position: 'topRight',
    color: 'green',
    timeout: 3000,
    icon: 'fa fa-check',
  });
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const options = {
  enableTime: true, // Дозволяє вибір часу
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i', // Формат дати
  onOpen: function () {
    datePicker.classList.remove('input-off');
    datePicker.classList.add('input-on'); // Додаємо стиль при відкритті календаря
  },
  onClose(selectedDates) {
    datePicker.classList.remove('input-on'); // Видаляємо стиль при закритті календаря
    datePicker.classList.add('input-off');
    targetDate = selectedDates[0]; // Зберігає обрану дату
    checkDate(); // Перевірка дати при закритті календаря
  },
};
flatpickr('#datetime-picker', options);

// Функція перевірки дати
function checkDate() {
  const now = new Date();

  if (targetDate && targetDate > now) {
    mainBtn.classList.remove('future-date-btn');
    mainBtn.classList.add('active-btn');
  } else {
    mainBtn.classList.remove('active-btn');
    mainBtn.classList.add('future-date-btn');
    showNotification();
  }
}

// Функція зворотного відліку таймера
function startTimer() {
  const timerElement = document.querySelector('.timer');

  if (!targetDate) {
    timerElement.innerHTML = 'Будь ласка, оберіть дату!';
    return;
  }
  datePicker.disabled = true;

  clearInterval(timerElement._interval); // Зупиняє попередній інтервал, якщо існує

  timerElement._interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    mainBtn.classList.remove('active-btn');
    mainBtn.classList.add('future-date-btn');
    datePicker.classList.remove('input-on'); // Видаляємо стиль при закритті календаря
    datePicker.classList.add('input-off');
    if (distance <= 0) {
      clearInterval(timerElement._interval);
      datePicker.disabled = false;
      showNotification();
      return;
    }

    resultDays.innerHTML = `${convertMs(distance)
      .days.toString()
      .padStart(2, '0')}`;
    resultHours.innerHTML = `${convertMs(distance)
      .hours.toString()
      .padStart(2, '0')}`;
    resultMinutes.innerHTML = `${convertMs(distance)
      .minutes.toString()
      .padStart(2, '0')}`;
    resultSeconds.innerHTML = `${convertMs(distance)
      .seconds.toString()
      .padStart(2, '0')}`;
  }, 1000);
}

mainBtn.addEventListener('click', startTimer);
