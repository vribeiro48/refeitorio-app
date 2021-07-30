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
    Content: styled.FlatList``,
    Card: styled.TouchableOpacity`
        width:47%;
        margin:5px;
        background-color: #FFFFFF;
        padding:20px;
        justify-content:center;
        align-items:center;
        border-radius:10px;
    `,
    MainModal: styled.View`
        flex:1;
        background-color:#FFFFFF;
        padding:30px
    `,
    ModalHeader: styled.View`
        width:100%;
        margin-top:20px;
        margin-bottom:50px;
        align-items:center;
        justify-content: space-between;
        flex-direction: row;
    `,
    CloseModalButton:styled.TouchableOpacity`
        width: 40px;
        height: 40px;
        justify-content:center;
        align-items:center;
        background-color:#FF9900;
        border-radius:20px;
    `,
    DishList: styled.FlatList`
        margin:0 0 15px;
    `,
    DishContainer: styled.View`
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
    `,
    Dish: styled.View`
        width: 100%;
        flex-direction:row;
        align-items: center;
        justify-content: space-between;
        padding:5px 0;
        margin-bottom:5px;
    `,
}