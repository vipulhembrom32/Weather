//  DARK MODE TOGGLE

document.querySelector(".mode-select").addEventListener('click',function(){
    let modeswitch = document.querySelector(".mode-select");
    let nav = document.querySelector("nav");
    let body = document.querySelector("body");
    let box = document.querySelector(".box");
    let searchInput = document.querySelector(".search-input");

    modeswitch.classList.toggle('fa-cloud-moon');
    modeswitch.classList.toggle('fa-sun');

    nav.classList.toggle('navbar-dark');
    nav.classList.toggle('navbar-light');

    if(body.style.backgroundColor==='black'){
        body.style.backgroundColor = 'white';
        body.style.backgroundImage = 'url("https://docs.google.com/uc?id=1gg8_Rb-bl8tuN6WaBiLkvM9eyqsqtHEs")';
        body.style.backgroundSize = 'cover';
        box.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        box.style.color = 'black';
        searchInput.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        searchInput.style.color = 'black';
    }
    else{
        body.style.backgroundColor = 'black';
        body.style.backgroundImage = 'url("https://docs.google.com/uc?id=13-P5kh2dkfpjQjg0PTJVxQ835lWBpW2k")';
        body.style.backgroundSize = 'cover';
        box.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        box.style.color = 'white';
        searchInput.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        searchInput.style.color = 'white'
    }
});

//  TEMPERATURE CONVERSION

document.querySelector(".temp").addEventListener("click",function(){
    var temperature = document.querySelector(".temp").textContent;
    var degtype = temperature.slice(temperature.length-2);

    if(degtype==="°C"){
        var newTemp = (Number(temperature.slice(0,temperature.length-3))*9)/5+32;
        document.querySelector(".temp").textContent = newTemp.toFixed(2) + " °F";
    }
    else{
        var newTemp = ((Number(temperature.slice(0,temperature.length-3))-32)*5)/9;
        document.querySelector(".temp").textContent = newTemp.toFixed(2) + " °C";
    }
});

//  FETCHING

document.querySelector(".search-button").addEventListener('click',function(){

    let place = document.querySelector('.search-input').value;
    document.querySelector('.search-input').value = '';
    document.querySelector('.search-input').setAttribute('placeholder','Search....');

    place = place[0].toUpperCase() + place.slice(1);

    console.log(place);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=32c612a4c1c744a7775b1473bd4ecc31`;

    getWeather(url);

});

function getWeather(url){
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((data) => {
        // console.log(data);

        let title = document.querySelector(".title");
        title.textContent = `Weather in ${data.name}`;

        let temp = document.querySelector(".temp");
        temp.textContent = `${data.main.temp} °C`;

        let desc = document.querySelector(".desc");
        desc.textContent = `${data.weather[0].main}`;

        let wspeed = document.querySelector(".wspeed");
        wspeed.textContent = `Wind Speed : ${data.wind.speed} Km/hr`;

        let humidity = document.querySelector(".humidity");
        humidity.textContent = `Humidity : ${data.main.humidity} %`;

        let id = data.weather[0].icon;
        document.querySelector(".desc-img").setAttribute('src',`http://openweathermap.org/img/wn/${id}@2x.png`)
        // http://openweathermap.org/img/wn/10d@2x.png
    });
}

let defaultPlaceUrl = "http://api.openweathermap.org/data/2.5/weather?q=Jamshedpur&units=metric&appid=32c612a4c1c744a7775b1473bd4ecc31";

getWeather(defaultPlaceUrl);
