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
    List: styled.FlatList``,
    Label: styled.Text`
        font-size:16px;
        color: #495057;
        margin-bottom:10px;
        font-weight:bold;
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
    ItemsCategories: styled.View`
        margin-bottom:20px;
        padding-bottom:20px;
        border-bottom-width: 1px;
        border-bottom-color:#C4C4C4;
    `,
    Dish: styled.TouchableOpacity`
        flex-direction:row;
        align-items:center;
        padding:10px;
        border-radius:5px;
        margin-bottom:5px;
    `,
    DishName: styled.Text`
        font-size:16px;
        margin-left:5px;
        color: #AAAAAA;
    `,
}