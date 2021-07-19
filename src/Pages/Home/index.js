import React from 'react';
import S from './style';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Home(){
    const navigation = useNavigation();

    function goToAddDish(){
        navigation.navigate('AddDish');
    }
    return(
        <S.Container>
            <S.Title>Refeitório</S.Title>
            <S.Card>
                <S.Description>
                    <S.DescriptionTop>Adicionar</S.DescriptionTop>
                    <S.DescriptionBottom>Prato</S.DescriptionBottom>
                </S.Description>
                <S.Button onPress={goToAddDish}>
                    <AntDesign name="right" size={24} color="#FFFFFF" />
                </S.Button>
            </S.Card>
            <S.Card>
                <S.Description>
                    <S.DescriptionTop>Montar</S.DescriptionTop>
                    <S.DescriptionBottom>Cardápio</S.DescriptionBottom>
                </S.Description>
                <S.Button onPress={()=>{navigation.navigate('AddMenu')}}>
                    <AntDesign name="right" size={24} color="#FFFFFF" />
                </S.Button>
            </S.Card>
        </S.Container>
    )
}