import { useRef, useState } from "react";
import {
  Select,
  Space,
  Divider,
  Form,
  Button,
  InputNumber,
  Result
} from "antd";
import { useCrypto } from "../context/appContext";
import { useForm } from "antd/es/form/Form";
import CoinInfo from "./CoinInfo";




export default function AddAssetForm({onClose}) {

  const [form] =  Form.useForm() 
  const [coin, setCoin] = useState(null);
  const { crypto, updateAssets } = useCrypto();
  const [amount, setAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false)
  const assetRef = useRef()

if (submitted) {
    return (
        <Result
    status="success"
    title="New Asset Successfully Added"
    subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
    extra={[
      <Button type="primary" key="console" onClick={onClose}>
        Close
      </Button>,
    ]}
  /> 
    )
}



  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      price: values.price,
      amount: values.amount,
      date:  Date.now()
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    updateAssets(newAsset)
  }

  const handleAmountChange = (value) => {
    form.setFieldsValue({
        total: +(value * coin.price).toFixed(2)
    })
  }

  if (!coin)
    return (
      <Select
      style={{width: '100%'}}
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
