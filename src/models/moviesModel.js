// Importando os pacotes
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MovieSchema = new mongoose.Schema({
    title:{
        type:'String',
        required: true
    },
    year:{
        type:'String',
        required: true
    },
    duration:{
        type:'String',
        required: true
    },
    director:{
        type: 'String',
        required: true
    },
    genre:{
        type: 'String',
        required: true
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

});

MovieSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Movie', MovieSchema);