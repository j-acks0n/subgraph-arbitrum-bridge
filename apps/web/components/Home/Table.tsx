import { Table as AntdTable, Typography } from 'antd';
import { useState } from 'react';
import { ETHDeposits } from '../../utilities';

const columns = [
  {
    title: 'Address',
    dataIndex: 'senderAliased',
    key: 'address',
  },
  {
    title: 'Destination Address',
    dataIndex: 'destAddr',
    key: 'destAddr',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Msg Data',
    dataIndex: 'msgData',
    key: 'msgData',
  },
  {
    title: 'Transaction Hash',
    dataIndex: 'transactionHash',
    key: 'transactionHash',
  },
  {
    title: () => (
      <Typography style={{ whiteSpace: 'nowrap' }}>Block Created At</Typography>
    ),
    dataIndex: 'blockCreatedAt',
    key: 'blockCreatedAt',
  },
];

export interface TableProps {
  data: ETHDeposits;
}
export const Table = ({ data }: TableProps) => {
  const [pageSize, setPageSize] = useState<number>(10);
  return (
    <AntdTable
      columns={columns}
      dataSource={data}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        pageSize: pageSize,
        onShowSizeChange(_current: number, size: number) {
          setPageSize(size);
        },
      }}
    />
  );
};
