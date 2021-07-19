import styled from "styled-components";

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color:#FF9900;
        justify-content:center;
        align-items:center;
        padding: 25px;
    `,
    Title: styled.Text`
        font-size:36px;
        color: #FFFFFF;
        margin-bottom:30px;
        text-transform:uppercase;
        font-weight:bold;
    `,
    Card: styled.View`
        background-color:#FFFFFF;
        padding:20px;
        justify-content:space-between;
        align-items:center;
        flex-direction:row;
        width:100%;
        border-radius:10px;
        margin-bottom:10px;
    `,
    Description: styled.View``,
    DescriptionTop: styled.Text`
        font-size:18px;
        color:#C4C4C4;
        text-transform:uppercase;
    `,
    DescriptionBottom: styled.Text`
        font-size:18px;
        color:#FF9900;
        text-transform:uppercase;
        font-weight:bold;
        margin-top:-3px;
    `,
    Button: styled.TouchableOpacity`
        background-color:#FF9900;
        padding:12px;
        border-radius:5px;
    `,
}