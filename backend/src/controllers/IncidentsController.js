// Importe da conexão com o banco
const connection = require('../database/connection')

module.exports = {
    //Inserindo dados no bando de dados
    async create(req, res) {
        const { title, description, value } = req.body
        const ong_id = req.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return res.json({ id })
    },

    //Listando incidente do banco de dados 
    async index(req, res) {
        const { page = 1 } = req.query

        const [count] = await connection('incidents').count()
        console.log(count)

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1 ) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])

        res.header('X-Total-Count', count['count(*)'])

        return res.json(incidents)
    },

    //Deletar dados do banco de dados
    async delete(req, res) {
        const { id } = req.params
        const ong_id = req.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        
        if(incident.ong_id != ong_id){
            return res.status(401).json({error: 'Não autorizado'})
        }

        await connection('incidents').where('id', id).delete()

        return res.status(204).send()
    }
}