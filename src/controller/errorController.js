const Erro = require('../model/error')

module.exports = {
    async index(req, res){
     try{
       const error = await Erro.find();

       return res.send({error});
     }catch (err){
       return res.status(400).send({error: 'Error loading errors list'});
     }
    },


    async create(req, res) {
      try{

        const erro = await Erro.create(req.body);
    
        return res.send({erro});
    
      }catch(err){
        return res.status(400).send({error: 'Error add new error'});
      }
    }
};
