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
        align-items:flex-end;
    `,
    CloseModalButton:styled.TouchableOpacity`
        width: 40px;
        height: 40px;
        justify-content:center;
        align-items:center;
        background-color:#FF9900;
        border-radius:20px;
    `,
}