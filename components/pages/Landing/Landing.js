// import { useFontsLoaded } from 'hooks/useFontLoader';
// import { useIsTouch } from 'hooks/useTouchDetection';

import Head from 'components/misc/Head';
// import Link from 'components/ui/Link';
// import Text from 'components/ui/Text';
import Header from 'components/ui/Header';
import Footer from 'components/ui/Footer';

import styles from './Landing.module.scss';

const Landing = () => {
    // const fontsLoaded = useFontsLoaded();
    // const isTouch = useIsTouch();
    // console.log(`fontsLoaded: ${fontsLoaded}, isTouch: ${isTouch}`);
    return (
        <div className={styles.root}>
            <Head title="Claus Wahlers" description="Claus Wahlers" />
            <Header />
            <Footer />
        </div>
    );
};

export default Landing;
