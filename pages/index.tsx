import Image from 'next/image'
import Header from '../components/Header'
import background from '../public/images/pokemon-hero.jpg'
import styled, { createGlobalStyle } from 'styled-components'
import Footer from '../components/Footer'

const ResetCSS = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`

const ContainerImg = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;

`

const Text = styled.h1`
  font-family: 'Inter';
  font-size: 32px;
  color: white;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  padding: 0 20px;
  max-width: 30%;
`

const ImageStyled = styled(Image)`
  width: 100vw;
  height: 80vh;
`

export default function Home() {
  return (
    <>
      <ResetCSS/>
      <Header/>
      <ContainerImg>
        <ImageStyled src={background} alt='background'/>
        <Text>Cuidamos bem do seu pokémon, para ele cuidar bem de você</Text>
      </ContainerImg>
      <Footer/>
    </>
  )
}