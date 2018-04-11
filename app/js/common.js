class constCal {
    constructor(week, mouth, day_ms) {
        this.week =  [
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
            'Воскресенье'];

        this.month = [
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
            'Декабрь'];

        this.day_ms =  86400000;
    }
}


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
    let cal = new constCal;
    let calTable, table, tbody, tr, td, day, date;

    calTable = document.getElementById("cal-table");
    table = document.createElement('table');
    calTable.appendChild(table);
    tbody = document.createElement('tbody');
    table.appendChild(tbody);


    let firstDayMouth = getStartMonth(currentYear, currentMouth);
    let firstDayMs = new Date(currentYear, currentMouth,1,0,0,0,0).getTime();

    // первый день в таблице
    day = firstDayMs - (cal.day_ms*(firstDayMouth-1));
    date = new Date(day);

    console.log(firstDayMouth);
    console.log(firstDayMs);
    console.log(day);
    console.log(date);

    // генерация таблицы
    for (let row = 0; row < 5; row++) {

        // добаляем строку
        tr = document.createElement('tr');
        tbody.appendChild(tr);


        for (let col = 0; col < 7; col++) {
            // если это первая строка, помимо даты добавляем название недели
            if (row == 0) {
                td = addTD(cal.week[col] + ", " + date.getDate());
            } else {
                // иначе просто дату
                td = addTD(date.getDate());
            }

            tr.appendChild(td);
            day += cal.day_ms; // получаем след день
            date = new Date(day);
        }
    }
}

getTable(getCurrentDate().month + 1, getCurrentDate().year);