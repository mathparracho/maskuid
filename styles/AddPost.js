import styled from 'styled-components';

export const InputWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #242424 ;
`;

export const InputField = styled.TextInput`
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-align: center;
    width:90%;
    margin-bottom: 15px;
    color: #FBFAEE; /* Customize the color of the entered text */
    font-family: "Montserrat"
`;

export const AddImage = styled.Image`
    width: 100%;
    height: 250px;
    margin-bottom: 15px;
`;

export const StatusWrapper = styled.View`
    justify-content: center;
    align-items: center;
`;

export const SubmitBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    background-color: #53118F;
    border-radius: 5px;
    padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: white;
`;