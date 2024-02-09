import { cryptoAssets, cryptoData } from './data'
import { useState, useCallback } from "react";

export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData)
    }, 500)
  })
}

export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 500)
  })
}


export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true)
        try {
            const responce = await fetch(url, { method, body, headers })
            if (!responce.ok) {
                throw new Error(`Error fetching data from ${url}. Status: ${responce.status}`);
            }
            const data = await responce.json();
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false);
            setError(e.message)
            throw e
        }

    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, error, request, clearError}
}