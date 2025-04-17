import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/features/userSlice';
const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Dispatch l'action de déconnexion pour réinitialiser l'état utilisateur
        dispatch(logoutUser());

        // Redirige vers la page d'accueil après 10 secondes
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        // Nettoie le timer si le composant est démonté avant les 10 secondes
        return () => clearTimeout(timer);
    }, [dispatch, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Vous êtes déconnecté</h1>
            <p>Vous serez redirigé vers la page d&apos;accueil dans 10 secondes...</p>
        </div>
    );
};

export default Logout;
