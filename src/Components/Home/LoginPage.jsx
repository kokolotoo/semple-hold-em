import React, { useState, useContext } from 'react';
import './home.css'
import DataContext from '../../Context/DataContext';
import { Link, useNavigate } from 'react-router';


const LoginPage = () => {

    const { profiles, setUser, setIsLogin, setMoney } = useContext(DataContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
   
    const [loginError, setLoginError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Проверка за съвпадение в профилите
        const user = profiles.find(
            profile => profile.username === formData.username && profile.password === formData.password
        );

        if (user) {
            setUser(user);
            setMoney(user.money)
            setIsLogin(true);
            navigate('/game'); // Пренасочване след успешен вход
        } else {
            setLoginError("Invalid username or password.");
        }
    };

 


    return (
        <section className='login-container'>
            <main className="login-form-container">
                <h3 className="login-form-title">Login</h3>
               
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Username:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                       
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        
                    </div>
                   
                    {loginError && <p style={{ color: "red", fontSize:'1.5em' }}>{loginError}</p>}
                    <button type="submit">Login</button>
                    <footer className='login-footer'>
                        <Link to='/register' className='link'>Don't have an account!</Link>
                        <Link to='/forgot-page' className='link'>Forgot password or username</Link>
                    </footer>
                    
                </form>
            </main>
        </section>

    );

}

export default LoginPage;
