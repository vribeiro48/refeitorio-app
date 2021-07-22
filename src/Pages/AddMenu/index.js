import React from 'react';
import { connect } from 'react-redux';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const AddMenu = (props) => {
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
            categoryId: 1,
            selected: null
        },
        {
            name: 'Carne Seca',
            id: 2,
            categoryId: 1,
            selected: null
        },
        {
            name: 'Peixe Empanado',
            id: 3,
            categoryId: 1,
            selected: null
        },
        {
            name: 'Empadão de Frango',
            id: 4,
            categoryId: 1,
            selected: null
        },
        {
            name: 'Arroz Branco',
            id: 5,
            categoryId: 2,
            selected: null
        },
        {
            name: 'Farofa',
            id: 6,
            categoryId: 2,
            selected: null
        },
        {
            name: 'Feijão Preto',
            id: 7,
            categoryId: 2,
            selected: null
        },
        {
            name: 'Arroz Integral',
            id: 8,
            categoryId: 2,
            selected: null
        },
        {
            name: 'Cenoura',
            id: 9,
            categoryId: 3,
            selected: null
        },
        {
            name: 'Beterraba',
            id: 10,
            categoryId: 3,
            selected: null
        },
        {
            name: 'Agrião',
            id: 11,
            categoryId: 3,
            selected: null
        },
        {
            name: 'Batata Doce',
            id: 12,
            categoryId: 3,
            selected: null
        },
    ];

    const toggleDishes = (id) => {
        let newDish = [...props.dishes];

        if(!props.dishes.includes(id)){
            newDish.push(id);
        }
        else{
            newDish = newDish.filter(items=>items!=id);
        }

        props.setDishes(newDish);
    }

    return(
        <D.Container>
            <D.Header>
                <AntDesign name="arrowleft" size={24} color="#333333" onPress={backScreen}/>
                <D.HeaderTitle>Montar Cardápio</D.HeaderTitle>
            </D.Header>

            <D.List
                data={categories}
                renderItem={({item: categories}) => (
                    <D.ItemsCategories>
                        <D.Label>{categories.title}</D.Label>
                        {dishes.map((dish, index)=>(
                            dish.categoryId === categories.id &&
                            <D.Dish key={index} onPress={()=>toggleDishes(dish.id)}>
                                {props.dishes.includes(dish.id)
                                ? <MaterialCommunityIcons name="checkbox-marked" size={24} color="#0D6EFD" />
                                : <MaterialCommunityIcons name="square-outline" size={24} color="#AAAAAA" />}
                                <D.DishName>{dish.name}</D.DishName>
                            </D.Dish>
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

const mapStateToProps = (state) => {
    return{
        dishes: state.userReducer.dishes
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setDishes:(dishes)=>dispatch(
            {
                type: 'SET_DISHES', 
                payload: {dishes}
            }
        )
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(AddMenu);