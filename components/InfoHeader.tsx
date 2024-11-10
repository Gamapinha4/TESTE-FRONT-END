import styled from "styled-components"
import { theme } from "../theme/theme"
import Header from "./Header"
import { Router } from "express"
import { useRouter } from "next/router"
import Footer from "./Footer"

type props = {
    title: string,
    subtitle: string
}


const ContainerInfo = styled.div`
    width: 100%;
    height: 20vh;
    top: 100px;
    background-color: ${theme.colors.primary};
`

const TextContainer = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
`

const NavigationBar = styled.p`
    position: relative;
    margin-left: 106px;
    top: 26px;
    font-size: 12px;
    font-weight: 700;
    font-family: Inter;

    color: white;

    a {
        cursor: pointer;
    }

    span {
        margin: 0 5px;
    }
`

const Title = styled.h1`
    position: relative;
    margin-left: 104px;
    top: 2px;

    font-size: 32px;
    font-weight: 700;
    font-family: 'Inter';
    color: white;
`

const SubTitle = styled.h2`
    position: relative;
    margin-left: 106px;
    top: -18px;

    font-size: 14px;
    font-weight: 100;
    font-family: Inter;
    color: white;
`


export default function InfoHeader({title, subtitle}: props) {

    const router = useRouter()

    return(
        <>
            <Header/>
                <ContainerInfo>
                    <TextContainer>
                        <NavigationBar><a onClick={() => router.push('/')}>Home</a> <span>{'>'}</span> {title}</NavigationBar>
                        <Title>{title}</Title>
                        <SubTitle>{subtitle}</SubTitle>
                    </TextContainer>
                </ContainerInfo>
        </>
    )
}