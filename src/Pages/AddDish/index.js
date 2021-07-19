import React, { useState } from 'react';
import D from './style';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function AddDish(){
    const navigation = useNavigation();

    function backScreen(){
        navigation.navigate('Home');
    }

    const [dishName, setDishName] = useState('');
    const [dishCategory, setDishCategory] = useState('');

    return(
        <D.Container>
            <D.Header>
                <AntDesign
                    name="arrowleft"
                    size={24}
                    color="#333333"
                    onPress={backScreen}
                />
                <D.HeaderTitle>Adicionar Prato</D.HeaderTitle>
            </D.Header>
            <D.Label>Nome do Prato</D.Label>
            <D.Input
                placeholder="Ex.: Bisteca Grelhada"
                placeholderTextColor="#C4C4C4"
                value={dishName}
                onChangeText={t=>setDishName(t)}
            />
            <D.Label>Categoria</D.Label>
            <D.Select>
                <Picker
                    selectedValue={dishCategory}
                    onValueChange={(itemValue) => setDishCategory(itemValue)}
                >
                    <Picker.Item label="Selecione uma categoria..." value="" enabled={false} style={{color:'#C4C4C4'}} />
                    <Picker.Item label="Proteína" value={1} style={{color:'#495057'}} />
                    <Picker.Item label="Acompanhamento" value={2} style={{color:'#495057'}} />
                    <Picker.Item label="Salada" value={3} style={{color:'#495057'}} />
                    <Picker.Item label="Sobremesa" value={4} style={{color:'#495057'}} />
                </Picker>
            </D.Select>

            <D.SaveButton>
                <D.SaveButtonText>Adicionar</D.SaveButtonText>
            </D.SaveButton>
            
        </D.Container>
    )
}