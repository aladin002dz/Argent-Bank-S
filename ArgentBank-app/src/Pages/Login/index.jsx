import Footer from '@/components/footer';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '@/redux/features/userApi';
import { clearError } from '@/redux/features/userSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth?.token || null); // Récupère le token depuis Redux
    const { error: authError, loading } = useSelector((state) => state.user);


    const navigate = useNavigate();
    // Réinitialise les erreurs au montage et démontage du composant
    useEffect(() => {
        dispatch(clearError());
        return () => dispatch(clearError());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearError());
        dispatch(loginUser({ email, password }))
            .unwrap() // Permet de gérer les promesses rejetées si nécessaire
            .then((response) => {
                if (response.body.token) {
                    sessionStorage.setItem('token', response.body.token); // Stocke le token dans le localStorage
                    navigate('/user'); // Redirige vers /user si le token existe
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la connexion :', error);
            });
    };

    return (
        <>
            <Header className="header" />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <form onSubmit={handleSubmit}>
                        <h1 className="sign-in-heading">Sign In</h1>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input
                                type="email"
                                id="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="sign-in-button"
                            disabled={loading}
                        >
                            {loading ? 'Connexion en cours...' : 'Sign In'}
                        </button>
                    </form>
                    {authError && (
                        <p className="error-message">
                            ❌ Échec de la connexion : {authError}
                        </p>
                    )}
                </section>
            </main>
            <Footer className="footer" />
        </>
    );
}

export default Login;

