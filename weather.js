const apiKey = 'ee895bb8a866bd3a2eba984e919f9209';

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // pour le jour actuel avec détail (precipitation, humidité, vent)
const apiForecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="; // pour les 3 jours suivants
const recherche = document.querySelector(".search-input");

// Fonction pour obtenir les données météorologiques à partir de l'API
async function getWeatherData(city) {

    // Faites une requête à l'API OpenWeatherMap One Call
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    // Affichez toutes les informations de la réponse de l'API dans la console
    console.log(data);

    // Récupérez le champ "dt" de la réponse de l'API
    const timestamp = data.dt;

    // Créez un objet Date à partir du timestamp
    const date = new Date(timestamp * 1000); // Multipliez par 1000 pour convertir le timestamp en millisecondes

    // Obtenez le jour de la semaine en utilisant les méthodes de l'objet Date
    const joursSemaine = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const jour = joursSemaine[date.getDay()];

    // Obtenez le jour, le mois et l'année
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const dateFormatted = date.toLocaleDateString('en-US', options);

    // afficher seulement deux chiffres apres la virgule
    const lat = data.coord.lat.toFixed(2);
    const lon = data.coord.lon.toFixed(2);

    // Recuperer le nom de la ville
    document.querySelector(".lieu").innerHTML = data.name + ', ' + data.sys.country;
    document.querySelector(".date").innerHTML = dateFormatted;
    document.querySelector(".jour").innerHTML = jour;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".ciel").innerHTML = data.weather[0].main;
    document.querySelector(".coordonnees").innerHTML = lat + ", " + lon;
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
}

// Les 3 jours qui suivent
async function getOtherDaysData(city) {
  // Faites une requête à l'API OpenWeatherMap Forecast pour obtenir les prévisions des 3 jours suivants
  const forecastResponse = await fetch(apiForecast + city + `&appid=${apiKey}`);
  const forecastData = await forecastResponse.json();

  console.log(forecastData);

  const timestamp = forecastData.list[0].dt;
  const date = new Date(timestamp * 1000); 
  const joursSemaine = ['Sund', 'Mond', 'Tue', 'Wed', 'Thur', 'Frid', 'Sat'];
  const jourUn = joursSemaine[date.getDay()];

  // Aujourd'hui
  document.querySelector(".jour-un").innerHTML = jourUn;
  document.querySelector(".span_temperature.jour-un").innerHTML = Math.round(forecastData.list[0].main.temp) + " °C";
  
  
  // Créez un objet de mappage entre les conditions météorologiques et les noms de fichiers d'icônes
  const weatherIconMapping = {
    "Clear": "clear.png",
    "Clouds": "clouds.png",
    "Drizzle": "drizzle.png",
    "Rain": "rain.png",
    "Thunderstorm": "thunderstorm.png",
    "Snow": "snow.png",
    "Mist": "mist.png",
    "Smoke": "mist.png",
    "Haze": "mist.png",
    "Dust": "mist.png",
    "Fog": "mist.png",
    "Sand": "mist.png",
    "Ash": "mist.png",
    "Squall": "mist.png",
    "Tornado": "mist.png"
  };

  // Obtenez le nom du fichier d'icône en utilisant le mappage
  const weatherCondition = forecastData.list[0].weather[0].main;
  const iconFileName = weatherIconMapping[weatherCondition];
  // icone jour Un
  const iconeJourUn = document.querySelector(".iconeCielJourUn");
  iconeJourUn.src = "images/" + iconFileName;

  // -----------------------------------------------------Demain (jour deux)----------------------------------------------------
  date.setDate(date.getDate() + 1);
  const jourDeux = joursSemaine[date.getDay()];

  document.querySelector(".jour-deux").innerHTML = jourDeux;
  document.querySelector(".span_temperature.jour-deux").innerHTML = Math.round(forecastData.list[1].main.temp) + " °C";
  
  const weatherConditionJourDeux = forecastData.list[1].weather[0].main;
  const iconFileNameJourDeux = weatherIconMapping[weatherConditionJourDeux];
  const iconeJourDeux = document.querySelector(".iconeCielJourDeux");
  iconeJourDeux.src = "images/" + iconFileNameJourDeux;
  
  // ----------------------------------------------------- Jour 3 ----------------------------------------------------
  date.setDate(date.getDate() + 1);
  const jourTrois = joursSemaine[date.getDay()];

  document.querySelector(".jour-trois").innerHTML = jourTrois;
  document.querySelector(".span_temperature.jour-trois").innerHTML = Math.round(forecastData.list[2].main.temp) + " °C";
  
  const weatherConditionJourTrois = forecastData.list[2].weather[0].main;
  const iconFileNameJourTrois = weatherIconMapping[weatherConditionJourTrois];
  const iconeJourTrois = document.querySelector(".iconeCielJourTrois");
  iconeJourTrois.src = "images/" + iconFileNameJourTrois;

  // ----------------------------------------------------- Jour 3 ----------------------------------------------------
  date.setDate(date.getDate() + 1);
  const jourQuatre = joursSemaine[date.getDay()];

  document.querySelector(".jour-quatre").innerHTML = jourQuatre;
  document.querySelector(".span_temperature.jour-quatre").innerHTML = Math.round(forecastData.list[3].main.temp) + " °C";
  
  const weatherConditionJourQuatre = forecastData.list[3].weather[0].main;
  const iconFileNameJourQuatre = weatherIconMapping[weatherConditionJourQuatre];
  const iconeJourQuatre = document.querySelector(".iconeCielJourQuatre");
  iconeJourQuatre.src = "images/" + iconFileNameJourQuatre;
}

// Définissez la ville par défaut sur "Angers"
document.addEventListener("DOMContentLoaded", function () {
  const defaultCity = "Angers";
  getWeatherData(defaultCity);
  getOtherDaysData(defaultCity);
});

recherche.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeatherData(recherche.value);
    getOtherDaysData(recherche.value);
  }
});



