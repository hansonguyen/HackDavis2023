import {
    Header,
    Button,
    Avatar,
    ActionIcon,
    Menu,
    Text,
    rem
} from '@mantine/core'
import { useUser } from '@auth0/nextjs-auth0/client'
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
    IconLogout
} from '@tabler/icons-react'
import { useRouter } from 'next/router'

function Navbar() {
    const { user, error, isLoading } = useUser()
    const router = useRouter()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    const handleLogin = (e) => {
        e.preventDefault()
        router.push('/api/auth/login')
    }

    const handleLogout = (e) => {
        e.preventDefault()
        router.push('/api/auth/logout')
    }
    
    const handleSettings = (e) => {
        e.preventDefault()
        router.push('/user')
    }

    return (
        <Header
            height={rem(84)}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem'
            }}
        >
            <h1><a href='/' style={{ color: "black", textDecoration: "none" }}>Pawfect Sitters</a></h1>
            {!user && <Button onClick={handleLogin}>Login</Button>}
            {user && (
                <div>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon>
                                <Avatar src={user.picture} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item icon={<IconSettings size={14} />} onClick={handleSettings}>
                                Settings
                            </Menu.Item>
                            <Menu.Item icon={<IconLogout size={14} />} onClick={handleLogout}>
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            )}
        </Header>
    )
}

export default Navbar
