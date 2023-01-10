import { Button, Select, Typography } from 'antd';
import Head from 'next/head';
import { Layout, Table } from '../components';
import { useHome } from '../hooks';

const { Option } = Select;

const { Title } = Typography;
export default function Home() {
  //Custom hook for fetching data from the subgraph
  const { data, getData } = useHome();

  return (
    <>
      <Head>
        <title>Subgraph Arbitrum Bridge Visualiser</title>
        <meta
          name="description"
          content="Subgraph Arbitrum Bridge Visualiser"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {data.length ? (
          <Table data={data} />
        ) : (
          <>
            <Title level={4}>
              Welcome to the Subgraph Arbitrum Bridge Visualiser. Click the
              button to start fetching data for ethDeposits from the subgraph.
            </Title>
            <Button onClick={() => getData()}>Fetch data</Button>
          </>
        )}
      </Layout>
    </>
  );
}
