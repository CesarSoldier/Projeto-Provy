// Exportação nomeada
export function gerarCodigoPix(chave, nome, cidade, valor, descricao) {
  const valorFormatado = valor.toFixed(2);
  const payload = [
      "000201",
      "26",
      "0014BR.GOV.BCB.PIX",
      `01${String(chave.length).padStart(2, "0")}${chave}`,
      "52040000",
      "5303986",
      `540${String(valorFormatado.length).padStart(2, "0")}${valorFormatado}`,
      "5802BR",
      `59${String(nome.length).padStart(2, "0")}${nome}`,
      `60${String(cidade.length).padStart(2, "0")}${cidade}`,
      `62${String(descricao.length).padStart(2, "0")}${descricao}`,
      "6304",
  ].join("");

  return `${payload}${calcularCRC16(payload)}`;
}

export function calcularCRC16(payload) {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
          crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
}
