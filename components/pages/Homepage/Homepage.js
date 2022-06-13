// import { useFontsLoaded } from 'hooks/useFontLoader';
// import { useIsTouch } from 'hooks/useTouchDetection';

import Head from 'components/misc/Head';
import Link from 'components/ui/Link';

import styles from './Homepage.module.scss';

const Homepage = () => {
    // const fontsLoaded = useFontsLoaded();
    // const isTouch = useIsTouch();
    // console.log(`fontsLoaded: ${fontsLoaded}, isTouch: ${isTouch}`);
    return (
        <>
            <Head title="Claus Wahlers" description="Claus Wahlers" />
            <div className={styles.root}>
                <h1>
                    <span>Hello! </span>
                    <span>
                        My name is <strong>Claus Wahlers. </strong>
                    </span>
                    <span>
                        This is <strong>my website.</strong>
                    </span>
                </h1>
                <p>
                    I write software for{' '}
                    <Link href="https://github.com/claus" rel="me">
                        fun
                    </Link>{' '}
                    and{' '}
                    <Link href="https://madeinhaus.com">
                        profit
                    </Link>
                    .
                </p>
                {/* <section>
                    <h2>
                        Here are some <strong>tools</strong> i wrote:
                    </h2>
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
                    <h2>
                        How to <strong>contact</strong> me:
                    </h2>
                    <ul>
                        <li>
                            Email: <Link href="mailto:w@hle.rs">w@hle.rs</Link>
                        </li>
                        <li>
                            Github:{' '}
                            <Link href="https://github.com/claus" rel="me">
                                claus
                            </Link>
                        </li>
                        <li>
                            Twitter:{' '}
                            <Link href="https://twitter.com/cwahlers" rel="me">
                                @cwahlers
                            </Link>
                        </li>
                        <li>
                            Mastodon (pt/en):{' '}
                            <Link
                                href="https://mastodon.com.br/@claus"
                                rel="me"
                            >
                                @claus@mastodon.com.br
                            </Link>
                        </li>
                        <li>
                            Mastodon (de/en):{' '}
                            <Link href="https://chaos.social/@claus" rel="me">
                                @claus@chaos.social
                            </Link>
                        </li>
                    </ul>
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
