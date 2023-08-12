import styled from 'styled-components';


export const Container = styled.View`
  flex: 1;
  background-color: #242424 ;
  padding: 20px;
`;

export const TituloFeed = styled.Text`
    text-align: center;
    font-size: 18px;
    margin-bottom: 18px;
    color: white;
    margin-top: 16px;
    font-family: "Montserrat"

`;

export const Card = styled.View`
    width: 100%;
    margin-bottom: 20px;
    border-radius: 8px;
    padding: 18px;
    background-color: #FBFAEE   ;
    border: 1px solid grey;
    elevation: 10; /* Adicione a propriedade elevation para a sombra */
`;

export const Time = styled.Text`
    font-size: 12px;
    margin-bottom: 10px;
    align-self: flex-end;
    margin-left: auto;
    font-family: "Montserrat"
`;

export const Post = styled.Text`
    text-align: center;
    font-size: 18px;
    margin-bottom: 18px;
    color: #242424 ;
    fontFamily: 'Montserrat'

`;

export const Likes = styled.Text`
    text-align: center;
    font-size: 18px;
    font-weight: bold; /* Adicione esta linha */
`;

export const BottomPost = styled.View`
    display: flex;
    flex-direction: row; /* Altere para row */
    justify-content: space-between;
    align-items: flex-end; /* Adicione esta linha */
`;