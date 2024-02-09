import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";
import { useContext } from "react";
import CryptoContext from "../../context/appContext";

const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: '#001529',
  padding: "1rem",
};

export default function AppSider(props) {
  const {loading, assets} = useContext(CryptoContext)


  if(loading) {
    return (<Spin fullscreen="true" /> )
  }


  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => {
        return (
          <Card key={asset.id} style={{ marginBottom: "1rem" }}>
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              bordered={false}
              dataSource={[
                {
                  title: "Total Profit",
                  value: asset.totalProfit,
                  withTag: true,
                },
                { title: "Asset Amount", value: asset.amount, isPlain: true },
                // {title: 'Difference', value: asset.growPercent},
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  {item.withTag ? (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  ) : null}
                  {item.isPlain ? (
                    <span>{item.value}</span>
                  ) : (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </List.Item>
              )}
            />
          </Card>
        );
      })}
    </Layout.Sider>
  );
}



