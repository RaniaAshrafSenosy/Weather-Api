var inputInfo=document.getElementById("input-info");
let weatherInfo=[];
var searchInput='cairo';
const date = new Date();
getApiData();
function getDayName(number){
var weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";
return weekdays[number];
}

function getMonthName(){
    const months = ["Janu", "Febr", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "November", "Dec"];
    return months[date.getMonth()]
}

inputInfo.addEventListener('keyup',  function(e){
     searchInput=e.target.value;
     getApiData()
})

async function getApiData()
{
    let response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=22cfd21cfb6b49eab82132848221410&q=${searchInput}?&days=7`);
     weatherInfo= await response.json();
    if(searchInput.length>=3){
       
        let apiTodayData=`
        <h3 class="countrey">${weatherInfo.location.name}</h3>
        <h2 class="country-degree fa-5x"><sub>${weatherInfo.current.temp_c}</sub>o<sub> C</sub></h2>
        <img class="icon mt-1" src="https:${weatherInfo.current.condition.icon}">
        <p class="status text-info">${weatherInfo.current.condition.text}</p>
        `
        let apiTomorrowData=`

        <h2 class="country-degree fa-3x"><sub>${weatherInfo.forecast.forecastday[1].day.maxtemp_c}</sub>o<sub> C</sub></h2>
        <h2 class="country-degree fa-3x"><sub>${weatherInfo.forecast.forecastday[1].day.mintemp_c}</sub>o<sub> C</sub></h2>
        <img class="icon" src="https:${weatherInfo.forecast.forecastday[1].day.condition.icon}">
        <p class="note text-info">${weatherInfo.forecast.forecastday[1].day.condition.text}</p>
        `
        let apiAfterTomorrw=`
        <h2 class="country-degree fa-3x"><sub>${weatherInfo.forecast.forecastday[2].day.maxtemp_c}</sub>o<sub> C</sub></h2>
        <h2 class="country-degree fa-3x"><sub>${weatherInfo.forecast.forecastday[2].day.mintemp_c}</sub>o<sub> C</sub></h2>
        <img class="icon" src="https:${weatherInfo.forecast.forecastday[2].day.condition.icon}">
        <p class="note text-info">${weatherInfo.forecast.forecastday[2].day.condition.text}</p>
        `
          document.getElementById("info-today").innerHTML=apiTodayData;
          document.getElementById("info-tomorrow").innerHTML=apiTomorrowData;
          document.getElementById("info-afterTomorrow").innerHTML=apiAfterTomorrw;
    }
    
}

  

function CurrentDateInfo(){
    let today = date.getDay();
    let dayName=getDayName(today);
    let dayNumber=date.getDate();
    let month= getMonthName()
    document.getElementById("dayTxt").innerHTML=dayName;
    document.getElementById("dayNum").innerHTML=dayNumber;
    document.getElementById("month").innerHTML=month;
}
function tomorrowDateInfo(){
    let tomorrow = new Date();
    tomorrow.setDate(date.getDate()+1)
    let tomorrwDay=getDayName(tomorrow.getDay());
   document.getElementById("tomorrow-name").innerHTML=tomorrwDay;
}
function afterTomorrowDateInfo(){
    let afterTomorrow = new Date();
    afterTomorrow.setDate(date.getDate()+2)
    let afterTomorrwDay=getDayName(afterTomorrow.getDay());
   document.getElementById("afterTomorrow-name").innerHTML=afterTomorrwDay;

}
CurrentDateInfo()
tomorrowDateInfo()
afterTomorrowDateInfo()


