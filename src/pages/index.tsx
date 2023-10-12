import { DumbApiResponseData } from '@/app/api/dumbapi/route';
import { EnhancedTable } from '@/app/components/Table-Exemple/Table';
import { Header } from '@/app/components/Header';
import { Layout } from '@/app/components/Layout';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [apiResponse, setApiResponse] = useState<DumbApiResponseData | null>(
    null
  );

  const onButtonClick = async () => {
    try {
      const fetchDatabase = await axios.get('/api/database');
      const database = fetchDatabase.data;
      console.log({ database });
    } catch (error) {
      console.error(error);
    }

    try {
      const fetchApi = await axios.get('/api/dumbapi?name=Teste');
      const data = fetchApi.data;
      setApiResponse(data);
    } catch (error) {
      console.error(error);
    }

    try {
      const fetchApi = await axios.post('/api/dumbapi', {
        name: 'Teste',
        email: 'email',
      });
      const data = fetchApi.data;
      setApiResponse(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header>
        <h1>Uniscore</h1>
      </Header>
      <Layout>
        <main>
          <ul style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {apiResponse?.data &&
              apiResponse.data.map((item, index) => {
                return <li key={index}>Name: {item.name}</li>;
              })}
          </ul>

          <button onClick={onButtonClick}>Clique para atualizar api</button>
        </main>
        <div>
          <p>TEXtO</p>
          <EnhancedTable />
        </div>
      </Layout>
    </>
  );
}
