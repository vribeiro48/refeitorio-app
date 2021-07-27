import React, { useState } from 'react';
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

    const [selectedDishName, setSelectedDishName]   = useState('');
    const [selectedDishCategory, setSelectedDishCategory]   = useState('');

    const [errorMessage, setErrorMessage]           = useState('Infelizmente não foi possível criar um cardápio. Tente novamente em alguns instantes.');

    const [newDishName, setNewDishName]             = useState('');
    const [newDishStatus, setNewDishStatus]         = useState(true);
    const [newDishCategory, setNewDishCategory]     = useState('');

    function backScreen(){
        navigation.navigate('Home');
    }

    const modaltypes = [
        {
            show: showSuccessModal,
            title: 'Parabéns',
            type: 'success',
            iconName: 'check',
            message: 'Cardápio de hoje montado e disponível!'
        },
        {
            show: showWarningModal,
            title: 'Aviso',
            type: 'warning',
            iconName: 'check',
            message: 'Ao menos um prato precisa estar selecionado para criar um cardápio.'
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
        setIsEnabled(dish.status);
        setSelectedDishCategory(dish.categoryId);
        setModalActions(true);
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
                            <D.Label>{categories.title}</D.Label>
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
                                            <D.DishName>{dish.name}</D.DishName>
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
                <D.SaveButtonText>Salvar Cardápio</D.SaveButtonText>
            </D.SaveButton>

            {modaltypes.map((item, index)=>(
                <Modal key={index} animationType="slide" transparent={true} statusBarTranslucent={true} visible={item.show}>
                    <D.ModalContainer>
                        <D.ModalTitle>{item.title}!</D.ModalTitle>
                        <D.CircleOpacity modalType={item.type}>
                            <D.Circle modalType={item.type}>
                                <MaterialCommunityIcons name={item.iconName} size={60} color={item.type === 'warning' ? "#333333" : "#FFFFFF"} />
                            </D.Circle>
                        </D.CircleOpacity>
                        <D.Message modalType={item.type}>{item.message}</D.Message>
                        <D.BackToHome modalType={item.type} 
                            onPress={item.type === 'warning' 
                                ? ()=>setShowWarningModal(false) 
                                : backScreen
                            }>
                            <D.BackToHomeText modalType={item.type}>
                                {item.type === 'warning' ? "Corrigir" : "Voltar para a Tela Inicial"}
                            </D.BackToHomeText>
                        </D.BackToHome>
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
                            <D.ToogleDishStatusText>
                                {isEnabled ? 'Desabilitar' : 'Habilitar'} {selectedDishName}.
                            </D.ToogleDishStatusText>
                            <Switch
                                trackColor={{ false: "#767577", true: "#FF9900" }}
                                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>setIsEnabled(!isEnabled)}
                                value={isEnabled}
                            />
                        </D.ToogleDishStatus>
                        <D.Label>Alterar o Nome do Prato</D.Label>
                        <D.Input
                            placeholder={selectedDishName}
                            placeholderTextColor="#C4C4C4"
                            value={newDishName}
                            onChangeText={t=>setNewDishName(t)}
                        />
                        <D.Label>Alterar Categoria</D.Label>
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
                        <D.SaveChangesButton>
                            <D.SaveChangesButtonText>Salvar Alterações</D.SaveChangesButtonText>
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
})