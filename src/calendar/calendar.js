let selectedDate = {day: null, month: null, year: null};

// CHECK LEAP YEAR
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

// GENERATE CALENDAR

generateCalendar = (month, year) => {
    let calendar_days = calendar.querySelector('.calendar-days')
    calendar_days.innerHTML = ''

    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let curr_date = new Date()

    month_picker.innerHTML = month_names[month]
    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
            <span></span>
            <span></span>
            <span></span>`
            if (i - first_day.getDay() + 1 === curr_date.getDate() && year === curr_date.getFullYear() && month === curr_date.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        if (selectedDate.day === (i - first_day.getDay() + 1) && selectedDate.month === month && selectedDate.year === year) {
            day.classList.add('selected-date')
        }
        day.addEventListener('click', () => {
            const prevSelected = document.querySelector('.calendar-days div.selected-date');
            if (prevSelected) {
                prevSelected.classList.remove('selected-date');
            }
            if (!day.classList.contains('curr-date')) {
                day.classList.add('selected-date');
                selectedDate = {
                    day: i - first_day.getDay() + 1,
                    month: month,
                    year: year
                }
            }
        })
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div>${e}</div>`
    month.onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(curr_month.value, curr_year.value)
    }
    month_list.appendChild(month)
})

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

let curr_date = new Date()

let curr_month = {value: curr_date.getMonth()}
let curr_year = {value: curr_date.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

const calendarContainer = document.querySelector('.calendar-container');
const calendarPanel = document.querySelector('.calendar'); // 이름 변경
const toggleBtn = document.querySelector('#calendar-toggle');
const toggleIcon = document.querySelector('#toggle-icon');

toggleBtn.addEventListener('click', () => {
    const isShown = calendarContainer.classList.contains('show');
    const newIcon = isShown ? '<' : '>';  // 바뀔 텍스트 계산

    toggleIcon.style.opacity = '0';
    toggleIcon.style.transform = 'translateX(10px)';

    setTimeout(() => {
        toggleIcon.textContent = newIcon;
        toggleIcon.style.transform = 'translateX(0)';
        toggleIcon.style.opacity = '1';
    }, 150);  // 0.15초 후 텍스트 바꿈

    // 슬라이드 실행
    calendarContainer.classList.toggle('show');
});

