const express = require('express');
const request = require('request');
const path = require('path');
const server = express();

publicPathDir = path.join(__dirname,'/Public');
server.use(express.static(publicPathDir));

server.get('/', (req,res) => {
    res.send('hello');
});

server.get('/p', (req,res) => {
    let add = req.query.address;
    console.log(add);
    let mapurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${add}&key=**YOUR API KEY**`;
    request({url: mapurl , json: true}, (error,response) =>{
        let FA = response.body.results[0].formatted_address;
        let lat = response.body.results[0].geometry.location.lat;
        let lng = response.body.results[0].geometry.location.lng;
        let sen_url = `https://openstates.org/api/v1/legislators/geo/?lat=${lat}&long=${lng}&apikey=**YOUR API KEY**`;
        request({url: sen_url, json: true},(error,response) =>{
            let senatorName = response.body[0].full_name
            console.log(FA);
            res.send({
                name: senatorName,
                FA: FA
            });
        });
    });
});

server.listen('60000',()=> console.log('server listening'));
