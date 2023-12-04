import axios from 'axios';

export type DBLPData = {
  author: string;
};

type HitType = {
  '@score': string;
  '@id': string;
  info: {
    author: string;
    url: string;
    notes?: {
      note: {
        '@type': string;
        text: string;
      };
    };
  };
};

export type DBLPDataResponse = {
  result: {
    hits: {
      '@total': string;
      hit: Array<HitType>;
    };
  };
};

export async function consultarDadosDBLP(
  autor: string
): Promise<DBLPDataResponse | undefined> {
  try {
    const response = await axios.get(
      `https://dblp.org/search/author/api?q=${autor}&format=json`
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao consultar dados da DBLP:', error);
    return undefined;
  }
}
