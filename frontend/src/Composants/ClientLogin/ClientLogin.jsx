import { useState } from "react";

function ClientLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
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