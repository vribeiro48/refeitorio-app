import React, { useState, useEffect } from 'react';
import { Modal, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../service/api';

const ViewMenus = (props) => {
    const navigation = useNavigation();

    function backScreen(){
        navigation.navigate('Home');
        props.setDishes([]);
    }

    const [todayMenu, setTodayMenu] = useState([]);
    const [loading, setLoading] = useState(false);

    const getMenuDishes = async () => {
        setLoading(true);
        const resultado = await api.getMenuDishes();
        setTodayMenu(resultado.pratos);
        setLoading(false);
    }

    useEffect(()=>{
        getMenuDishes();
    },[]);

    return(
        <D.Container>
            <D.Header>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={backScreen}/>
                <Text style={style({}).headerTitle}>Cardápio de Hoje</Text>
                <MaterialCommunityIcons name="plus-box" size={28} color="#333333" onPress={()=>navigation.navigate("AddMenu")}/>
            </D.Header>

            {loading &&
                <D.LoadingArea>
                    <ActivityIndicator size="large" color="#FF9900" />
                </D.LoadingArea>
            }
            {!loading && todayMenu === undefined &&
                <D.EmptyMenu>
                    <MaterialCommunityIcons name="information-outline" size={60} color="#AAAAAA" />
                    <Text style={style({}).EmptyMenuText}>Ainda não há pratos no cardápio de hoje.</Text>
                </D.EmptyMenu>
            }
            {!loading && todayMenu !== undefined &&
                <D.List
                    data={todayMenu}
                    renderItem={({item: todayMenu}) => (
                        <>
                        <D.ItemsCategories>
                            <D.DishContainer>
                                <D.Dish>
                                    <Text style={style({}).dishName}>{todayMenu.nome}</Text>
                                </D.Dish>
                            </D.DishContainer>
                        </D.ItemsCategories>
                        </>
                    )}
                    keyExtractor={todayMenu => String(todayMenu.id)}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={getMenuDishes}
                />
            }
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

export default connect (mapStateToProps, mapDispatchToProps)(ViewMenus);

const style = (props) => StyleSheet.create({
    headerTitle: {
        flex: 1,
        textAlign:'center',
        fontSize:18,
        fontFamily:'PoppinsBold',
        color: '#333333'
    },
    dishName:{
        fontSize:16,
        fontFamily:'PoppinsRegular',
        color: '#AAAAAA',
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveButtonText: {
        fontFamily:'PoppinsBold',
        color: '#FFFFFF',
        fontSize: 16
    },
    modalTitle: {
        fontFamily:'PoppinsBold',
        fontSize: 28,
        color: '#495057'
    },
    message: {
        fontFamily:'PoppinsMedium',
        width: props.modalType === 'success' ? '60%' : '100%',
        textAlign:'center',
        fontSize:18,
        color: '#AAAAAA',
    },
    backToHomeText: {
        color: props.modalType === 'warning' ? '#333333' : '#FFFFFF',
        fontFamily:'PoppinsBold',
        textAlign:'center',
    },
    EmptyMenuText: {
        width: '70%',
        fontFamily:'PoppinsMedium',
        textAlign:'center',
        fontSize:18,
        color: '#AAAAAA',
    },
})