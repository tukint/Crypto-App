import {  createContext, useEffect, useState } from 'react';
import { fetchAssets, useHttp } from '../api';
import { percentDifference } from '../utils';
import { useContext } from 'react';


const CryptoContext = createContext({
    loading: false,
    crypto: [],
    assets:[]
})

export function CryptoContextProvider ({children}) {

const [crypto, setCrypto] = useState([])
const [assets, setAssets] = useState([])
const {loading, request} = useHttp();

useEffect(()=> {
  async function preLoad(){
    const {result} =  await getAllCoins()
    const assets = await fetchAssets()
    setCrypto(result)
    setAssets(assets.map((asset) => {
      const coin = result.find((c) => c.id == asset.id)
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price , coin.price),
        totalAmount: asset.amount * coin.price, 
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        ...asset,
      }
    }))
  }
  preLoad()
}, [])


const getAllCoins = async () => {
  try {
    const res = await request(
      'https://openapiv1.coinstats.app/coins',
      'GET',
      null,
      {
        'X-API-KEY': 'tMODKN8BMDKLCQk4Hk+o8048tUSaeHXiwLEVYUgAWts=',
        'Accept': 'application/json'
      }
    );
    return res;
  } catch (error) {
    console.error('Failed to fetch coins:', error);
  }
};




const updateAssets = (newAsset, result=crypto) => { 
  function prepareAsset(newAsset) {
 
    return [newAsset].map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      if (!coin) return null; 
      return {
        ...asset,
        grow: asset.price < coin.price,
        growPercent: 0,
        totalAmount: asset.amount * coin.price,
        totalProfit: (asset.amount * coin.price) - (asset.amount * asset.price),
      };
    }).filter(asset => asset !== null);
  }
  const coin = result.find((c) => c.id === newAsset.id);
  const existingAssetIndex = assets.findIndex(
    (asset) => asset.id === newAsset.id
  );
  if (existingAssetIndex !== -1) {
    // Update existing asset
    const updatedCryptoAssets = [...assets]; // Create a copy
    updatedCryptoAssets[existingAssetIndex].amount += newAsset.amount;
    updatedCryptoAssets[existingAssetIndex].totalAmount += (newAsset.amount * coin.price);
    updatedCryptoAssets[existingAssetIndex].growPercent = 0;
    setAssets(updatedCryptoAssets);
  } else {
    setAssets(prevAssets => [...prevAssets, ...prepareAsset(newAsset)]);
  }
}



return (
    <CryptoContext.Provider value={{ loading, assets,crypto, updateAssets }}>
        {children}
    </CryptoContext.Provider>
)
}

export default CryptoContext

export function useCrypto(){
  return useContext(CryptoContext)
}