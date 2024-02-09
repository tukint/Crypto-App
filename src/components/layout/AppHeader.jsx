import { Layout, Select, Space, Button, Modal, Drawer  } from "antd";
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../../context/appContext";
import { useCrypto } from "../../context/appContext";
import CoinInfoModal from "../CryptoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  with: "100%",
  textAlign: "center",
  height: "60",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  backgroundColor: '#001529',
  justifyContent: "space-between",
};

export default function AppHeader(props) {

  const { crypto } = useContext(CryptoContext);
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);




  const options = crypto.map((coin) => ({
    label: coin.name,
    value: coin.id,
    icon: coin.icon,
  }));

  const handleSelect = (value) => {
    setCoin(crypto.find((c) => c.id == value))
    setIsModalOpen(true);
  };

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect(!select);
      }
    };
    document.addEventListener("keypress", keypress);

    return () => document.removeEventListener("keypress", keypress);
  });

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: "24%",
        }}
        open={select}
        onClick={() => setSelect(!select)}
        onSelect={handleSelect}
        value='press "/" to open'
        optionLabelProp="label"
        options={options}
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
      <Button onClick={() => setDrawer(!drawer)}>Add Asset</Button>

      <Modal
        open={isModalOpen}
        onCancel={() =>  setIsModalOpen(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin}/>
      </Modal>

      <Drawer width={600} destroyOnClose={true} title="Add Asset" onClose={() => setDrawer(!drawer)} open={drawer}>
       <AddAssetForm onClose={() => setDrawer(!drawer)}/>
      </Drawer>
    </Layout.Header>
  );
}
