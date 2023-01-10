import { Input, Select, Space, Table as AntdTable, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { ETHDeposits } from '../../utilities';

const { Option } = Select;
const { Title } = Typography;

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
  const [selected, setSelected] = useState<string>('transactionHash');
  const [input, setInput] = useState<string>('');

  const filteredData = useMemo(() => {
    return data.filter((entry) => {
      if (selected === 'transactionHash') {
        return entry.transactionHash
          .toLowerCase()
          .includes(input.toLowerCase());
      } else if (selected === 'address') {
        return entry.senderAliased.toLowerCase().includes(input.toLowerCase());
      }
    });
  }, [data, input, selected]);

  return (
    <>
      <Space direction="vertical">
        <Title level={4}>Query results</Title>
        <Space>
          <Input.Group compact>
            <Select value={selected} onChange={setSelected}>
              <Option value="transactionHash">Transaction Hash</Option>
              <Option value="address">Address</Option>
            </Select>
            <Input
              placeholder="Search..."
              value={input}
              onChange={(value) => setInput(value.target.value)}
              style={{ width: '50%' }}
            />
          </Input.Group>
        </Space>

        <AntdTable
          columns={columns}
          dataSource={input ? filteredData : data}
          pagination={{
            position: ['bottomLeft'],
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            pageSize: pageSize,
            onShowSizeChange(_current: number, size: number) {
              setPageSize(size);
            },
          }}
        />
      </Space>
    </>
  );
};
