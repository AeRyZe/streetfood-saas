import { useState } from "react"

function CompanyRegister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [adress, setAdress] = useState('');
    const [siret, setSiret] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        fetch('http://88.125.148.207:21000/api/companies/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
                firstname: firstname,
                lastname: lastname,
                adress: adress,
                siret: siret
            })
        })
    };

    return (
        <div className="company-register-container">
            <div className="company-register-form-container">
                <form action="" method="post" className="company-register-form" onSubmit={onSubmit}>
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
                        <input type="email" name="email" placeholder="Adresse mail de l'entreprise" onChange={(e) => { setEmail(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe : </label>
                        <input type="password" name="password" placeholder="Votre mot de passe" onChange={(e) => { setPassword(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="name">Nom de commerce : </label>
                        <input type="text" name="name" placeholder="Nom de l'entreprise" onChange={(e) => { setName(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="adress">Adresse : </label>
                        <input type="text" name="adress" placeholder="Adresse de l'entreprise" onChange={(e) => { setAdress(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="phone">Téléphone : </label>
                        <input type="tel" name="phone" placeholder="Votre numéro de téléphone" onChange={(e) => { setPhone(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="siret">N° Siret : </label>
                        <input type="text" name="siret" placeholder="Votre numéro de siret" onChange={(e) => { setSiret(e.target.value) }} required />
                    </div>
                    <input type="submit" value="Inscription" />
                </form>
            </div>
        </div>
    )
}

export default CompanyRegister