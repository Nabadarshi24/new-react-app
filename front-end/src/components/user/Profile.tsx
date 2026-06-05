// import React from 'react';
import { useEffect } from 'react';
import { useAccountStore } from '../stores/GlobalStore';
import { getUserProfile } from './api';

export const Profile = () => {

  const setLoading = useAccountStore(store => store.setIsLoading);

  const onMount = async () => {
    // TODO: Implement profile loading logic
    try {
      setLoading(true);
      
      const response = await getUserProfile();
      console.log(response);
    } catch (error) {
      console.error('Profile loading error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  return (
    <div>Profile</div>
  );
};
