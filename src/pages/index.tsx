import { Header } from '@/app/components/Header';
import { Layout } from '@/app/components/Layout';
import axios from 'axios';

export default function Home() {
  const onButtonClick = async () => {
    try {
      const response = await axios.post('/api/cadastro', {
        nome: 'Teste',
        email: 'teste@teste.com',
        senha: '123',
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header>
        <h1>Produção científica</h1>
      </Header>
      <Layout>
        <ul style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <li style={{ listStyle: 'none' }}>
            <a href="/api/producoes">Produções</a>
          </li>
        </ul>

        <button onClick={onButtonClick}>Clique para atualizar api</button>
      </Layout>
    </>
  );
}
