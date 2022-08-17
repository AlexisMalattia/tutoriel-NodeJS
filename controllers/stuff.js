const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body //opérateur spread ...
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req,res,next)=>{
    Thing.findOne({_id: req.params.id})
        .then(thing =>res.status(200).json(thing))
        .catch(error => res.stats(404).json({error}));
};
exports. modifyThing = (req,res, next) =>{
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id}) //modifie le Thing qui a comme _id req.params.id et remplace son contenu par celui passé avec req.body, puis on réattribue l'id de req.params.id dans _id
        .then(() => res.status(200).json({message: 'Objet modifié'}))
        .catch(error => res.status(400).json({error}));
};
exports.deleteThing = (req, res, next) =>{
    Thing.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message:'Objet supprimé !'}))
        .catch(error => res.status(400).json({error}));
};
