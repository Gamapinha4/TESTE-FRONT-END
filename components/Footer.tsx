import styled from "styled-components"
import { theme } from "../theme/theme"

const FooterContainer = styled.div`
    width: 100%;
    height: 10%;
    background-color: ${theme.colors.footer};
    bottom: 0;
    position: relative;
    z-index: 999;
    padding: 4px 0px;
`

const Text = styled.p`
    font-size: 14px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    color: white;
    padding: 20px 0;
`

export default function Footer() {


    return(
        <FooterContainer>
            <Text>Todas as marcas e ilustrações utilizadas são de seus resepctivos donos.</Text>
        </FooterContainer>
    )
}