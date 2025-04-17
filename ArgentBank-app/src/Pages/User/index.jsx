//ArgentBank-app\src\Pages\User\index.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Account from '../../components/account';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { getUserProfile, setToken, updateUserProfile } from '../../redux/features/userSlice';
function User() {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    // Récupérez uniquement l'objet user du state Redux
    const user = useSelector((state) => state.user?.user || null);
    const loading = useSelector((state) => state.user?.loading || false);
    const error = useSelector((state) => state.user?.error || null);
    const navigate = useNavigate();

    // Log pour débogage
    console.log('Données avant rendu :', {
        user,
        isEditing,
        loading
    });



    useEffect(() => {
        if (error) {
            console.error('Erreur lors de la récupération du profil utilisateur :', error);
        }
    }, [error]);
    //Initialisation des champs avec les données de l'utilisateur
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {

            dispatch(setToken(storedToken)); // Créez une action setToken si nécessaire
            console.log('Récupération des données utilisateur', getUserProfile());
            dispatch(getUserProfile());
        }
        else {
            console.error('Aucun token trouvé dans le sessionStorage.');
            // Redirigez vers la page de connexion ou gérez l'erreur comme vous le souhaitez
            navigate('/login');
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        if (user) {
            console.log('Données utilisateur :', user);
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({ firstName: FirstName, lastName: LastName }))
            .unwrap()
            .then((response) => {
                if (response && response.body && response.body.token) {
                    sessionStorage.setItem('token', response.body.token);
                }
                dispatch(getUserProfile());
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour du profil :', error);
            });
    };


    const handleCancel = () => {
        setIsEditing(false); // Réinitialise l'état d'édition
        // Réinitialise les champs avec les données de l'utilisateur
        setFirstName(user.firstName);
        setLastName(user.lastName);
        // Redirige vers la page utilisateur    
        navigate('/user');


    };



    return (
        <>
            <Header className="header" />

            <main className="main bg-dark">
                <div className="header">
                    {loading}
                    {/* Affichage en mode non-édition */}

                    {!isEditing && !loading && (
                        <>
                            <h1>
                                Welcome back<br />
                                {user?.firstName} {user?.lastName}!
                            </h1>
                            <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>
                                Edit Name
                            </button>
                        </>

                    )}

                    {/* Affichage en mode édition */}
                    {isEditing && (
                        <>
                            <h1> Welcome back </h1>
                            <form onSubmit={handleSubmit} className="form">
                                <div className="input-group">

                                    <label htmlFor="firstName"></label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder={user?.firstName || ''}
                                        value={FirstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />

                                    <label htmlFor="lastName"></label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder={user?.lastName || ''}
                                        value={LastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                {/* Conteneur des boutons */}
                                <div className="button-group">
                                    <button type="submit" className="submit-button">Save</button>
                                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                                </div>
                            </form>
                        </>
                    )}

                </div>
                <h2 className="sr-only">Accounts</h2>

                {/* Utilisation du composant Account */}
                <Account title="Argent Bank Checking" amount="$2,082.79" description="Available Balance" suffix="x8349" />
                <Account title="Argent Bank Savings" amount="$10,928.42" description="Available Balance" suffix="x6712" />
                <Account title="Argent Bank Credit Card" amount="$184.30" description="Current Balance" suffix="x8349" />
            </main>
            <Footer className="footer" />
        </>
    );
}

export default User;