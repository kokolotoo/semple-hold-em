import React, { useState, useContext } from 'react';
import './home.css'
import DataContext from '../../Context/DataContext';
import { Link, useNavigate } from 'react-router';
import { auth, googleProvider } from '../../Hooks/firebase-config';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';


const LoginPage = () => {
   
    const { setUser, setIsLogin, money } = useContext(DataContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [loginError, setLoginError] = useState("");

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const newUser = {
                name: userCredential.user.displayName || "No Name",
                email: userCredential.user.email,
                id: userCredential.user.uid,
                money: money
            };
            setUser(newUser);
            setIsLogin(true);
            setLoginError(`Welcome ${userCredential.user.displayName}`);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            console.log(err.message);
            const errorCode = err.code;
            const errorMessages = {
                "auth/invalid-credential": "Invalid email or password",
                "auth/user-not-found": "No account found with this email.",
                "auth/wrong-password": "Incorrect password. Try again!",
                "auth/too-many-requests": "Too many failed attempts. Please try again later.",
            };

            setLoginError(errorMessages[errorCode] || "An error occurred. Try again!");
        }
    };

    const logInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const newUser = {
                name: userCredential.user.displayName || "No Name",
                email: userCredential.user.email,
                id: userCredential.user.uid,
                money: money
            };
            setUser(newUser);
            setLoginError(`Welcomme ${userCredential.user.displayName}`)
            setIsLogin(true)
            setTimeout(() => {
                navigate('/')
            }, 1000)
        } catch (err) {
            console.log(err.message);
            const errorMatch = err.message.match(/\(auth\/(.*?)\)/);
            setLoginError('Invalid email or password');
            console.log(errorMatch);
        }
    }


    return (
        <section className='login-container'>
            <main className="login-form-container">
                <h3 className="login-form-title">Login</h3>

                <form onSubmit={signIn}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    {loginError && <p style={{ color: "red", fontSize: '1.5em' }}>{loginError}</p>}
                    <button type="submit">Login</button>
                    <button type="button" onClick={logInWithGoogle}>Login with Google</button>

                    <footer className='login-footer'>
                        <Link to='/register' className='link'>Don't have an account!</Link>
                        <Link to='/forgot-page' className='link'>Forgot password or email</Link>
                    </footer>

                </form>
            </main>
        </section>

    );

}

export default LoginPage;
