const Events = [
    {
        day: 8,
        month: 3,
        year: 2018,
        text: 'событие'
    }
];

const constCal =  {
        week: [
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
            'Воскресенье'],

        month: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'],

        day_ms: 86400000
};


function getCurrentDate() {
    return {
        week: (new Date().getDay()),
        month: (new Date()).getMonth(),
        year: (new Date()).getFullYear()
    }
}

// день недели первого дня месяца
function getStartMonth(year, month) {
    let firstDay = new Date(year, month, 1,0,0,0,0);
    return firstDay.getDay();
}

// добавление ячейки с текстом
function addTD(text) {
    let td = document.createElement('td');
    td.innerHTML = text;
    return td;
}

function getTable(currentMouth, currentYear) {
    let calTable, table, tbody, tr, td, day, date;

    calTable = document.getElementById("cal-table");
    table = document.createElement('table');
    calTable.appendChild(table);
    tbody = document.createElement('tbody');
    table.appendChild(tbody);


    let firstDayMouth = getStartMonth(currentYear, currentMouth);
    let firstDayMs = new Date(currentYear, currentMouth,1,0,0,0,0).getTime();

    // первый день в таблице
    day = firstDayMs - (constCal.day_ms*(firstDayMouth-1));
    date = new Date(day);

    // генерация таблицы
    for (let row = 0; row < 5; row++) {

        // добаляем строку
        tr = document.createElement('tr');
        tbody.appendChild(tr);


        for (let col = 0; col < 7; col++) {
            // если это первая строка, помимо даты добавляем название недели
            if (row == 0) {
                td = addTD(constCal.week[col] + ", " + date.getDate());
            } else {
                // иначе просто дату
                td = addTD(date.getDate());
            }

            // если текущий денб, добавляем соответствующий класс
            if(date.getDate() == (new Date()).getDate() &&
                date.getMonth() == (new Date()).getMonth() &&
                date.getFullYear() == (new Date()).getFullYear()) {

                td.classList.add("current-day");
            }

            // если в этот день есть событие, добавлем текст
            Events.forEach(el => {
                if(el.day == date.getDate() &&
                    el.month == date.getMonth() &&
                    el.year == date.getFullYear()) {

                    let event = document.createElement('span');
                    event.innerText = el.text;
                    td.appendChild(event);
                    td.classList.add("event");
                }
            });

            tr.appendChild(td);
            day += constCal.day_ms; // получаем след день
            date = new Date(day);
        }
    }
}

let month = getCurrentDate().month,
    year = getCurrentDate().year,
    spanMonth = document.getElementById("month"),
    spanYear = document.getElementById("year");

spanMonth.innerHTML = constCal.month[month] + ' ';
spanYear.innerHTML = year;
getTable(month, year);

document.getElementById('prev').onclick = function() {
    calTable = document.getElementById("cal-table");
    calTable.innerHTML = '';

    if(month == 0) {
        month = 11;
        year--;
    }else{
        month--;
    }

    spanMonth.innerHTML = constCal.month[month] + ' ';
    spanYear.innerHTML = year;
    getTable(month, year);
};

document.getElementById('next').onclick = function() {
    calTable = document.getElementById("cal-table");
    calTable.innerHTML = '';

    if(month == 11) {
        month = 0;
        year++;
    }else{
        month++;
    }


    spanMonth.innerHTML = constCal.month[month] + ' ';
    spanYear.innerHTML = year;
    getTable(month, year);
};


