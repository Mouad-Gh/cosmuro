import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom'
import HeroSection from './containers/HeroSection2';
import Navbar from './components/Navbar';
import  ParticlesBg  from './components/ParticlesBg';
import HolderSection from './containers/HolderSection';
import { useAuthContext } from './hooks/useAuthContext';
import Snapshot from './containers/Snapshot';
import RaritySection from './containers/RaritySection';
import Footer from './components/Footer';
import NftSection from './containers/RaritySection/NftsCollectionSection';

function App() {
  const { wallet } = useAuthContext;

  return (
    <div className="App relative text-blanc h-full md:min-h-screen overflow-hidden w-full">
      <BrowserRouter>
      <ParticlesBg />
          <Navbar />
        <Routes>
          <Route path='/' element={<>
            <HeroSection />
            <Footer />
          </>} />
          <Route path='/holder' element={<HolderSection />}/>
          <Route path='/rarity' element={<RaritySection /> }/>
          <Route path='/collection/:db_name' element={<NftSection /> }/>
          <Route 
            path='/snapshot'
            element={ wallet? <Snapshot /> : <Navigate to="/" /> }
          />
        </Routes>
        
      </BrowserRouter>
    </div>
  )
}

export default App
