import axios from 'axios';

export async function consultarDadosDBLP(
  autor: string
): Promise<any | undefined> {
  try {
    const response = await axios.get(`https://dblp.org/search/author/api?q=${autor}&format=json`);

    return response.data;
  } catch (error) {
    console.error('Erro ao consultar dados da DBLP:', error);
    return undefined;
  }
}
