import React, {useState} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/store';
import Routes from './src/routes';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'; 

const fetchFont = () => {
    return Font.loadAsync({
        "PoppinsBold":require('./assets/fonts/Poppins-Bold.ttf'),
        "PoppinsMedium":require('./assets/fonts/Poppins-Medium.ttf'),
        "PoppinsRegular":require('./assets/fonts/Poppins-Regular.ttf'),
    })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(!fontsLoaded){
      return <AppLoading
          startAsync={fetchFont}
          onFinish={()=>setFontsLoaded(true)}
          onError={()=>console.log("ERRO")}
      />
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes/>
      </PersistGate>
    </Provider>
  );
}