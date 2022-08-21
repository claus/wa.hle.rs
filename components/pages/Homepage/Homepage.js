// import { useFontsLoaded } from 'hooks/useFontLoader';
// import { useIsTouch } from 'hooks/useTouchDetection';

import Head from 'components/misc/Head';
// import Link from 'components/ui/Link';
import RichText from 'components/ui/RichText';
import ErrorGraphQL from 'components/ui/ErrorGraphQL';

import styles from './Homepage.module.scss';

const Homepage = ({ error, title, content }) => {
    if (error) return <ErrorGraphQL error={error} />;
    const {
        headline,
        description,
        // stuffHeadline,
        contactHeadline,
        contactContent,
    } = content;
    return (
        <>
            <Head title={title} description="Claus Wahlers" />
            <div className={styles.root}>
                <RichText as="h1" document={headline} className={styles.nobr} />
                <RichText document={description} />
                {/* <section>
                    <RichText as="h2" document={stuffHeadline} />
                    <ul>
                        <Tool href="/outguess-online" title="Outguess Online">
                            <p>Steganography from the early 2000s.</p>
                        </Tool>
                        <Tool
                            href="/web-font-fallback-generator"
                            title="Web Font Fallback Generator"
                        >
                            <p>Fighting layout shifts.</p>
                        </Tool>
                    </ul>
                </section> */}
                <section className={styles.contact}>
                    <RichText as="h2" document={contactHeadline} />
                    <RichText document={contactContent} />
                </section>
            </div>
        </>
    );
};

// const Tool = ({ title, href, children }) => {
//     return (
//         <li>
//             <p>
//                 <Link href={href}>{title}</Link>
//             </p>
//             {children}
//         </li>
//     );
// };

export default Homepage;
