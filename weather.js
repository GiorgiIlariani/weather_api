let appId = '3a28d45cfb89d29d3b98bc06826e589c';
let units = 'matric';
let searchMethod; // eother zipcode or cityName

const searchBtn = document.getElementById('searchBtn');


function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
        searchMethod = 'zip'
    }else {
        searchMethod= 'q';
    }
}


function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':   
        document.body.style.backgroundImage = 'url("clear.jpg")'      
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("clouds.jpg")'      
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")'      
            break;
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("thunderstorm.jpg")'      
            break;
        case 'snow':
            document.body.style.backgroundImage = 'url("snow.jpg")'      
            break
        default:
            break;
    }

    let weatherDescriptionHeader = document.querySelector('.weatherDescriptionHeader');
    let temperaturElement = document.querySelector('.temperature');
    let humadityElement = document.querySelector('.humadity');
    let windSpeedElement = document.querySelector('.windSpeed');
    let cityHeader = document.querySelector('.cityHeader');
    let weatherIcon = document.getElementById('weatherIconImg')


    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
  //  console.log(resultFromServer);

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperaturElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    humadityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

    setPositionForWeatherInfo();
}

function searchWeather(searchTerm) {
    // searchterm is whatever the user write in input
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
    .then(result => {
        return result.json(); //converts http response into json
        // this returns a promise,so we can use then again
    }).then(result => {
        init(result);
    });
    // call the api and return the json
    // we should receive the json firsly and then move on the code. we want to wait
}

searchBtn.addEventListener('click' ,() => {
    let searchTerm = document.getElementById('search').value;
    if(searchTerm) {
        searchWeather(searchTerm);
    }
})





function setPositionForWeatherInfo() {
    let weatherContainer = document.querySelector('.weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerwidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerwidth / 2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
    weatherContainer.style.visibility = 'visible';
    
}










































