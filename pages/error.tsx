import styled, { createGlobalStyle } from "styled-components";
import InfoHeader from "../components/InfoHeader";
import Footer from "../components/Footer";
import { theme } from "../theme/theme";
import Image from "next/image";
import Warning from '../public/warning.svg'
import { useRouter } from "next/router";

const ResetCSS = createGlobalStyle`
      body {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `
const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: ${theme.colors.cardBg};
    max-width: 400px;
    margin: 257px auto;
    border-radius: 8px;
    border: 1px solid ${theme.colors.borderCardBG};

    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;

    font-family: 'Inter';

    h1 {
        font-size: 20px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    p {
        font-weight: 400;
        font-size: 14px;
        margin: 20px auto;
        color: ${theme.colors.subtitle};
        max-width: 350px;
    }
`

const Button = styled.button`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: none;
    border-radius: 30px;
    width: 197px;
    height: 42px;
    display: flex;
    font-size: 14px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-weight: 700;
    margin-bottom: 34px;
`


export default function Error() {

    const router = useRouter()

    return(
        <>
            <ResetCSS/>
            <InfoHeader title="Agendar Consulta" subtitle="Recupere seus pokémons em 5 segundos."/>
            <CardContainer>
                <h1>Houve um problema no agendamento</h1>
                <Image src={Warning} alt="Houve um problema no agendamento"></Image>
                <p>mensagem_error</p>
                <Button onClick={() => router.push('/consulta')}>Fazer Novo Agendamento</Button>
            </CardContainer>
            <Footer/>
        </>
    )
}