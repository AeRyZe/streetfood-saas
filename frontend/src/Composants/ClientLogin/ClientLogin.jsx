import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setUserProfile } from "../../redux/features/UserProfileSlice";

function ClientLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        fetch('http://88.125.148.207:21000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(function (response) {
                return response.json();

            })
            .then(function (data) {
                sessionStorage.setItem("token", data.token)
                fetch('http://88.125.148.207:21000/api/users/' + data.token, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        dispatch(setUserProfile({
                            firstname: data.target.firstname,
                            lastname: data.target.lastname,
                            email: data.target.email,
                            phone: data.target.phone,
                            token: sessionStorage.getItem("token")
                        }))
                    }).then(
                        navigate("/userHome")
                    );

                console.log('Succès:', data.token);
            })
            .catch(function (error) {
                console.error('Erreur:', error);
            });
    };

    return (
        <div className="client-login-container">
            <div className="client-login-form-container">
                <form action="" method="post" className="client-login-form" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email">Email :</label>
                        <input type="email" name="email" placeholder="Votre adresse email" onChange={(e) => { setEmail(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" placeholder="Votre mot de passe" onChange={(e) => { setPassword(e.target.value) }} required />
                    </div>
                    <input type="submit" value="Connexion" />
                </form>
            </div>
        </div>
    )
}
export default ClientLogin