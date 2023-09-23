import { Header } from '@/app/components/Header';
import { Layout } from '@/app/components/Layout';
import { ResponseData } from './api/dumbapi';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [apiResponse, setApiResponse] = useState<ResponseData | null>(null);

  const onButtonClick = async () => {
    try {
      const fetchDatabase = await axios.get('/api/database-test');
      const database = fetchDatabase.data;
      console.log(database);

      const fetchApi = await axios.get('/api/dumbapi');
      const data = fetchApi.data;
      setApiResponse(data);
    } catch (error) {
      console.error(error);
    }
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
