import { Typography, Menu, Layout as AntdLayout } from 'antd';
import { ReactNode } from 'react';
import styles from '../../styles/Home.module.css';

const { Header, Content, Footer, Sider } = AntdLayout;

export interface LayoutProps {
  children: ReactNode;
}

const items = [
  {
    key: '1',
    label: 'Home',
  },
  {
    key: '2',
    label: 'Dashboard',
  },
  {
    key: '3',
    label: 'Settings',
  },
];

export const Layout = ({ children }: LayoutProps) => {
  return (
    <AntdLayout className={styles.Layout} hasSider>
      <Sider collapsed={false} width={300}>
        <div className={styles.MenuHeader}>
          <Typography className={styles.MenuHeaderText}>
            Arbitrum Bridge Subgraph Visualiser
          </Typography>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <AntdLayout className="site-layout">
        <Header className={styles.LayoutHeader} />
        <Content className={styles.LayoutContent}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Subgraph Arbitrum Bridge Visualiser ©2023 Created by Jackson
        </Footer>
      </AntdLayout>
    </AntdLayout>
  );
};
