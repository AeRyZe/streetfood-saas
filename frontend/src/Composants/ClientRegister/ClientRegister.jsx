import { useState } from "react"

function ClientRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        fetch('http://88.125.148.207:21000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone: phone
            })
        })
    };

    return (
        <div className="client-register-container">
            <div className="client-register-form-container">
                <form action="" method="post" className="client-register-form" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="lastname">Nom : </label>
                        <input type="text" name="lastname" placeholder="Votre nom" onChange={(e) => { setLastname(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="firstname">Prénom : </label>
                        <input type="text" name="firstname" placeholder="Votre prénom" onChange={(e) => { setFirstname(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email : </label>
                        <input type="email" name="email" placeholder="Votre adresse email" onChange={(e) => { setEmail(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe : </label>
                        <input type="password" name="password" placeholder="Votre mot de passe" onChange={(e) => { setPassword(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="phone">Téléphone : </label>
                        <input type="tel" name="phone" placeholder="Votre numéro de téléphone" onChange={(e) => { setPhone(e.target.value) }} required />
                    </div>
                    <input type="submit" value="Inscription" />
                </form>
            </div>
        </div>
    )
}

export default ClientRegister