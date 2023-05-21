import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '../../../components/Navbar';

export default function User() {
  const { user, error, isLoading } = useUser();
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user ? (
      <div>
        <Navbar />
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    ) :
    (
      <div>
        <Navbar />
        <h1>You are not logged in</h1>
      </div>
    )
  );
}