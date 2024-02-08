import { useState } from "react";
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  Button,
  InputNumber,
  DatePicker,
  Result
} from "antd";
import { useCrypto } from "../context/appContext";
import { useForm } from "antd/es/form/Form";
import CoinInfo from "./CoinInfo";




export default function AddAssetForm({onClose}) {

  const [form] =  Form.useForm() 
  const [coin, setCoin] = useState(null);
  const { crypto } = useCrypto();
  const [amount, setAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false)

if (submitted) {
    return (
        <Result
    status="success"
    title="New Asset Successfully Added"
    subTitle={`Added ${43} of ${coin.name} by price ${23}`}
    extra={[
      <Button type="primary" key="console" onClick={onClose}>
        Close
      </Button>,
    ]}
  /> 
    )
}

  const onFinish = (values) => {
    setSubmitted(true)
    const newAsset = {
        id: coin.id,
        amount: values.price,
        date:  Date.now()
    }
  }

  const handleAmountChange = (value) => {
      console.log(value);
    form.setFieldsValue({
        total: +(value * coin.price).toFixed(2)
    })
  }

  if (!coin)
    return (
      <Select
        onSelect={(v) => setCoin(crypto.find((c) => c.id == v))}
        placeholder="Select Coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
    );

  return (
  <>
        <CoinInfo coin={coin}/>
      <Divider/>

      <Form
      form ={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
            price: coin.price.toFixed(2),
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Amount"
          name="amount"
         
          rules={[
            {
              required: true,
              type: 'number',
              min: 0,
              message: "Please input asset amount!",
            },
          ]}
        >
          <InputNumber  onChange= {handleAmountChange} style={{width: '100%'}}/>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
        >
          <InputNumber disabled style={{width: '100%'}}/>
        </Form.Item>
        {/* <Form.Item
          label="Date & Time"
          name="date"
        >
          <DatePicker showTime style={{width: '100%'}}/>
        </Form.Item> */}
        <Form.Item
          label="Total"
          name="total"
        >
          <InputNumber value={amount} disabled style={{width: '100%'}}/>
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
      </>
  );
}
