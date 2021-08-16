import '../styles/globals.sass'
import SiteLayout from '../components/site/SiteLayout';

function MyApp({ Component, pageProps }) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

export default MyApp
