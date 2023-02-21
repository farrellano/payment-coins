import Link from 'next/link'

export default function Product({ name }: any) {
    return (<>
        <h1>
            This is a product {name}
        </h1>
        <Link href="/">Go home</Link>
    </>);
}

Product.getInitialProps = () => {

    return fetch('http://localhost:3000/api/hello')
        .then(res => res.json())
        .then(response => {
            const { name } = response;
            return { name }
        })
} 