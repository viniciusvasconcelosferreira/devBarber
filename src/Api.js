import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
  checkToken: async token => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });
    return await req.json();
  },
  singIn: async (email, password) => {
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    return await req.json();
  },
  singUp: async (name, email, password) => {
    const req = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });
    return await req.json();
  },
  getBarbers: async (lat = null, lng = null, address = null) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(
      `${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`,
    );
    return await req.json();
  },
};
