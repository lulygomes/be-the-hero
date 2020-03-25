//Importando a conexão com o banco
const connection = require('../database/connection')
//Improtando sistema de criptografia para gerar ID aleatorio
const crypto = require('crypto')

module.exports = {
    //Colocando dados no banco de dados 
    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body

        //Criando id aleatório 
        const id = crypto.randomBytes(4).toString('HEX')

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })


        return res.json({ id })
    },

    //Listando itens do banco de dados
    async index(req,res) {
        const ongs = await connection('ongs').select('*')
    
        return res.json(ongs)
    }
}