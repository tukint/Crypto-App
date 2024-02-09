import { Layout } from 'antd';
import AppHeader from './components/layout/AppHeader';
import AppSider from './components/layout/AppSider';
import AppContent from './components/layout/AppContent';
import { CryptoContextProvider } from './context/appContext';



const App = () => {



  return (
    <CryptoContextProvider>
      <Layout>
        <AppHeader />
      <Layout>
        <AppSider/>
        <AppContent/>
      </Layout>
    </Layout>
  </CryptoContextProvider>
  )
};

export default App;
