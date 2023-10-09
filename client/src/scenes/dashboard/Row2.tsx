import React from 'react';
import DashboardBox from '@/components/DashboardBox';

type Props = {};

const Row2 = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea='j'></DashboardBox>
      <DashboardBox gridArea='d'></DashboardBox>
      <DashboardBox gridArea='e'></DashboardBox>
    </>
  );
};

export default Row2;
