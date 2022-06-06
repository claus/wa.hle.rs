// import { useFontsLoaded } from 'hooks/useFontLoader';
// import { useIsTouch } from 'hooks/useTouchDetection';

import Head from 'components/misc/Head';
// import Link from 'components/ui/Link';
// import Text from 'components/ui/Text';
import Footer from 'components/ui/Footer';

import styles from './Homepage.module.scss';

const Homepage = () => {
    // const fontsLoaded = useFontsLoaded();
    // const isTouch = useIsTouch();
    // console.log(`fontsLoaded: ${fontsLoaded}, isTouch: ${isTouch}`);
    return (
        <div className={styles.root}>
            <Head title="Claus Wahlers" description="Claus Wahlers" />
            <Footer />
        </div>
    );
};

export default Homepage;
