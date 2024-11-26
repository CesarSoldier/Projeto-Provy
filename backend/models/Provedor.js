import mongoose from 'mongoose';

import mongoose from 'mongoose';

const provedorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    especialidade: { type: String, required: true },
    telefone: { type: String, required: true },
    endereco: { type: String, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: String, required: true },
});

export default mongoose.model('Provedor', provedorSchema);
