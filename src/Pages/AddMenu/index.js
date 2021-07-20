import React, { useState } from 'react';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function AddMenu(){
    const navigation = useNavigation();

    function backScreen(){
        navigation.navigate('Home');
    }

    const categories = [
        {
            title: 'Proteínas',
            id: 1
        },
        {
            title: 'Acompanhamentos',
            id: 2
        },
        {
            title: 'Saladas',
            id: 3
        },
        {
            title: 'Sobremesa',
            id: 4
        },
    ];

    const dishes = [
        {
            name: 'Frango Grelhado',
            id: 1,
            categoryId: 1
        },
        {
            name: 'Carne Seca',
            id: 2,
            categoryId: 1
        },
        {
            name: 'Peixe Empanado',
            id: 3,
            categoryId: 1
        },
        {
            name: 'Empadão de Frango',
            id: 4,
            categoryId: 1
        },
        {
            name: 'Arroz Branco',
            id: 5,
            categoryId: 2
        },
        {
            name: 'Farofa',
            id: 6,
            categoryId: 2
        },
        {
            name: 'Feijão Preto',
            id: 7,
            categoryId: 2
        },
        {
            name: 'Arroz Integral',
            id: 8,
            categoryId: 2
        },
    ];

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
                data={categories}
                renderItem={({item: categories}) => (
                    <D.ItemsCategories>
                        <D.Label>{categories.title}</D.Label>
                        {dishes.map((dish)=>(
                            dish.categoryId === categories.id &&
                            <D.DishName>
                                {dish.name}
                            </D.DishName>
                        ))}
                    </D.ItemsCategories>
                )}
                keyExtractor={categories => String(categories.id)}
                showsVerticalScrollIndicator={false}
            >
                
            </D.List>

            <D.SaveButton>
                <D.SaveButtonText>Divulgar o Cardápio</D.SaveButtonText>
            </D.SaveButton>
            
        </D.Container>
    )
}