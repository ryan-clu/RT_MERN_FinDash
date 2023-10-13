import { useMemo } from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import FlexBetween from '@/components/FlexBetween';
import {
  useGetProductsQuery,
  useGetKpisQuery,
  useGetTransactionsQuery,
} from '@/state/api';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import {
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Box, useTheme, Typography } from '@mui/material';

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  // console.log('🚀 ~ transactionData:', transactionData);

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `Other expenses besides ${key}`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);
  // console.log(`This is pieChartData`, pieChartData);

  const productColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'expense',
      headerName: 'Expense',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.67,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'productIds',
      headerName: 'Count',
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  return (
    <>
      {/* LIST OF PRODUCTS TABLE */}
      <DashboardBox gridArea='g'>
        <BoxHeader
          title='List of Products'
          sideText={`${productData?.length} products`}
        />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height='75%'
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      {/* RECENT ORDERS TABLE */}
      <DashboardBox gridArea='h'>
        <BoxHeader
          title='Recent Orders'
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt='1rem'
          p='0 0.5rem'
          height='80%'
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      {/* Expense Breakdown By Category */}
      <DashboardBox gridArea='i'>
        <BoxHeader title='Expense Breakdown by Category' sideText='+4%' />
        <FlexBetween mt='0rem' gap='0.5rem' p='0 1rem' textAlign='center'>
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  // stroke='none'
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey='value'
                >
                  {data.map((index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant='h5'>{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      {/* Overall Summary and Explanation Data */}
      <DashboardBox gridArea='j'>
        <BoxHeader title='Overall Summary & Explanation Data' sideText='+15%' />
        <Box
          height='15px'
          margin='1rem 1rem 0.4rem 1rem'
          bgcolor={palette.primary[800]}
          borderRadius='1rem'
        >
          <Box
            height='15px'
            bgcolor={palette.primary[600]}
            borderRadius='1rem'
            width='40%'
          ></Box>
        </Box>
        <Typography margin='0 1rem' variant='h6'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;

/* Notes
Reminder: we invoke the api useQueries here in Row3,
and on Row2 and Row1 files, but we are NOT making multiple
calls to our API/unnecessarily. 
- Redux Toolkit Queries allows us to make multiple calls
in any location and Redux will make sure we only call it
once - if the information is already there (in the store).
- Redux only re-updates that information when we set another 
API call to invalidate that information / particular tag.
- Invalidation = recalling that information just to get
the updated information from the back end.

- Using Datagrid tables here from MUI for List of Products
and Recent Orders.
- Cannot style Datagrid tables directly.
- Wrap Datagrid with Box wrapper also from MUI and style/sx
directly targeting child component (Datagrid) specific class
(class that dictates Datagrid styling)
- Google Chrome Element inspector to see what class you want
to target

182- {data.map((entry, index) => (
*/
