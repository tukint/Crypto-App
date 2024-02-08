import { Table } from "antd";
import { useCrypto } from '../../context/appContext';

export default function PortfolioTable() {
    
const {assets} = useCrypto();  



const dataSource =assets.map((ass, index ) => {
    return {key: index,
    name: ass.id,
    price: ass.price,
    amount:ass.amount}
})
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (

      <Table pagination={false} dataSource={dataSource} columns={columns} />
  )
}