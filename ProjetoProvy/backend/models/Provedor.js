// models/Cliente.js
import mongoose from 'mongoose';

const provedorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  especialidade: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model('Provedor', provedorSchema);
