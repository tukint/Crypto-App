import { Flex, Tag, Typography, Divider } from "antd";
import CoinInfo from "./CoinInfo";

export default function CoinInfoModal({ coin }) {
  return (
    <>
     <CoinInfo coin={coin} withSymbol/>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong> 1 Hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
            {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong> 1 Day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
            {coin.priceChange1d}%
        </Tag>
        <Typography.Text strong> 1 Week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
            {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
      <Typography.Text strong>Price: {coin.price.toFixed(3)} </Typography.Text>
      
      </Typography.Paragraph>
      <Typography.Paragraph>
      <Typography.Text strong>MarketCap: {coin.marketCap} </Typography.Text>
      
      </Typography.Paragraph>

    </>
  );
}
