const express = require('express')

const OngsController = require('./controllers/OngsController')
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

//Acesso ao banco das Ongs
routes.post('/ongs', OngsController.create )
routes.get('/ongs', OngsController.index )

routes.get('/profile', ProfileController.index )

//Acesso ao banco de Casos
routes.post('/incidents', IncidentsController.create )
routes.get('/incidents', IncidentsController.index )
routes.delete('/incidents/:id', IncidentsController.delete )

module.exports = routes