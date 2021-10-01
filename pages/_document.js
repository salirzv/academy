import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html lang={'fa-IR'} dir={'rtl'}>
                <Head/>
                <body>
                <Main/>
                <div id='portal-root'/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument