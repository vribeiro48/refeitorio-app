import React, { useState, useEffect } from 'react';
import { Modal, Text, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../service/api';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ListCategory(){
    const navigation = useNavigation();

    const [categoryList, setCategoryList] = useState([]);
    const [modalCategory, setModalCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const [optionsModal, setOptionsModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [newCategoryName, setNewCategoryName] = useState(modalCategory.name);

    const getCategories = async () => {
      setLoading(true);
      const request = await api.getCategoriesList();
      setCategoryList(request);
      setLoading(false);
    }

    useEffect(()=>{
        getCategories();
    },[]);

    const options = (name, id) => {
      setModalCategory({name, id});
      setOptionsModal(true);
    }

    const actionDeleteModal = () => {
      setOptionsModal(false);
      setDeleteModal(true);
    }

    const actionEditModal = () => {
      setOptionsModal(false);
      setEditModal(true);
    }

    const deleteCategory = async (id) => {
      const resultado = await api.deleteCategory(id);
      if(!resultado.error){
        setDeleteModal(false);
        getCategories();
        alert("Categoria Excluída");
      }
      else{
        alert(resultado.error);
      }
    }

    const updateCategory = async (id) => {
      const resultado = await api.updateCategory(newCategoryName, id);
      if(!resultado.error){
        setEditModal(false);
        getCategories();
        alert("Categoria Alterada");
      }
      else{
        alert(resultado.error);
      }
    }

    return(
      <D.Container>
        <D.Header>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={()=>navigation.goBack()}/>
          <Text style={style({}).headerTitle}>Lista de Categorias</Text>
          <MaterialCommunityIcons name="plus-box" size={28} color="#333333" onPress={()=>navigation.navigate("AddCategory")}/>
        </D.Header>

        {loading &&
          <D.LoadingArea>
            <ActivityIndicator size="large" color="#FF9900" />
          </D.LoadingArea>
        }
        {!loading &&
          <D.List
          data={categoryList}
          renderItem={({item: category}) => (
            <D.Category>
              <Text style={style({}).categoryName}>{category.nome}</Text>
              
              <D.DishButton onPress={()=>options(category.nome, category.id)}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="#AAAAAA" />
              </D.DishButton>
            </D.Category>
          )}
          keyExtractor={category => String(category.id)}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={getCategories}
          />
        }
        <Modal 
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={optionsModal}>
            <D.ModalContainer>
              <D.ModalContent>
                <D.ModalHeader>
                  <D.Close onPress={()=>setOptionsModal(false)}>
                    <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                  </D.Close>
                </D.ModalHeader>
                <Text style={style({}).modalTitle}>O que deseja fazer com a categoria: <Text style={style({}).modalTitleCategoryName}>{modalCategory.name}</Text>?
                </Text>
                <D.Actions>
                  <D.ActionsItem onPress={()=>actionEditModal()} action="edit">
                    <MaterialCommunityIcons name="square-edit-outline" size={30} color="#AAAAAA" />
                    <Text style={style({action: "edit"}).ActionTitle}>Editar</Text>
                  </D.ActionsItem>
                  <D.ActionsItem onPress={()=>actionDeleteModal()} action="delete">
                    <MaterialCommunityIcons name="trash-can-outline" size={30} color="#FFFFFF" />
                    <Text style={style({action: "delete"}).ActionTitle}>Excluir</Text>
                  </D.ActionsItem>
                </D.Actions>
              </D.ModalContent>
            </D.ModalContainer>
        </Modal>
        <Modal 
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={deleteModal}>
            <D.ModalContainer>
              <D.ModalContent>
                <D.ModalHeader>
                  <D.Close onPress={()=>setDeleteModal(false)}>
                    <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                  </D.Close>
                </D.ModalHeader>
                <Text style={style({}).modalTitle}>Tem certeza que deseja excluir a categoria: <Text style={style({}).modalTitleCategoryName}>{modalCategory.name}</Text>?
                </Text>
                <D.Actions>
                  <D.DeleteActionItem onPress={()=>setDeleteModal(false)} action="edit">
                    <Text style={style({action: "edit"}).ActionTitle}>Não, Cancelar</Text>
                  </D.DeleteActionItem>
                  <D.DeleteActionItem onPress={()=>deleteCategory(modalCategory.id)} action="delete">
                    <Text style={style({action: "delete"}).ActionTitle}>Sim, Excluir</Text>
                  </D.DeleteActionItem>
                </D.Actions>
              </D.ModalContent>
            </D.ModalContainer>
        </Modal>
        <Modal 
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={editModal}>
            <D.ModalContainer>
              <D.ModalContent>
                <D.ModalHeader>
                  <D.Close onPress={()=>setEditModal(false)}>
                    <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                  </D.Close>
                </D.ModalHeader>
                <Text style={style({}).modalTitle}>Editando a categoria: <Text style={style({}).modalTitleCategoryName}>{modalCategory.name}</Text>.
                </Text>
                <D.InputArea>
                  <D.Label>Nome da Categoria</D.Label>
                  <D.Input
                    placeholder={modalCategory.name}
                    placeholderTextColor="#C4C4C4"
                    value={newCategoryName}
                    onChangeText={t=>setNewCategoryName(t)}
                  />
                </D.InputArea>
                <D.Actions>
                  <D.EditActionItem onPress={()=>updateCategory(modalCategory.id)}>
                    <Text style={style({action: "delete"}).ActionTitle}>Salvar Alterações</Text>
                  </D.EditActionItem>
                </D.Actions>
              </D.ModalContent>
            </D.ModalContainer>
        </Modal>
      </D.Container>
    )
}

const style = (props) => StyleSheet.create({
    headerTitle: {
        flex: 1,
        textAlign:'center',
        fontSize:18,
        fontFamily:'PoppinsBold',
        color: '#333333'
    },
    categoryName: {
      fontSize: 16,
      fontFamily:'PoppinsMedium',
      color: '#AAAAAA'
    },
    modalTitle: {
      width: '100%',
      textAlign:'center',
      fontSize:16,
      fontFamily:'PoppinsBold',
      color: '#333333',
      marginBottom: 20
    },
    modalTitleCategoryName: {
      color: '#FF9900',
    },
    ActionTitle: {
      fontSize: 16,
      color: props.action === "delete" ? '#FFFFFF' : '#AAAAAA',
      fontFamily:'PoppinsMedium',
    }
})