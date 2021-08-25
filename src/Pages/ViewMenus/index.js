import React, { useState, useEffect } from 'react';
import { Modal, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../service/api';

const ViewMenus = (props) => {
    const navigation = useNavigation();

    const [showSuccessModal, setShowSuccessModal]   = useState(false);
    const [showWarningModal, setShowWarningModal]   = useState(false);
    const [showDangerModal, setShowDangerModal]     = useState(false);

    const [successMessage, setSuccessMessage]       = useState('Cardápio de hoje montado e disponível!');
    const [warningMessage, setWarningMessage]       = useState('Ao menos um prato precisa estar selecionado para ser retirado do cardápio.');
    const [errorMessage, setErrorMessage]           = useState('Infelizmente não foi possível excluir o(s) prato(s) do cardápio. Tente novamente em alguns instantes.');

    const [button, setButton]                       = useState('saveMenu');

    function backScreen(){
        navigation.navigate('Home');
        props.setDishes([]);
    }

    const modaltypes = [
        {
            show: showSuccessModal,
            title: 'Parabéns',
            type: 'success',
            iconName: 'check',
            message: successMessage
        },
        {
            show: showWarningModal,
            title: 'Aviso',
            type: 'warning',
            iconName: 'check',
            message: warningMessage
        },
        {
            show: showDangerModal,
            title: 'Erro',
            type: 'danger',
            iconName: 'close',
            message: errorMessage
        },
    ];

    const [todayMenu, setTodayMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [menuId, setMenuId] = useState('');

    const getMenuDishes = async () => {
        setLoading(true);
        const resultado = await api.getMenuDishes();
        setMenuId(resultado.id);
        setTodayMenu(resultado.pratos);
        setLoading(false);
    }

    useEffect(()=>{
        getMenuDishes();
    },[]);

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

    const deleteDishes = async () => {
        if(props.dishes.length === 0){
            setShowWarningModal(true);
        }else{
            const resultado = await api.deleteDishes(props.dishes, menuId);
            if(!resultado.error){
                setSuccessMessage("Prato excluído do cardápio de hoje.")
                setShowSuccessModal(true);
                props.setDishes([]);
            }
            else{
                setShowWarningModal(true);
                setWarningMessage(resultado.error);
            }
        }
    }

    return(
        <D.Container>
            <D.Header>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={backScreen}/>
                <Text style={style({}).headerTitle}>Cardápio de Hoje</Text>
            </D.Header>

            {loading &&
                <D.LoadingArea>
                    <ActivityIndicator size="large" color="#FF9900" />
                </D.LoadingArea>
            }
            {!loading &&            
                <D.List
                    data={todayMenu}
                    renderItem={({item: todayMenu}) => (
                        <>
                        <D.ItemsCategories>
                            <D.DishContainer>
                                <D.Dish onPress={
                                    todayMenu.status
                                    ? ()=>toggleDishes(todayMenu.id)
                                    : ()=>alertDishDisabled()
                                }>
                                    <>
                                    {props.dishes.includes(todayMenu.id) && todayMenu.status &&
                                        <MaterialCommunityIcons name="checkbox-marked" size={24} color="#0D6EFD" />
                                    }
                                    {!props.dishes.includes(todayMenu.id) && todayMenu.status &&
                                        <MaterialCommunityIcons name="square-outline" size={24} color="#AAAAAA" />
                                    }
                                    </>
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
            <D.SaveButton onPress={deleteDishes}>
                <Text style={style({}).saveButtonText}>Excluir Prato(s) do Cardápio</Text>
            </D.SaveButton>

            {modaltypes.map((item, index)=>(
                <Modal key={index} animationType="slide" transparent={true} statusBarTranslucent={true} visible={item.show}>
                    <D.ModalContainer>
                        <Text style={style({}).modalTitle}>{item.title}!</Text>
                        <D.CircleOpacity modalType={item.type}>
                            <D.Circle modalType={item.type}>
                                <MaterialCommunityIcons name={item.iconName} size={60} color={item.type === 'warning' ? "#333333" : "#FFFFFF"} />
                            </D.Circle>
                        </D.CircleOpacity>

                        <Text style={style({modalType: item.type}).message}>{item.message}</Text>
                        
                        {item.type === 'success' &&
                            <>
                            {button === 'saveDishUpdate' &&
                            <D.TwoButton>
                                <D.BackToHome
                                    modalType={item.type}
                                    onPress={()=>setShowSuccessModal(false)}
                                >
                                    <Text style={style({modalType: item.type}).backToHomeText}>
                                        Montar um Cardápio
                                    </Text>
                                </D.BackToHome>
                                <D.BackToHome
                                    modalType={item.type}
                                    style={{backgroundColor:'#AAAAAA'}}
                                    onPress={()=>navigation.navigate('Home')}
                                >
                                    <Text style={style({modalType: item.type}).backToHomeText}>
                                        Voltar para a Tela Inicial
                                    </Text>
                                </D.BackToHome>
                            </D.TwoButton>}
                            {button === 'saveMenu' &&
                                <D.BackToHome
                                    modalType={item.type}
                                    button={'saveMenu'}
                                    onPress={()=>navigation.navigate('Home')}
                                >
                                    <Text style={style({modalType: item.type}).backToHomeText}>
                                        Voltar para a Tela Inicial
                                    </Text>
                                </D.BackToHome>
                            }
                            </>
                        }
                        {item.type === 'warning' &&
                            <D.BackToHome 
                                modalType={item.type}
                                onPress={()=>setShowWarningModal(false)}
                            >
                                <Text style={style({modalType: item.type}).backToHomeText}>
                                    Corrigir
                                </Text>
                            </D.BackToHome>
                        }
                        {item.type === 'danger' &&
                            <D.BackToHome modalType={item.type}>
                                <Text
                                    style={style({modalType: item.type}).backToHomeText}
                                    onPress={()=>navigation.navigate('Home')}
                                >
                                    Voltar para a Tela Inicial
                                </Text>
                            </D.BackToHome>
                        }
                    </D.ModalContainer>
                </Modal>
            ))}
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
})