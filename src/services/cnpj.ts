export interface CnpjData {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string | null;
  situacaoCadastral: string;
  telefone: string | null;
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
  };
  enderecoFormatado: string;
}

function limparCnpj(cnpj: string): string {
  return cnpj.replace(/\D/g, '');
}

function formatarTelefone(ddd: string | null, numero: string | null): string | null {
  if (!ddd || !numero) return null;
  return `(${ddd}) ${numero}`;
}

export async function consultarCnpj(cnpjBruto: string): Promise<CnpjData | null> {
  const cnpj = limparCnpj(cnpjBruto);

  if (cnpj.length !== 14) {
    throw new Error('CNPJ inválido: precisa ter 14 dígitos.');
  }

  const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Erro ao consultar CNPJ: ${response.status}`);
  }

  const data = await response.json();

  const endereco = {
    logradouro: `${data.descricao_tipo_de_logradouro ?? ''} ${data.logradouro ?? ''}`.trim(),
    numero: data.numero ?? '',
    complemento: data.complemento || null,
    bairro: data.bairro ?? '',
    municipio: data.municipio ?? '',
    uf: data.uf ?? '',
    cep: data.cep ?? '',
  };

  const enderecoFormatado = [
    `${endereco.logradouro}, ${endereco.numero}`,
    endereco.complemento,
    endereco.bairro,
    `${endereco.municipio} - ${endereco.uf}`,
    endereco.cep,
  ]
    .filter(Boolean)
    .join(', ');

  // Prioriza o primeiro telefone; cai pro segundo se o primeiro não vier
  const telefone =
    formatarTelefone(data.ddd_telefone_1, data.telefone_1) ??
    formatarTelefone(data.ddd_telefone_2, data.telefone_2) ??
    null;

  return {
    cnpj: data.cnpj,
    razaoSocial: data.razao_social,
    nomeFantasia: data.nome_fantasia || null,
    situacaoCadastral: data.descricao_situacao_cadastral,
    telefone,
    endereco,
    enderecoFormatado,
  };
}