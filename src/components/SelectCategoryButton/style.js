import styled from 'styled-components';

export default {
  SelectContainer: styled.TouchableOpacity`
    width: 100%;
    background-color: #FFFFFF;
    border:1px solid #DDDDDD;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 10px 16px;
    margin-bottom:20px;
  `,
  ModalHeader: styled.View`
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  ModalHeaderTitle: styled.Text`
    color:#333333;
    font-family: PoppinsBold;
    font-size: 17px;
  `,
  IconBackground: styled.TouchableOpacity`
    width: 130px;
    height: 40px;
    border-radius: 20px;
    background-color: #FF9900;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  `,
  Cancel: styled.Text`
    color: #FFFFFF;
    font-family: PoppinsMedium;
    margin-left: 5px;
  `,
  Lista: styled.FlatList``,
  ClickCategory: styled.TouchableOpacity`
    padding: 10px 20px;
  `,
  ModalCategory: styled.Text`
    font-size: 16px;
    font-family: PoppinsRegular;
    color: #495057;
  `,
}