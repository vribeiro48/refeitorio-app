import React, { useState, useEffect } from 'react';
import { Modal, Text, StyleSheet, Switch } from 'react-native';
import dishes from '../../dishes';
import { connect } from 'react-redux';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ViewMenus = (props) => {
    const navigation = useNavigation();

    const [showDishListModal, setShowDishListModal] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('');

    const menu = (menu) => {
        setShowDishListModal(true);
        setSelectedMenu(menu);
    }

    function backScreen(){
        navigation.navigate('Home');
    }
    const [newDishStatus, setNewDishStatus]  = useState(true);
    const [isEnabled, setIsEnabled]          = useState(false);

    useEffect(()=>{
        setNewDishStatus(isEnabled);
    },[isEnabled]);

    const menus = [
        {id: 18, date: '30/07/2021'},
        {id: 17, date: '29/07/2021'},
        {id: 16, date: '28/07/2021'},
        {id: 15, date: '27/07/2021'},
        {id: 14, date: '26/07/2021'},
        {id: 13, date: '25/07/2021'},
        {id: 12, date: '24/07/2021'},
        {id: 11, date: '23/07/2021'},
        {id: 10, date: '22/07/2021'},
        {id: 9, date: '21/07/2021'},
        {id: 8, date: '20/07/2021'},
        {id: 7, date: '19/07/2021'},
        {id: 6, date: '18/07/2021'},
        {id: 5, date: '17/07/2021'},
        {id: 4, date: '16/07/2021'},
        {id: 3, date: '15/07/2021'},
        {id: 2, date: '14/07/2021'},
        {id: 1, date: '13/07/2021'}
    ];

    let date        = new Date().getDate();
    let month       = new Date().getMonth()+1;
    let year        = new Date().getFullYear();

    if(month<10){
        month       = "0"+month;
    }

    let today       = date+"/"+month+"/"+year;
    let yesterday   = (date-1)+"/"+month+"/"+year;

    const updateDishStatus = (dish) => {
        alert(dish.name);
    }

    return(
        <D.Container>
            <D.Header>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={backScreen}/>
                <Text style={style({}).headerTitle}>Lista de Cardápios</Text>
            </D.Header>
            <D.Content
                data={menus}
                renderItem={({item: menus}) => (
                    <>
                        <D.Card onPress={()=>menu(menus)}>
                            <Text style={style({}).menuTitle}>Cardápio de</Text>
                            <Text style={style({}).menuDate}>
                                <>
                                { menus.date == today && 'Hoje' }
                                { menus.date == yesterday && 'Ontem' }
                                { menus.date != today && menus.date != yesterday && menus.date}
                                </>
                            </Text>
                        </D.Card>
                    </>
                )}
                keyExtractor={menus => String(menus.id)}
                showsVerticalScrollIndicator={false}
                numColumns={2}
            />

            <Modal animationType="slide" statusBarTranslucent={true} transparent={true} visible={showDishListModal}>
                <D.MainModal>
                    <D.ModalHeader>
                        <Text style={style({}).menuDishesTitle}>
                            Pratos do menu de hoje:
                        </Text>
                        <D.CloseModalButton onPress={()=>setShowDishListModal(false)}>
                            <MaterialCommunityIcons name="close" size={24} color="#FFFFFF"/>
                        </D.CloseModalButton>
                    </D.ModalHeader>
                    <D.DishList
                        data={dishes}
                        renderItem={({item: dishes}) => (
                            <D.DishContainer key={dishes.id}>
                                <D.Dish>
                                    <Text style={style({}).dishName}>
                                        {dishes.name}
                                    </Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#FF9900" }}
                                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={()=>setIsEnabled(!isEnabled)}
                                        value={dishes.status}
                                        onPress={()=>updateDishStatus(dishes)}
                                    />
                                </D.Dish>
                            </D.DishContainer>
                        )}
                        keyExtractor={dishes => String(dishes.id)}
                        showsVerticalScrollIndicator={false}
                    />
                </D.MainModal>
            </Modal>
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
    menuTitle: {
        fontFamily:'PoppinsBold',
        color: '#495057',
        fontSize: 16
    },
    menuDishesTitle: {
        fontFamily:'PoppinsBold',
        color: '#495057',
        fontSize: 18
    },
    menuDate:{
        fontFamily:'PoppinsMedium',
        color: '#AAAAAA',
        marginTop: -5
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
        lineHeight: 20
    },
    backToHomeText: {
        color: props.modalType === 'warning' ? '#333333' : '#FFFFFF',
        fontFamily:'PoppinsBold',
        textAlign:'center',
    },
    label: {
        width:'100%',
        fontSize:16,
        color: '#495057',
        marginBottom:10,
        fontFamily:'PoppinsMedium'
    },
    saveChangesButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily:'PoppinsBold',
    },
    toogleDishStatusText: {
        fontSize:16,
        color:'#AAAAAA',
        fontFamily:'PoppinsRegular'
    },
    dishName: {
        fontSize:16,
        marginLeft:5,
        color: '#AAAAAA',
        fontFamily:'PoppinsRegular'
    }
})