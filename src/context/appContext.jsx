import {  createContext, useEffect, useState } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../api';
import { percentDifference } from '../utils';
import { useContext } from 'react';


const CryptoContext = createContext({
    loading: false,
    crypto: [],
    assets:[]
})

export function CryptoContextProvider ({children}) {

const [loading, setLoading] = useState(false)
const [crypto, setCrypto] = useState([])
const [assets, setAssets] = useState([])

useEffect(()=> {
  async function preLoad(){
    setLoading(true)
    const {result} =  await fakeFetchCrypto()
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
    setLoading(false)
  }
  preLoad()
}, [])

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