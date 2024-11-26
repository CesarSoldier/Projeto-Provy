import mongoose from 'mongoose';

const pagamentoSchema = new mongoose.Schema({
  cliente_id: { type: String, required: true },
  valor: { type: Number, required: true },
  codigo_pix: { type: String, required: true },
  status: { type: String, default: "pendente" },
  criado_em: { type: Date, default: Date.now },
});

export default mongoose.model('Pagamento', pagamentoSchema);