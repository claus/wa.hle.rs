import './styles/normalize.scss';
import './styles/theme.scss';

import React from 'react';
import App from 'next/app';
import Head from 'next/head';

class TerapiaFloralApp extends App {
    renderHead() {
        return (
            // prettier-ignore
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="robots" content="index, follow" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://wa.hle.rs" />
                <link rel="canonical" href="https://wa.hle.rs" />
                <link rel="icon" href="/images/favicon-32.png" sizes="32x32" />
                <link rel="icon" href="/images/favicon-64.png" sizes="64x64" />
                <link rel="icon" href="/images/favicon-128.png" sizes="128x128" />
            </Head>
        );
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <main>
                {this.renderHead()}
                <Component {...pageProps} />
            </main>
        );
    }
}

export default TerapiaFloralApp;
