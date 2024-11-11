import Image from 'next/image'
import Header from '../components/Header'
import background from '../public/images/pokemon-hero.jpg'
import styled from 'styled-components'
import Footer from '../components/Footer'

const ContainerImg = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;

`

const Text = styled.h1`
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
      <Header/>
      <ContainerImg>
        <ImageStyled src={background} alt='background'/>
        <Text>Cuidamos bem do seu pokémon, para ele cuidar bem de você</Text>
      </ContainerImg>
      <Footer/>
    </>
  )
}