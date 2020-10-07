import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import axios from 'axios';

export const login = createAsyncThunk(
  'authentication/login',
  async (credentials) => {
    const url = 'https://westeria.app/rest-auth/login/';
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      let data = await response.json();
      try {
        await AsyncStorage.setItem('token', data.token);
      } catch (e) {
        console.log(e);
        // Restoring token failed
      }
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const signUp = createAsyncThunk(
  'authentication/signup',
  async (credentials) => {
    const url = Config.API_AUTH_URL + '/registration/';
    console.log(url);
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          name: credentials.name,
          password1: credentials.password1,
          password2: credentials.password2,
        }),
      });
      console.log(response);
      let data = await response.json();
      console.log(data);
      try {
        await AsyncStorage.setItem('token', data.token);
      } catch (e) {
        console.log(e);
        // Restoring token failed
      }
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  },
);

export const getUserData = createAsyncThunk(
  'authentication/checkToken',
  async () => {
    let userData = {};
    let userToken;

    try {
      userToken = await AsyncStorage.getItem('token');

      // Set global axios authorization header
      axios.defaults.withCredentials = true;
      axios.interceptors.request.use(function (config) {
        const token = userToken;

        if (token) {
          config.headers.Authorization = 'JWT ' + token;
        }

        return config;
      });
      if (userToken) {
        userData.token = userToken;
        console.log('iner');
        let defaultBranch = await axios.get(
          Config.API_URL + '/user/default_branch/',
        );
        let ownedBranches = await axios.get(
          Config.API_URL + '/owned_branches/',
        );
        let reacts = await axios.get(
          Config.API_URL + `/branches/${defaultBranch.data.uri}/reactions/`,
        );

        // Add reacts to the branch object
        defaultBranch.data.reacts = reacts.data;

        userData.defaultBranch = defaultBranch.data;
        userData.ownedBranches = ownedBranches.data;
      }
    } catch (e) {
      console.error(e);
      // Restoring token failed
    }

    console.log(userToken);
    return userData;
  },
);

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuth: false,
    user: null,
    currentBranch: null,
    branches: null,
    loading: false,
    checkingForToken: true,
  },
  reducers: {
    setCurrentBranch: (state, action) => {
      state.currentBranch = action.payload; // mutate the state all you want with immer
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isAuth = action.payload;
      state.loading = false;
      if (action.payload.token) {
        state.isAuth = action.payload.token;
      }
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = true;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.checkingForToken = false;
      state.isAuth = action.payload.token;
      state.currentBranch = action.payload.defaultBranch;
      state.branches = action.payload.ownedBranches;
    },
    [getUserData.pending]: (state, action) => {
      state.checkingForToken = true;
    },
    [getUserData.rejected]: (state, action) => {
      state.checkingForToken = false;
      state.isAuth = null;
      state.currentBranch = null;
      state.branches = null;
    },
  },
});
