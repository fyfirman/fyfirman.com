import '../styles/globals.css'
import '@fontsource/nunito-sans';
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import animationData from "../lotties/loading-animation.json"
import Header from '../components/header/header';
import Lottie from 'react-lottie';

function MyApp({ Component, pageProps }: AppProps) {
  const [isReady, setIsReady] = useState(false);
  const render3D = useMediaQuery({
    query: '(min-device-width: 1080px)'
  })

  useEffect(() => {
    document.title = "Loading...";
    setTimeout(() => {
      document.fonts.load("12px Nunito Sans").then(() => {
        document.title = "Firmansyah Yanuar"
        setIsReady(true)
      });
    }, 1000);
  }, [])


  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (isReady ?
    <>
      <Header/>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
          marginTop: 120
        }}
      >
        <Component {...pageProps} />
        <footer
          style={{
            marginTop: `2rem`,
            textAlign: 'end'
          }}
        >
          <object type="image/svg+xml" className="end">
            Firmansyah Yanuar
          </object>
        </footer>
      </div>
      {render3D &&
        (<div className="spline-container right">
          <iframe title="3d-spline-danbo" id="spline-danbo" src="https://status.fyfirman.tech/spline-danbo-final/" frameBorder="0" />
        </div>)}
    </>
    :
    <>
      <div style={{ display: "flex", alignItems: "center", height: '100vh' }}>
        <Lottie options={lottieOptions} height={250} width={250} />
      </div>
    </>
  )
}

export default MyApp
