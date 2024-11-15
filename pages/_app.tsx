import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

const ResetCSSandScrollView = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: 'Inter', sans-serif;
  }
`


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ResetCSSandScrollView/>
      <Component {...pageProps}/>
    </>
  )
}
