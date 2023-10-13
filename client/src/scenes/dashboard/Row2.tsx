import { useMemo } from 'react';
import DashboardBox from '@/components/DashboardBox';
import { useGetProductsQuery, useGetKpisQuery } from '@/state/api';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  Cell,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Box, useTheme, Typography } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';
import FlexBetween from '@/components/FlexBetween';

const pieData = [
  { name: 'Group A', value: 600 },
  { name: 'Group B', value: 400 },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  // console.log('🚀 ~ operationalData:', operationalData);
  // console.log('🚀 ~ productData:', productData);

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            'Operational Expenses': operationalExpenses,
            'Non Operational Expenses': nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      {/* OPERATIONAL VS NON-OPERATIONAL EXPENSES LINE CHART */}
      <DashboardBox gridArea='d'>
        <BoxHeader
          title='Operational vs. Non-Operational Expenses'
          subtitle='Comparison of expenditure.'
          sideText='+1.5%'
        />
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey='name'
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId='left'
              orientation='left'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId='right'
              orientation='right'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <Tooltip />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='Non Operational Expenses'
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='Operational Expenses'
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* CAMPAIGNS & TARGETS PIE CHART */}
      <DashboardBox gridArea='e'>
        <BoxHeader title='Campaigns & Targets' sideText='+4%' />
        <FlexBetween mt='0.25rem' gap='1.5rem' pr='1rem'>
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              // stroke='none'
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey='value'
            >
              {pieData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml='-0.7rem' flexBasis='40%' textAlign='center'>
            <Typography variant='h5'>Target Sales</Typography>
            <Typography m='0.3rem 0' variant='h3' color={palette.primary[300]}>
              85
            </Typography>
            <Typography variant='h6'>
              Financial goals of the campaign that is desired.
            </Typography>
          </Box>
          <Box flexBasis='40%'>
            <Typography variant='h5'>Losses in Revenue</Typography>
            <Typography variant='h6'>Losses are down 23%.</Typography>
            <Typography variant='h5' mt='0.4rem'>
              Profit Margins
            </Typography>
            <Typography variant='h6'>
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      {/* PRODUCT PRICES VS EXPENSES SCATTERPLOT */}
      <DashboardBox gridArea='f'>
        <BoxHeader title='Product Prices vs. Expenses' sideText='+2%' />
        <ResponsiveContainer width='100%' height='100%'>
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type='number'
              dataKey='price'
              name='price'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type='number'
              dataKey='expense'
              name='expense'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type='number' range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name='Product Expense Ratio'
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;

/*
142 - {pieData.map((entry, index) => (
*/