import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import ProfileAvatar from '../../components/ProfileAvatar';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return <Layout>{user && <ProfileAvatar username={user.username} avatar={user.avatar} />}</Layout>;
};

export default Profile;
