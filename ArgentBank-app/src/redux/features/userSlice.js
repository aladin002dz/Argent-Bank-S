// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile, loginUser, updateUserProfile } from './userApi';

// Création du slice pour gérer les informations utilisateur   
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      sessionStorage.removeItem('token'); // Supprime le token du sessionStorage lors de la déconnexion
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.body.user;
        state.token = action.payload.body.token;
        sessionStorage.setItem('token', action.payload.body.token); // Stocke le token dans le sessionStorage
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        console.log('Reponse api brut', action.payload);
        //state.user = action.payload.body.user; // je retire .body.user
        console.log('Reponse api', action.payload.user);

        state.user = action.payload;
        state.loading = false;// je retire .body.user
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // je retire .user
        state.error = null;
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload || 'Erreur lors de la mise à jour des informations utilisateur';
        state.loading = false;
      });
  },
});

export const { logoutUser, setToken, clearError } = userSlice.actions;

export default userSlice.reducer;
