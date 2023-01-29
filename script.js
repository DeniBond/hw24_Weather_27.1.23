(() => {
    const $inputCity = $('#city');
    const APIkey = 'dc498af71313fed064804cb392c5aa05'


    function createNewContent(weatherInfo) {
        // Есть сомнения, что так можно обращаться к объектам вложенным в другой объект, но оно работает )
        let temperature = weatherInfo.main.temp.toFixed(1);
        let pressure = weatherInfo.main.pressure;
        $('body').append(`
            <h1>City: ${weatherInfo.name}</h1>
            <h3>Temperature: ${temperature + '\u00b0'}</h3>
            <h3>Pressure: ${pressure}</h3>`)
    }

    function weatherRequest(data) {
        let lat, lon;
        data.forEach(item => {
            lat = item.lat;
            lon = item.lon;
        })
        $.ajax(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`, {
            method: 'GET',
            success: (data) => {
                console.log('weatherRequest ', 200, ' OK ');
                console.log(data);
                createNewContent(data);
            }
        })
    }

    function findLocationData() {
        $.ajax(`http://api.openweathermap.org/geo/1.0/direct?q=${$inputCity.val()}&appid=${APIkey}`, {
            method: 'GET',
            success: (data) => {
                weatherRequest(data);
                console.log('findLocationData ', 200, ' OK ');
                console.log(data)
            }
        })
    }

    $('#btnCheck').on('click', () => {
        findLocationData()
    })
})();