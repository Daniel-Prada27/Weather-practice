const names = document.querySelectorAll('.name');
const temperatures = document.querySelectorAll('.temperature');

const oneDayBtn = document.getElementById("1dayBtn");
const threeDayBtn = document.getElementById("3dayBtn");
const loadBtn = document.getElementById("loadBtn");

const url = 'https://api.open-meteo.com/v1/forecast?latitude=7.1254&longitude=-73.1198&hourly=temperature_2m,weathercode&timezone=auto'

const now = new Date();
const day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
const hours = now.getHours();
const minutes = now.getMinutes();
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

oneDayBtn.addEventListener('click', (e) => {
    setDayMoments();
})

threeDayBtn.addEventListener('click', (e) => {
    setNames();
    setTemperatures();    
    console.log(hours);
})

function setNames() {
    let today = day;
    let counter = 0;
    
    for (let i = 0; i < 3; i++) {

        if ((today + i) > (week.length -1)) {
            names[i].innerHTML = week.at(-7 + counter);
            counter++;
        } else {
            names[i].innerHTML = week[today + i];
        }
    }
}

function setDayMoments() {
    names[0].innerHTML = 'Morning';
    names[1].innerHTML = 'Afternoon';
    names[2].innerHTML = 'Evening';
}

async function setTemperatures() {
    let arr = await getTemperature();

    for (let i = 0; i < 3; i++) {
        temperatures[i].innerHTML = arr[(24*i) + hours ];
    }

}
async function getTemperature() {
    let temperature = await getData();
    return temperature.temperature_2m;
}

async function getData() {
    let rawData = await fetch(url);
    let data = await rawData.json();
    return data.hourly;
}

