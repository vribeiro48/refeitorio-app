import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../service/api';

const ViewMenus = (props) => {
    const navigation = useNavigation();

    const [todayMenu, setTodayMenu] = useState([]);
    const [menu, setMenu] = useState('');
    const [loading, setLoading] = useState(false);

    const getMenuDishes = async () => {
        setLoading(true);
        const resultado = await api.getMenuDishes();
        setMenu(resultado);
        setTodayMenu(resultado.pratos);
        setLoading(false);
        
        if(resultado === ""){
            props.setDishes([]);
        }
        else{
            props.setMenu(resultado.id);
        }
    }

    useEffect(()=>{
        getMenuDishes();
    },[]);

    return(
        <D.Container>
            <D.Header>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={()=>navigation.goBack()}/>
                <Text style={style({}).headerTitle}>Cardápio de Hoje</Text>
                {menu === "" &&
                    <MaterialCommunityIcons name="plus-box" size={28} color="#333333" onPress={()=>navigation.navigate("AddMenu")}/>
                }
                {menu !== "" &&
                    <MaterialCommunityIcons name="square-edit-outline" size={28} color="#333333" onPress={()=>navigation.navigate("AddMenu")}/>
                }
            </D.Header>

            {loading &&
                <D.LoadingArea>
                    <ActivityIndicator size="large" color="#FF9900" />
                </D.LoadingArea>
            }
            {!loading && menu === "" &&
                <D.EmptyMenu>
                    <MaterialCommunityIcons name="information-outline" size={60} color="#AAAAAA" />
                    <Text style={style({}).EmptyMenuText}>Cardápio de hoje ainda não criado.</Text>
                </D.EmptyMenu>
            }
            {!loading && menu !== "" && todayMenu === undefined &&
                <D.EmptyMenu>
                    <MaterialCommunityIcons name="information-outline" size={60} color="#AAAAAA" />
                    <Text style={style({}).EmptyMenuText}>Não há pratos no cardápio de hoje.</Text>
                </D.EmptyMenu>
            }
            {!loading && menu !== "" && todayMenu !== undefined && todayMenu.length === 0 &&
                <D.EmptyMenu>
                    <MaterialCommunityIcons name="information-outline" size={60} color="#AAAAAA" />
                    <Text style={style({}).EmptyMenuText}>Não há pratos no cardápio de hoje.</Text>
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
    return{}
}

const mapDispatchToProps = (dispatch) => {
    return{
        setDishes:(dishes)=>dispatch({type: 'SET_DISHES', payload: {dishes}}),
        setMenu:(menu)=>dispatch({type: 'SET_MENU', payload: {menu}}),
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