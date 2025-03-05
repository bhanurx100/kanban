import './App.css';
import KanbanBoard from './components/KanbanBoard';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface UserInfo {
  sub: string; // Google ID
  name: string;
  email: string;
  picture: string;
}

function App() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const clientId = '515827519840-qofa2n7efv5pp5inuks8s2fe14nfc664.apps.googleusercontent.com';

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decodedUser = jwtDecode<UserInfo>(credentialResponse.credential);
      console.log('Login Success:', decodedUser);
      setUser(decodedUser);
    } else {
      console.log('No credential received');
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const handleSignOut = () => {
    setUser(null); // Clear user state to log out
    console.log('Signed out');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        {!user ? (
          <div className="landing">
            <h1>Welcome to Kanban</h1><br /><br />
            <p>Sign up or log in with Google to continue</p>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              theme="filled_black"
              shape="rectangular"
              text="continue_with"
            />
          </div>
        ) : (
          <div>
            <div className="header">
              <p> {user.name}</p>
              <button className="signout-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
            <KanbanBoard user={user} />
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;