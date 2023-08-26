
const names = document.querySelectorAll('.name');
const iconSlots = document.querySelectorAll('.icon-slot');
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

let svgXmlns = "http://www.w3.org/2000/svg";
let iconHeight = '70%';
let iconWidth = '70%';

 let svgInfo = {
    sunny: {
        path: "M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z", 
        viewbox: "0 0 512 512"
    }, 

    partlyCloudy: {
        path: "M294.2 1.2c5.1 2.1 8.7 6.7 9.6 12.1l14.1 84.7 84.7 14.1c5.4 .9 10 4.5 12.1 9.6s1.5 10.9-1.6 15.4l-38.5 55c-2.2-.1-4.4-.2-6.7-.2c-23.3 0-45.1 6.2-64 17.1l0-1.1c0-53-43-96-96-96s-96 43-96 96s43 96 96 96c8.1 0 15.9-1 23.4-2.9c-36.6 18.1-63.3 53.1-69.8 94.9l-24.4 17c-4.5 3.2-10.3 3.8-15.4 1.6s-8.7-6.7-9.6-12.1L98.1 317.9 13.4 303.8c-5.4-.9-10-4.5-12.1-9.6s-1.5-10.9 1.6-15.4L52.5 208 2.9 137.2c-3.2-4.5-3.8-10.3-1.6-15.4s6.7-8.7 12.1-9.6L98.1 98.1l14.1-84.7c.9-5.4 4.5-10 9.6-12.1s10.9-1.5 15.4 1.6L208 52.5 278.8 2.9c4.5-3.2 10.3-3.8 15.4-1.6zM144 208a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM639.9 431.9c0 44.2-35.8 80-80 80H288c-53 0-96-43-96-96c0-47.6 34.6-87 80-94.6l0-1.3c0-53 43-96 96-96c34.9 0 65.4 18.6 82.2 46.4c13-9.1 28.8-14.4 45.8-14.4c44.2 0 80 35.8 80 80c0 5.9-.6 11.7-1.9 17.2c37.4 6.7 65.8 39.4 65.8 78.7z", 
        viewbox: "0 0 640 512"
    }
}



oneDayBtn.addEventListener('click', (e) => {
    setDayMoments();
})

