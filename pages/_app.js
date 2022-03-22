import '../styles/globals.css'
import Layout from "../components/layout/Layout"
// it is a special kind of file
// this is kind of root component that next js will render 
// layout can be applied here and this will affect  all child elements 
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
