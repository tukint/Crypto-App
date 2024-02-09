import {  createContext, useEffect, useState } from 'react';
import { fakeFetchCrypto, fetchAssets, useHttp } from '../api';
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
const {loading, request, error, clearError} = useHttp();

useEffect(()=> {
  async function preLoad(){
    const {result} =  await getAllCoins()
    const assets = await fetchAssets()
    setCrypto(result)
    console.log(crypto);
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
  console.log(crypto);
}, [])


const getAllCoins = async () => {
  console.log('this is start of api ');
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
    console.log('this is api ', res.result);
    return res;
  } catch (error) {
    console.error('Failed to fetch coins:', error);
  }
};




const updateAssets = (newAsset, result=crypto) => { // Assuming newAsset is a single item now
  function prepareAsset(newAsset) {
    // Wrap newAsset in an array so .map can be used
    return [newAsset].map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      if (!coin) return null; // Handle case where coin is not found
      return {
        ...asset,
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: (asset.amount * coin.price) - (asset.amount * asset.price),
      };
    }).filter(asset => asset !== null); // Filter out any null values if a coin wasn't found
  }

  // Assuming `assets` is your current state and `setAssets` is the setter
  setAssets(prevAssets => [...prevAssets, ...prepareAsset(newAsset)]);
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