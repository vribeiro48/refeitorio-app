import React, {useState} from "react";
import { Modal, Text, StyleSheet, Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';
import C from './style';

const {width} = Dimensions.get('window');

const SelectCategoryButton = ({opcoes, onChangeSelect, text, categoryName = null, buttonSpace}) => {
  const [texto, setTexto] = useState(text);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState(categoryName);

  const renderOptions = (item) => {
    return(
      <C.ClickCategory onPress={()=>{
        onChangeSelect(item.id)
        setTexto(item.nome)
        setCategory(item.nome)
        setShowModal(false)
      }}>
        <C.ModalCategory>{item.nome}</C.ModalCategory>
      </C.ClickCategory>
    )
  }

  return(<>
    <C.SelectContainer onPress={()=>setShowModal(true)}>
      <Text style={styles({buttonSpace}).Category} numberOfLines={1}>
        {categoryName === null ? texto : category}
      </Text>
      <Feather name="chevron-down" size={20} color="#AAAAAA" />
    </C.SelectContainer>
    <Modal 
      visible={showModal}
      animationType="slide" 
      onRequestClose={()=>setShowModal(false)}
    >
    <C.ModalHeader>
      <C.ModalHeaderTitle>{text}</C.ModalHeaderTitle>
      <C.IconBackground onPress={()=>setShowModal(false)}>
        <Feather name="x" size={20} color="#FFFFFF" />
        <C.Cancel>Cancelar</C.Cancel>
      </C.IconBackground>
    </C.ModalHeader>
    <C.Lista
      data={opcoes}
      keyExtractor={item=>String(item.id)}
      renderItem={({item})=>renderOptions(item)}
    />
    </Modal>
  </>)
}

const styles = (props) => StyleSheet.create({
  Category: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    color: props.buttonSpace === 200 ? '#495057' : '#AAAAAA',
    width: width - props.buttonSpace,
  }
});

export default SelectCategoryButton;