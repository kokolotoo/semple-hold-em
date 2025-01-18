import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from "../Context/DataContext";



const useRegistration = () => {

    const { setIsLogin, profiles, money, setMoney, setUser } = useContext(DataContext)
    const navigation = useNavigate()
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        money: money
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [readAbout, setReadAbout] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let validationErrors = {};
        if (!formData.username.trim()) {
            validationErrors.username = "Incorrect Username.";
        }
        if (!formData.email) {
            validationErrors.email = "Require email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Invalid email.";
        }
        if (!formData.password) {
            validationErrors.password = "Require password.";
        } else if (formData.password.length < 6) {
            validationErrors.password = "Pass must have 6 character.";
        }
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = "Incorrect pass.";
        }
        if (!readAbout) {
            validationErrors.read = "Require!.";
        }
        return validationErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

        } else {

            setErrors({});

            if (checkForMach(formData)) { return }

            setSuccessMessage("Регистрацията e успешна!");
            // Тук можете да изпратите данните към сървъра.
            //console.log("Регистрационни данни:", formData);

            setReadAbout(false)
            setShowPassword(false)
            setIsLogin(true)

            const updatedProfiles = [...profiles, formData];
            //тук е с мястото за логика за изпращане на данни към сървър

            localStorage.setItem("texas-hold'em-profiles", JSON.stringify(updatedProfiles));

            setUser(formData)

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                money: 0,
            });

            setMoney(formData.money)

            setTimeout(() => {
                navigation('/')
                setSuccessMessage("");
            }, 1000)
        }
    };

    const checkForMach = (newUser) => {

        const usernameMatch = profiles.some(profile => {
            return profile.username === newUser.username
        })

        const emailMatch = profiles.some(profile => {
            return profile.email === newUser.email
        })

        if (usernameMatch) {
            setSuccessMessage('Username is already taken!')
            return true
        }
        if (emailMatch) {
            setSuccessMessage('Email is already taken!')
            return true
        }

        return false
    }

   return {
    errors, successMessage, showPassword,
       handleChange, handleSubmit, setShowPassword,
       formData, readAbout, setReadAbout
   }
}

export default useRegistration;