import React from 'react';
import DashboardBox from '@/components/DashboardBox';

type Props = {};

const Row3 = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea='f'></DashboardBox>
      <DashboardBox gridArea='g'></DashboardBox>
      <DashboardBox gridArea='h'></DashboardBox>
      <DashboardBox gridArea='i'></DashboardBox>
    </>
  );
};

export default Row3;
