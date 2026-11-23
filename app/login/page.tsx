/* Simple UI 
'use client';



import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>
      <LoginForm />
    </main>
  );
}

*/

/* Nices UI with CSS styling */
'use client';

import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-card">
        <h1>Welcome back</h1>
        <p className="login-subtitle">Log in to access the bootcamp app.</p>

        <LoginForm />
      </div>
    </main>
  );
}
