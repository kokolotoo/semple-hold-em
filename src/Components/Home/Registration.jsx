import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'
import useRegistration from '../../Hooks/useRegistration';



const Registration = () => {
 
    const { errors, successMessage, showPassword,
        handleChange, handleSubmit, setShowPassword,
        formData, readAbout, setReadAbout } = useRegistration()
   
    return (
        <main className='register-form-container'>

            {successMessage ?
                <h3 className='success-message'>{successMessage}</h3>
                :
                <h3 className='register-form-title' >Registration form</h3>
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder='Confirm password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                    )}
                    <div className='pass-shown-title'>
                        <section>
                            <label htmlFor="showPassword" >Shown pass:</label>
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                        </section>

                        <section>
                            <label htmlFor="readAbout" >Read About:</label>
                            <input
                                type="checkbox"
                                id="readAbout"
                                checked={readAbout}
                                onChange={() => setReadAbout(!readAbout)}
                            />

                        </section>

                    </div>
                    {errors.read && <p style={{ color: "red", textAlign: 'end' }}>{errors.read}</p>}
                </div>
                <button type="submit">Submit</button>
                <Link to='/login'>I have account</Link>
            </form>


        </main>
    );
}

export default Registration;
