import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Page title</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <UserProvider>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        /** Put your mantine theme override here */
                        colorScheme: 'light',
                    }}
                    >
                    <Component {...pageProps} />
                </MantineProvider>
            </UserProvider>
        </>
    );
}