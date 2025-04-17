// src/components/UserInfo.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/features/userApi'; // Updated import path and function

function UserInfo() {
    const { data: user, loading, error } = useSelector((state) => state.user); // Accès à l'état utilisateur
    const dispatch = useDispatch();

    // Récupération des données utilisateur au montage du composant
    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error! {error}</div>;
    }

    return (
        <div>
            {/* Affichage des données utilisateur */}
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
        </div>
    );
}

export default UserInfo;

