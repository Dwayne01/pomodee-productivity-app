import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import StatsChart from '../../components/StatsChart';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';

const ChartContainer = styled.div`
  margin-top: 150px;
  width: 85vw;

  @media screen and (min-width: 1200px) {
    position: unset;
    width: 50vw;
    margin-top: 0%;
    margin-left: 8%;
    h2 {
      font-size: 2rem;
    }
    p {
      font-size: 1.1rem;
    }
    img {
      left: 47%;
    }
  } ;
`;

const Analysis = () => {
  const { isSignedIn, user } = useContext(AuthContext);

  return (
    <Layout>
      {isSignedIn && (
        <>
          <ChartContainer>
            <StatsChart user={user} />
          </ChartContainer>
        </>
      )}
    </Layout>
  );
};

export default Analysis;
