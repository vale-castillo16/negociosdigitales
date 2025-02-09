const calendar = document.querySelector('.calendar');
const currentMonth = document.getElementById('current-month');
const eventDetails = document.getElementById('event-details');
const eventImage = document.getElementById('event-image');
const eventDescription = document.getElementById('event-description');

let currentDate = new Date();

const events = {
  '2024-10-07': { image: 'imagenes/eventos/evento1.jpeg' },
  '2024-10-21': { image: 'imagenes/eventos/evento2.jpeg' },
  '2025-01-27': { image: 'imagenes/eventos/evento3.jpeg' },
};

function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  let date = 1;
  let html = '';

  for (let i = 0; i < 6; i++) {
    html += '<tr>';
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        html += '<td></td>';
      } else if (date > daysInMonth) {
        html += '<td></td>';
      } else {
        const currentDateFormatted = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}-${date < 10 ? '0' + date : date}`;
        const event = events[currentDateFormatted];
        if (event) {
          html += `<td class="event" data-image="${event.image}"> ${date} </td>`;
        } else {
          html += `<td>${date}</td>`;
        }
        date++;
      }
    }
    html += '</tr>';
  }

  calendar.querySelector('tbody').innerHTML = html;
  currentMonth.textContent = getMonthName(month) + ' ' + year;

  // Añadir eventos a las celdas con eventos
  const eventCells = document.querySelectorAll('.event');
  eventCells.forEach(cell => {
    cell.addEventListener('click', showEventDetails);
  });
}

function showEventDetails(event) {
  const image = event.target.dataset.image;
  const description = event.target.dataset.description;

  eventImage.src = image;
  eventDescription.textContent = description;
  eventDetails.style.display = 'block';
}

function closeEventDetails() {
  eventDetails.style.display = 'none';
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function getMonthName(month) {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return monthNames[month];
}

generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
