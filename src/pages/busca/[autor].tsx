import { DBLPDataResponse } from '@/app/api/controllers/dblp';
import { BasicTable } from '@/app/components/Table';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import { GridColDef } from '@mui/x-data-grid';

type SearchDynamicPageProps = {
  autor: string;
};

export default function SearchDynamicPage({
  autor,
}: {
  autor: SearchDynamicPageProps;
}) {
  const router = useRouter();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<Array<{ [key: string]: React.ReactNode }>>(
    []
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<{ data?: DBLPDataResponse }>(`/api/dblp?autor=${autor}`)
      .then(({ data: response }) => {
        if (!response?.data) {
          throw new Error('Erro ao puxar dados');
        }

        const { data } = response;
        setColumns([
          { field: 'autor', headerName: 'Autor', width: 300 },
          { field: 'score', headerName: 'Score', width: 64 },
          { field: 'vinculo', headerName: 'Vínculo à academia', width: 200 },
          { field: 'academia', headerName: 'Academia', width: 300 },
          {
            field: 'url',
            headerName: 'URL DBLP',
            width: 300,
            renderCell: (params) => (
              <Link target="__blank" href={params.row.url}>
                {params.row.url}
              </Link>
            ),
          },
        ]);

        data?.result?.hits?.hit?.forEach((hit, index) => {
          const { info } = hit;
          const score = hit?.['@score'] ?? '-';
          const { author, url, notes } = info;
          const noteType = notes?.note?.['@type'] ?? '-';
          const text = notes?.note?.text ?? '-';

          setRows((rw) => [
            ...rw,
            {
              id: index,
              autor: author,
              score: score,
              vinculo: noteType,
              academia: text,
              url: url,
            },
          ]);
        });

        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error?.response?.statusText ?? error?.message;
        toast.error(`Erro ao puxar dados: ${errorMessage}`);
        router.push('/');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.tableSection}>
      <BasicTable rows={rows} columns={columns} loading={loading} />
    </section>
  );
}

SearchDynamicPage.getInitialProps = async ({
  query: { autor },
}: {
  query: SearchDynamicPageProps;
}) => {
  return { autor };
};
