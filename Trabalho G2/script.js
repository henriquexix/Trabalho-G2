const searchButton = document.getElementById('search-button');
const stateInput = document.getElementById('state-input');
const cityInput = document.getElementById('city-input');
const weatherInfoElement = document.getElementById('weather-info');
const apiKey = 'c14ef857fdbe4a11892212817242706';

searchButton.addEventListener('click', function() {
    const state = stateInput.value;
    const city = cityInput.value;

    if (state.trim() === '') {
        showError('Por favor, informe o estado.');
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city},${state}&lang=pt`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showError(data.error.message);
            } else {
                showWeather(data);
                updateBackground(data.current.temp_c);
            }
        })
        .catch(error => {
            showError('Erro ao buscar dados. Verifique o nome da cidade e estado.');
        });
});

function showWeather(data) {
    const { name, region, country } = data.location;
    const { temp_c, condition } = data.current;

    weatherInfoElement.innerHTML = `
        <h2>${name}, ${region}, ${country}</h2>
        <p>Temperatura Atual: ${temp_c}°C</p>
        <p>Condição: ${condition.text}</p>
    `;
}

function showError(message) {
    weatherInfoElement.innerHTML = `<p>${message}</p>`;
}

function updateBackground(temperature) {
    let imageUrl = 'url("imagens/default.png")';

    if (temperature < 10) {
        imageUrl = 'url("imagens/frio.png")';
    } else if (temperature >= 10 && temperature < 24) {
        imageUrl = 'url("imagens/ameno.png")';
    } else if (temperature >= 25 && temperature < 35) {
        imageUrl = 'url("imagens/calor.png")';
    }

    document.body.style.backgroundImage = imageUrl;
}