threeDayBtn.addEventListener('click', (e) => {
    setNames();
    setTemperatures();
    setIcon();
    // console.log(hours);
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
    let ma = await getWeatherCode();

    for (let i = 0; i < 3; i++) {
        temperatures[i].innerHTML = arr[(24*i) + hours ];
        console.log(ma[(24*i) + hours ])
    }

}


async function getTemperature() {
    let temperature = await getData();
    return temperature.temperature_2m;
}

async function getWeatherCode() {
    let temperature = await getData();
    return temperature.weathercode;
}

async function getData() {
    let rawData = await fetch(url);
    let data = await rawData.json();
    return data.hourly;
}

async function setIcon() {
    let weatherCode = await getWeatherCode();

    for (let i = 0; i < 3; i++) {
        // temperatures[i].innerHTML = arr[(24*i) + hours ];
        if (iconSlots[i].childElementCount != 0) {
            iconSlots[i].childNodes[0].remove();
        }
        iconSlots[i].append(createSvg(weatherCode[(24*i) + hours]))
    }
}

function createSvg(code) {
    const svg = document.createElementNS(svgXmlns, "svg");
    svg.setAttribute("xmlns", svgXmlns);
    svg.setAttribute("height", iconHeight);
    svg.setAttribute("width", iconWidth);
    let path = document.createElementNS(svgXmlns, "path");

    switch (code) {
        case 0:
            svg.setAttribute('viewBox', svgInfo.sunny.viewbox);
            path.setAttribute('d', svgInfo.sunny.path);
            break;

        case 1:
            svg.setAttribute('viewBox', svgInfo.sunny.viewbox);
            path.setAttribute('d', svgInfo.sunny.path);
            break;

        case 2:
            svg.setAttribute('viewBox', svgInfo.partlyCloudy.viewbox);
            path.setAttribute("d", svgInfo.partlyCloudy.path);
            break;

        case 3:
            svg.setAttribute('viewBox', svgInfo.partlyCloudy.viewbox);
            path.setAttribute('d', svgInfo.partlyCloudy.path);
            break;

        case 45:
            svg.setAttribute('viewBox', svgInfo.fog.viewbox);
            path.setAttribute('d', svgInfo.fog.path);
            break;

        case 48:
            svg.setAttribute('viewBox', svgInfo.fog.viewbox);
            path.setAttribute('d', svgInfo.fog.path);
            break;

        case 51:
            svg.setAttribute('viewBox', svgInfo.drizzleLight.viewbox);
            path.setAttribute('d', svgInfo.drizzleLight.path);
            break;

        case 53:
            svg.setAttribute('viewBox', svgInfo.drizzleModerate.viewbox);
            path.setAttribute('d', svgInfo.drizzleModerate.path);
            break;

        case 55:
            svg.setAttribute('viewBox', svgInfo.drizzleDense.viewbox);
            path.setAttribute('d', svgInfo.drizzleDense.path);
            break;

        case 56:
            svg.setAttribute('viewBox', svgInfo.snow.viewbox);
            path.setAttribute('d', svgInfo.snow.path);
            break;

        case 57:
            svg.setAttribute('viewBox', svgInfo.snow.viewbox);
            path.setAttribute('d', svgInfo.snow.path);
            break;

        case 61:
            svg.setAttribute('viewBox', svgInfo.drizzleLight.viewbox);
            path.setAttribute('d', svgInfo.drizzleLight.path);
            break;

        case 63:
            svg.setAttribute('viewBox', svgInfo.drizzleModerate.viewbox);
            path.setAttribute('d', svgInfo.drizzleModerate.path);
            break;

        case 65:
            svg.setAttribute('viewBox', svgInfo.drizzleDense.viewbox);
            path.setAttribute('d', svgInfo.drizzleDense.path);
            break;

        case 66:
            svg.setAttribute('viewBox', svgInfo.snow.viewbox);
            path.setAttribute('d', svgInfo.snow.path);
            break;

        case 67:
            svg.setAttribute('viewBox', svgInfo.snow.viewbox);
            path.setAttribute('d', svgInfo.snow.path);
            break;

        case 71:
            svg.setAttribute('viewBox', svgInfo.snow.viewbox);
            path.setAttribute('d', svgInfo.snow.path);
            break;

        case 73:
            svg.setAttribute('viewBox', svgInfo.snow.viewbox);
            path.setAttribute('d', svgInfo.snow.path);
            break;

        case 75:
            svg.setAttribute('viewBox', svgInfo.snow.viewbox);
            path.setAttribute('d', svgInfo.snow.path);
            break;

        case 77:
            svg.setAttribute('viewBox', svgInfo.snow.viewbox);
            path.setAttribute('d', svgInfo.snow.path);
            break;

        case 80:
            svg.setAttribute('viewBox', svgInfo.drizzleLight.viewbox);
            path.setAttribute('d', svgInfo.drizzleLight.path);
            break;

        case 81:
            svg.setAttribute('viewBox', svgInfo.drizzleModerate.viewbox);
            path.setAttribute('d', svgInfo.drizzleModerate.path);
            break;

        case 82:
            svg.setAttribute('viewBox', svgInfo.drizzleDense.viewbox);
            path.setAttribute('d', svgInfo.drizzleDense.path);
            break;

        case 85:
            svg.setAttribute('viewBox', svgInfo.snow.viewbox);
            path.setAttribute('d', svgInfo.snow.path);
            break;

        case 86:
            svg.setAttribute('viewBox', svgInfo.snow.viewbox);
            path.setAttribute('d', svgInfo.snow.path);
            break;

        case 96:
            svg.setAttribute('viewBox', svgInfo.drizzleDense.viewbox);
            path.setAttribute('d', svgInfo.drizzleDense.path);
            break;

        case 99:
            svg.setAttribute('viewBox', svgInfo.drizzleDense.viewbox);
            path.setAttribute('d', svgInfo.drizzleDense.path);
            break;

        default:
    }

    svg.appendChild(path);

    return svg;
}
