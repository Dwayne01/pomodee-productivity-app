import { getFriendsRequests } from '../services/request.services';

export const handleGetNotification = async (user, setNotifications) => {
  if (user) {
    const result = await getFriendsRequests(user._id);

    if (result) {
      setNotifications(result);
    }
  }
};
