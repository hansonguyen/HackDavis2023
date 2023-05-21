import { Header, Button, rem } from "@mantine/core";
import { useUser } from '@auth0/nextjs-auth0/client';

function Navbar() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <Header height={rem(84)}>
            {!user && <a href="/api/auth/login">Login</a>}
            {user && <a href="/api/auth/logout">Logout</a>}
        </Header>
    )
}

export default Navbar