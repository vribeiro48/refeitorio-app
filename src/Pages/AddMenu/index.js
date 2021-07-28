import React, { useState, useEffect } from 'react';
import { Modal, Alert, Switch, Text, StyleSheet } from 'react-native';
import categories from '../../categories';
import dishes from '../../dishes';
import {Picker} from '@react-native-picker/picker';
import { connect } from 'react-redux';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AddMenu = (props) => {
    const navigation = useNavigation();

    const [showSuccessModal, setShowSuccessModal]   = useState(false);
    const [showWarningModal, setShowWarningModal]   = useState(false);
    const [showDangerModal, setShowDangerModal]     = useState(false);

    const [modalActions, setModalActions]           = useState(false);
    const [isEnabled, setIsEnabled]                 = useState(false);
    const [button, setButton]                       = useState('saveMenu');

    const [selectedDishName, setSelectedDishName]   = useState('');
    const [selectedDishCategory, setSelectedDishCategory]   = useState('');

    const [successMessage, setSuccessMessage]       = useState('Cardápio de hoje montado e disponível!');
    const [warningMessage, setWarningMessage]       = useState('Ao menos um prato precisa estar selecionado para criar um cardápio.');
    const [errorMessage, setErrorMessage]           = useState('Infelizmente não foi possível criar um cardápio. Tente novamente em alguns instantes.');

    const [newDishName, setNewDishName]             = useState('');
    const [newDishStatus, setNewDishStatus]         = useState(true);
    const [newDishCategory, setNewDishCategory]     = useState('');

    useEffect(()=>{
        setNewDishStatus(isEnabled);
    },[isEnabled]);
    

    function backScreen(){
        navigation.navigate('Home');
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

    const saveMenu = async () => {
        if(props.dishes != ''){
            setShowSuccessModal(true);
            props.setDishes([]);
        }else{
            setShowWarningModal(true);
        }
    }

    const alertDishDisabled = () => {
        Alert.alert(
        "Atenção!",
        "Prato desabilitado.",
        [
          { text: "Tudo bem" }
        ]
      );
    }

    const openModal = (dish) => {
        setSelectedDishName(dish.name);
        setNewDishName(dish.name);

        setSelectedDishCategory(dish.categoryId);
        setNewDishCategory(dish.categoryId);

        setIsEnabled(dish.status);
        setModalActions(true);
    }

    const updateDish = () => {
        if(newDishName === ''){
            setWarningMessage('O campo NOME DO PRATO é obrigatório.');
            setShowWarningModal(true);
        }
        else if(newDishCategory === ''){
            setWarningMessage('O campo CATEGORIA é obrigatório.');
            setShowWarningModal(true);
        }
        else{
            setSuccessMessage('Prato atualizado com sucesso!');
            setShowSuccessModal(true);
            setModalActions(false);
            setButton('saveDishUpdate');
            // alert(newDishName+" - "+newDishCategory+" - "+newDishStatus);
        }
    }

    return(
        <D.Container>
            <D.Header>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={backScreen}/>
                <Text style={style({}).headerTitle}>Montar Cardápio</Text>
            </D.Header>

            <D.List
                data={categories}
                renderItem={({item: categories}) => (
                    <>
                        <D.ItemsCategories>
                            <Text style={style({}).label}>{categories.title}</Text>
                                {dishes.map((dish, index)=>(
                                    dish.categoryId === categories.id &&
                                    <D.DishContainer key={index}>
                                        <D.Dish onPress={
                                            dish.status
                                            ? ()=>toggleDishes(dish.id)
                                            : ()=>alertDishDisabled()
                                        }>
                                            <>
                                            {props.dishes.includes(dish.id) && dish.status &&
                                                <MaterialCommunityIcons name="checkbox-marked" size={24} color="#0D6EFD" />                                     
                                            }
                                            {!props.dishes.includes(dish.id) && dish.status &&
                                                <MaterialCommunityIcons name="square-outline" size={24} color="#AAAAAA" />
                                            }
                                            {!props.dishes.includes(dish.id) && !dish.status &&
                                                <MaterialCommunityIcons name="close-box-outline" size={24} color="#F27474" />
                                            }
                                            </>
                                            <Text style={style({}).dishName}>{dish.name}</Text>
                                        </D.Dish>
                                        <D.DishButton onPress={()=>openModal(dish)}>
                                            <MaterialCommunityIcons name="dots-vertical" size={24} color="#AAAAAA" />
                                        </D.DishButton>
                                    </D.DishContainer>

                                ))}
                        </D.ItemsCategories>
                    </>
                )}
                keyExtractor={categories => String(categories.id)}
                showsVerticalScrollIndicator={false}
            />

            <D.SaveButton onPress={saveMenu}>
                <Text style={style({}).saveButtonText}>Salvar Cardápio</Text>
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

            <Modal animationType="slide" statusBarTranslucent={true} transparent={true} visible={modalActions}>
                <D.ActionsMain>
                    <D.ModalActionsContainer>
                        <D.CloseModalButton onPress={()=>setModalActions(false)}>
                            <MaterialCommunityIcons name="close" size={24} color="#FFFFFF"/>
                        </D.CloseModalButton>
                        <D.ToogleDishStatus>
                            <Text style={style({}).toogleDishStatusText}>
                                {isEnabled ? 'Desabilitar' : 'Habilitar'} {selectedDishName}.
                            </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#FF9900" }}
                                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>setIsEnabled(!isEnabled)}
                                value={isEnabled}
                            />
                        </D.ToogleDishStatus>
                        <Text style={style({}).label}>Alterar o Nome do Prato</Text>
                        <D.Input
                            placeholder={selectedDishName}
                            placeholderTextColor="#C4C4C4"
                            value={newDishName}
                            onChangeText={t=>setNewDishName(t)}
                        />
                        <Text style={style({}).label}>Alterar Categoria</Text>
                        <D.Select>
                            <Picker
                                selectedValue={selectedDishCategory}
                                onValueChange={(itemValue) => setNewDishCategory(itemValue)}
                            >
                                <Picker.Item label="Selecione uma categoria..." value="" enabled={false} style={{color:'#C4C4C4'}} />
                                {categories.map((category, index)=>(
                                    <Picker.Item 
                                        label={category.title}
                                        value={category.id}
                                        style={{color:'#495057'}}
                                        key={index}
                                    />
                                ))}
                            </Picker>
                        </D.Select>
                        <D.SaveChangesButton onPress={()=>updateDish()}>
                            <Text style={style({}).saveChangesButtonText}>Salvar Alterações</Text>
                        </D.SaveChangesButton>
                    </D.ModalActionsContainer>
                </D.ActionsMain>
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

export default connect (mapStateToProps, mapDispatchToProps)(AddMenu);

const style = (props) => StyleSheet.create({
    headerTitle: {
        flex: 1,
        textAlign:'center',
        fontSize:18,
        fontFamily:'PoppinsBold',
        color: '#333333'
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