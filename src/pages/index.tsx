import { Header } from '@/app/components/Header';
import { Layout } from '@/app/components/Layout';
import { ResponseData } from './api/hello';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [apiResponse, setApiResponse] = useState<ResponseData | null>(null);

  const onButtonClick = async () => {
    const fetchApi = await axios.get('/api/hello');
    const data = fetchApi.data;
    setApiResponse(data);
  };

  return (
    <>
      <Header>
        <h1>Produção científica</h1>
      </Header>
      <Layout>
        <ul style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {apiResponse?.data &&
            apiResponse.data.map((item, index) => {
              return <li key={index}>Name: {item.name}</li>;
            })}
        </ul>

        <button onClick={onButtonClick}>Clique para atualizar api</button>
      </Layout>
    </>
  );
}
