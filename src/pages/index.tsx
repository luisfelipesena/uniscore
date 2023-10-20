import { DefaultHeader } from '@/layouts/DefaultHeader';
import { EnhancedTable } from '@/app/components/Table-Exemple/Table';
import { Layout } from '@/layouts/PageLayout';
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <DefaultHeader />
      <Layout>
        <main>
          <EnhancedTable />
        </main>
        <div>
          <a target="_blank" href="https://github.com/luisfelipesena/uniscore">
            Github
          </a>
        </div>
      </Layout>
    </React.Fragment>
  );
}
