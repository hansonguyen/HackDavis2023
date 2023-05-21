import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Pawfect Sitters</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <UserProvider>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        /** Put your mantine theme override here */
                        colors: {
                            'yellow': ['#FFEBB9','#FFEBB9','#FFEBB9','#FFEBB9','#FFEBB9','#FFEBB9','#FFEBB9','#FFEBB9','#FFEBB9','#FFEBB9'],

                            'orange': ['#FDD1A5','#FDD1A5' ,'#FDD1A5' ,'#FDD1A5' ,'#FDD1A5' ,'#FDD1A5' ,'#FDD1A5' ,'#FDD1A5' ,'#FDD1A5' ,'#FDD1A5' ],

                            'green': ['#D9E7C1','#D9E7C1','#D9E7C1','#D9E7C1','#D9E7C1','#D9E7C1','#D9E7C1','#D9E7C1','#D9E7C1','#D9E7C1'],

                            'beige': ['FAEBD7','FAEBD7','FAEBD7','FAEBD7','FAEBD7','FAEBD7','FAEBD7','FAEBD7','FAEBD7','FAEBD7'],

                            'brand': ['#C1CDC1',
                            '#FFEBB9',
                            '#FDD1A5',
                            '#D9E7C1',
                            'FAEBD7']
                        
                          },
                          primaryColor: 'orange',
                    }}
                    >
                    <Component {...pageProps} />
                </MantineProvider>
            </UserProvider>
        </>
    );
}