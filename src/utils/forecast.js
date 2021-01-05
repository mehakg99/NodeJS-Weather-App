const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4d2c5d9fca5a379594318e54b193e09b&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect weather services');
        }
        else if(body.error){
            callback('Unable to get the location')
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currentlly " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast