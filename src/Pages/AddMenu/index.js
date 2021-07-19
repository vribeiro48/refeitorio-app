import React, { useState } from 'react';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function AddMenu(){
    const navigation = useNavigation();

    function backScreen(){
        navigation.navigate('Home');
    }

    return(
        <D.Container>
            <D.Header>
                <AntDesign
                    name="arrowleft"
                    size={24}
                    color="#333333"
                    onPress={backScreen}
                />
                <D.HeaderTitle>Montar Cardápio</D.HeaderTitle>
            </D.Header>

            <D.List
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]}
                renderItem={() => (
                    <D.Label>Nome da Categoria</D.Label>
                )}
                keyExtractor={item => String(item)}
                showsVerticalScrollIndicator={false}
            >
                
            </D.List>

            <D.SaveButton>
                <D.SaveButtonText>Divulgar o Cardápio</D.SaveButtonText>
            </D.SaveButton>
            
        </D.Container>
    )
}