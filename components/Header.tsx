import styled from "styled-components"
import { theme } from "../theme/theme"
import logo from '../public/images/white-pokeball.svg'
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const HeaderStyled = styled.header`
    max-height: 104px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px
`

const Button = styled.button<{ $type?: 'primary' | 'secundary' | 'tertiary', $isActive?: boolean}>`
    position: relative;
${prop => prop.$type === 'primary' && `
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: 50px;
    width: 239px;
    height: 51px;
    display: flex;
    font-size: 20px;
    margin-left: 83px;
    margin-top: 26px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    gap: 20px
    transition: width 0.5s ease;
    font-weight: 600;

    ${!prop.$isActive && `
        &:hover {
            animation: expand 0.5s forwards;

            ${ImageStyled} {
                left: 7px;
            }
        }
    `}

    ${!prop.$isActive && `&:not(:hover) {
        animation: contract 0.5s forwards;
        
        ${ImageStyled} {
            left: 7px;
        }
    }`}

    ${ImageStyled} {
        position: absolute;
        transform: translateY(-50%);
    }
    
    span {
        display: ${!prop.$isActive && 'none'};
        margin-left: ${prop.$isActive ? '30px' : '66px'};
        transform: translateX(-10px);
        transition: display 0.3s ease, transform 0.3s ease;
        white-space: nowrap;
        overflow: hidden;
    }
    
    &:hover span {
        display: inline-block;
        opacity: 1;
    }

    @keyframes expand {
        0% {
          width: 51px;
        }
        100% {
          width: 239px;
        }
      }

    @keyframes contract {
        0% {
          width: 239px;
        }
        100% {
          width: 51px;
        }
      }
`}

${prop => prop.$type === 'secundary' && `
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: 50px;
    width: 172px;
    height: 42px;
    font-size: 14px;
    margin-left: 30px;
    cursor: pointer;
    font-weight: 700;
`}

${prop => prop.$type === 'tertiary' && `
    background-color: transparent;
    color: black;
    border: none;
    border-radius: 50px;
    width: 101px;
    height: 17px;
    font-size: 14px;
    cursor: pointer;
`}
`

const Div = styled.div`
    display: flex;
    align-items: center;
    margin-right: 83px;
    margin-top: 20px
`

const ImageStyled = styled(Image)`
    width: 37px;
    top: 50%;
    height: 34px;
`


export default function Header() {

    const [active, setActive] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            setActive(false)
        }, 5000);

        return () => clearTimeout(timer);
    }, [])


    return (
        <HeaderStyled>
            <Button $type="primary" $isActive={active} onClick={() => router.push('/')}><ImageStyled priority src={logo} alt="pokeball"/> <span>Centro Pokémon</span></Button>
            <Div>
                <Button $type="tertiary" onClick={() => router.push('/sobre')}>Quem Somos</Button>
                <Button $type="secundary" onClick={() => router.push('/consulta')}>Agendar Consulta</Button>
            </Div>
        </HeaderStyled>
    )
}