import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import S from './style';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'; 

const fetchFont = () => {
    return Font.loadAsync({
        "PoppinsBold":require('../../../assets/fonts/Poppins-Bold.ttf'),
        "PoppinsMedium":require('../../../assets/fonts/Poppins-Medium.ttf'),
        "PoppinsRegular":require('../../../assets/fonts/Poppins-Regular.ttf'),
    })
}

export default function Home(){
    const navigation = useNavigation();

    const [fontsLoaded, setFontsLoaded] = useState(false);

    if(!fontsLoaded){
        return <AppLoading
            startAsync={fetchFont}
            onFinish={()=>setFontsLoaded(true)}
            onError={()=>console.log("ERRO")}
        />
    }
      
    return(
        <S.Container>
            <StatusBar style="auto" />
            <Text style={style.title}>Refeitório</Text>
            <S.Card>
                <S.Description>
                    <Text style={style.descriptionTop}>Cadastrar</Text>
                    <Text style={style.descriptionBottom}>Categoria</Text>
                </S.Description>
                <S.Button onPress={()=>{navigation.navigate('AddCategory')}}>
                    <AntDesign name="right" size={24} color="#FFFFFF" />
                </S.Button>
            </S.Card>
            <S.Card>
                <S.Description>
                    <Text style={style.descriptionTop}>Adicionar</Text>
                    <Text style={style.descriptionBottom}>Prato</Text>
                </S.Description>
                <S.Button onPress={()=>{navigation.navigate('AddDish')}}>
                    <AntDesign name="right" size={24} color="#FFFFFF" />
                </S.Button>
            </S.Card>
            <S.Card>
                <S.Description>
                    <Text style={style.descriptionTop}>Montar</Text>
                    <Text style={style.descriptionBottom}>Cardápio</Text>
                </S.Description>
                <S.Button onPress={()=>{navigation.navigate('AddMenu')}}>
                    <AntDesign name="right" size={24} color="#FFFFFF" />
                </S.Button>
            </S.Card>
            <S.Card>
                <S.Description>
                    <Text style={style.descriptionTop}>Visualizar</Text>
                    <Text style={style.descriptionBottom}>Cardápios</Text>
                </S.Description>
                <S.Button onPress={()=>{navigation.navigate('ViewMenus')}}>
                    <AntDesign name="right" size={24} color="#FFFFFF" />
                </S.Button>
            </S.Card>
        </S.Container>
    )
}

const style = StyleSheet.create({
    title: {
        fontSize:36,
        color: '#FFFFFF',
        marginBottom:30,
        textTransform:'uppercase',
        fontFamily:'PoppinsBold',
    },
    descriptionTop:{
        fontSize:18,
        color:'#C4C4C4',
        textTransform:'uppercase',
        fontFamily:'PoppinsRegular',
    },
    descriptionBottom:{
        fontSize:18,
        color:'#FF9900',
        textTransform:'uppercase',
        fontFamily:'PoppinsBold',
        marginTop:-10,
    }
})