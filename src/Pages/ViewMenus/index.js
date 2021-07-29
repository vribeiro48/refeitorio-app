import React, { useState } from 'react';
import { Text, StyleSheet, Modal } from 'react-native';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ViewMenus (props) {
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

    const menus = [
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

    return(
        <D.Container>
            <D.Header>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={backScreen}/>
                <Text style={style.headerTitle}>Lista de Cardápios</Text>
            </D.Header>
            <D.Content
                data={menus}
                renderItem={({item: menus}) => (
                    <>
                        <D.Card onPress={()=>menu(menus)}>
                            <Text style={style.menuTitle}>Cardápio de</Text>
                            <Text style={style.menuDate}>
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
                        <D.CloseModalButton onPress={()=>setShowDishListModal(false)}>
                            <MaterialCommunityIcons name="close" size={24} color="#FFFFFF"/>
                        </D.CloseModalButton>
                    </D.ModalHeader>
                </D.MainModal>
            </Modal>
        </D.Container>
    )
}

const style = StyleSheet.create({
    headerTitle: {
        flex: 1,
        textAlign:'center',
        fontSize:18,
        fontFamily:'PoppinsBold',
        color: '#333333'
    },
    menuTitle: {
        fontSize:18,
        fontFamily:'PoppinsBold',
        color: '#495057'
    },
    menuDate: {
        fontFamily:'PoppinsMedium',
        color: '#AAAAAA',
        marginTop: -5
    },
})