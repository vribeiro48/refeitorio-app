import styled from "styled-components";

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color:#F5F6FA;
    padding: 25px;
  `,
  Header: styled.View`
    margin-top: 20px;
    margin-bottom: 20px;
    flex-direction:row;
    align-items:center;
  `,
  List: styled.FlatList``,
  LoadingArea: styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
  `,
  Category: styled.View`
    background-color: #FFFFFF;
    margin-bottom: 10px;
    padding: 20px 10px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  DishButton: styled.TouchableOpacity`
  `,
  ModalContainer: styled.View`
    flex: 1;
    justify-content: flex-end;
    background: rgba(0, 0, 0, 0.7);
  `,
  ModalContent: styled.View`
    width:100%;
    border-top-width:5px;
    border-top-color:#FF9900;
    background-color:#FFFFFF;
    padding:20px 50px 50px;
    align-items: center;
  `,
  ModalHeader: styled.View`
    width: 100%;
    align-items: flex-end;
    margin-bottom: 10px;
  `,
  Close: styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #FF9900;
    justify-content: center;
    align-items: center;
  `,
  Actions: styled.View`
    flex-direction: row;
  `,
  ActionsItem: styled.TouchableOpacity`
    width: 120px;
    height: 120px;
    background-color: ${(props) => props.action === "edit" ? '#F9F9F9' : 'rgb(242, 116, 116)'};
    padding: 20px 25px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  `,
  DeleteActionItem: styled.TouchableOpacity`
    background-color: ${(props) => props.action === "edit" ? '#F9F9F9' : 'rgb(242, 116, 116)'};
    padding: 20px 25px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  `,
  EditActionItem: styled.TouchableOpacity`
    width: 100%;
    background-color: #FF9900;
    padding: 20px 25px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  `,
  InputArea: styled.View`
    width: 100%;
    text-align: left;
  `,
  Label: styled.Text`
    font-size:16px;
    color: #495057;
    margin-bottom:10px;
    font-family:PoppinsMedium;
  `,
  Input: styled.TextInput`
    border:1px solid #DDDDDD;
    background-color: #FFFFFF;
    border-radius: 5px;
    color: #495057;
    font-size: 16px;
    padding:10px;
    margin-bottom:20px;
    font-family:PoppinsRegular;
  `,
}