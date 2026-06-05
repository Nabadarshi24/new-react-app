import {
  ComponentType,
  useCallback,
  useEffect
} from 'react';
import { MyOrders } from './parts/MyOrders';
import { useAccountStore } from '../../stores/GlobalStore';
import { getUserProfile } from '../../user/api';

const Profile = () => {

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
    <div className="tw:min-h-screen tw:flex tw:flex-col">
      <div className="tw:flex-grow tw:container tw:mx-auto tw:p-4 tw:md:p-6">
        <div className="tw:flex tw:flex-col tw:md:flex-row tw:md:space-x-6 tw:space-y-6 tw:md:space-y-0">
          <div className="tw:w-full tw:md:w-1/3 tw:lg:w-1/4 tw:shadow tw:rounded-lg tw:p-6 tw:bg-gray-50">
            <h1 className="tw:text-2xl tw:md:text-3xl tw:font-bold tw:mb-4">Profile</h1>
            <p className="tw:text-lg tw:text-gray-600 tw:mb-4">john.doe@example.com</p>
            <button className="tw:w-full tw:bg-red-500 tw:text-white tw:py-2 tw:rounded tw:hover:bg-red-600">Logout</button>
          </div>

          <div className="tw:w-full tw:md:w-2/3 tw:lg:w-3/4">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile as ComponentType;

