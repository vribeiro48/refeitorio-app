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
    HeaderTitle: styled.Text`
        flex:1;
        text-align:center;
        font-size:18px;
        font-weight:bold;
        color: #333333;
    `,
    Label: styled.Text`
        font-size:16px;
        color: #495057;
        margin-bottom:10px;
    `,
    Input: styled.TextInput`
        border:1px solid #DDDDDD;
        background-color: #FFFFFF;
        border-radius: 5px;
        color: #495057;
        font-size: 16px;
        padding:10px;
        margin-bottom:20px;
    `,
    Select: styled.View`
        border:1px solid #DDDDDD;
        background-color: #FFFFFF;
        border-radius: 5px;
        color: #8863E6;
        font-size: 16px;
        padding:15px 0;
        margin-bottom:20px;
    `,
    SaveButton: styled.TouchableOpacity`
        background-color:#FF9900;
        justify-content:center;
        align-items:center;
        padding:15px;
        border-radius: 5px;
    `,
    SaveButtonText: styled.Text`
        color: #FFFFFF;
        font-weight:bold;
        font-size: 16px;
    `,
}