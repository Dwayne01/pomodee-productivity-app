import React, { useContext, useState } from 'react';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Layout from '../../components/Layout';
import { acceptFriendRequest, deleteRequest } from '../../services/request.services';
import styled from 'styled-components';
import { NotificationContext } from '../../context/NotificationContext';
import { handleGetNotification } from '../../util/getNotifications';
import { Link, useHistory } from 'react-router-dom';
import AvatarImg from '../../components/AvatarImg';

const MessageStyle = styled.div`
  padding: 10px;
  .notification-item {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr 2fr;
  }
  @media screen and (min-width: 1200px) {
    width: 80%;
  } ;
`;

const Notifications = () => {
  const { notifications, setNotifications } = useContext(NotificationContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { user } = useContext(NotificationContext);

  const handleDeny = async (requestID) => {
    const params = {
      requestID
    };

    setLoading(true);
    try {
      await deleteRequest(params);
      await handleGetNotification(user, setNotifications);
      history.replace('/notifications');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (data) => {
    const params = {
      requestID: data._id,
      userId: data.sendersId,
      friendId: data.userId
    };

    await acceptFriendRequest(params);

    setLoading(true);
    try {
      await deleteRequest(params);
      await handleGetNotification(user, setNotifications);
      history.replace('/notifications');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const BtnStyle = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    .btn-accept {
      color: #fff;
      border-radius: 20px;
      padding: 10px 20px;
      background: #f34506;
      cursor: pointer;
    }

    .btn-deny {
      color: #f34506;
      border-radius: 20px;
      padding: 10px 20px;
      border: 1px solid #f34506;
      cursor: pointer;
    }
  `;

  const NoteStyle = styled.div`
    padding-top: 10px;
    font-size: 14pt;
  `;

  const messageStyle = {
    display: 'grid',
    width: '80%',
    padding: 10,
    gridTemplateColumns: '1fr 4fr 1fr'
  };

  return (
    <Layout>
      {/* <Scrollbars> */}
      {loading && <Spin indicator={antIcon} />}
      {notifications.map((data) => (
        <MessageStyle>
          <div key={data._id} style={messageStyle} className="notification-item">
            <AvatarImg
              alt="userPic"
              style={{ borderRadius: 50 }}
              height={70}
              width={70}
              size={4}
              avatarId={data.avatar || 1}
            />

            {data.requestType === 'friend' ? (
              <NoteStyle>
                <b>{data.username}</b> wants to be your friend.
                <p>{moment(data.createdAt).fromNow()}</p>
              </NoteStyle>
            ) : (
              <NoteStyle>
                <b>{data.username}</b> wants you to join their room.
                <p>{moment(data.createdAt).fromNow()}</p>
              </NoteStyle>
            )}

            {data.requestType === 'friend' ? (
              <BtnStyle>
                <div>
                  <span className="btn-accept" onClick={() => handleAccept(data)}>
                    Accept
                  </span>
                </div>
                <div>
                  <span className="btn-deny" onClick={() => handleDeny(data._id)}>
                    Deny
                  </span>
                </div>
              </BtnStyle>
            ) : (
              <div style={{ transform: 'translateY(1rem) translateX(-3rem)' }}>
                <Link
                  style={{ background: '#f34506', padding: 10, color: '#fff', borderRadius: 50, fontSize: '14pt' }}
                  to={`/timer/${data.roomName}`}
                >
                  Join room
                </Link>
              </div>
            )}
          </div>
        </MessageStyle>
      ))}
      {/* </Scrollbars> */}
    </Layout>
  );
};

export default Notifications;
