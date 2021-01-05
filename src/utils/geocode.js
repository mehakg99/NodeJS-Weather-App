const request = require('request');

const geoCode = (address, callback) => {
    const url = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWVoYWsxODEwIiwiYSI6ImNramFkN2FpZDMwemEyemxndGJpZHo2cTQifQ.39ZcFCrJz_upiu8mtfnGgA&limit=1";
    
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to get the location services');
        }
        else if(body.features.length == 0){
            callback('Invalid Location')
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode