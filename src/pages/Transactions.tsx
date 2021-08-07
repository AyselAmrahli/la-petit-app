import React, { FC, useEffect, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ITransactions } from '../shared/consts/model';
import { transactionsAPI } from '../services';
import { Container, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import BreadcrumbItem from '../components/breadcrumb/BreadcrumbItem';
import Breadcrumb from '../components/breadcrumb';
import { useStyles } from '../shared/utils/styles';
import TransactionFilter from '../components/filter/transaction';
import ReactPaginate from 'react-paginate';

const breadcrumbsData = [
  {
    to: '/',
    active: false,
    title: 'Home'
  },
  {
    to: '/transactions',
    active: true,
    title: 'Transactions'
  }
]

interface IParams {
  cardId:  string;
}

const headers:Array<string> = ['transactionID','cardAccount','cardID','amount','currency','transactionDate','merchantInfo'];


const Transactions: FC = () => {
  const classes = useStyles();
  const [transactions, setTransaction] = useState<Array<ITransactions>>([]);
  const { cardId } = useParams<IParams>();
  const [perPage, setPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);

  useEffect(() => {
    // get transactions list
    (async () => {
      try {
        const response = await transactionsAPI.get({cardID: cardId});
        setTransaction(response.data);
        setPages(Math.ceil(response.data.length / perPage))
      } catch (err) {
          console.log(err)
      }
    })();

  },[]);

  const handlePageClick = (event: any) => {
    let page = event.selected;
    setPage(page);
  }

  const onSubmit = async (data:any) => {
    
    try {
      const response = await transactionsAPI.get(data);
      setTransaction(response.data);
      setPages(Math.ceil(response.data.length / perPage))
    } catch (err) {
        console.log(err)
    }

  };

  const breadcrumbs = breadcrumbsData.map(({to,active,title}, i) => {
    return (
      <BreadcrumbItem {...{to,active}} key={i}>
        {title}
      </BreadcrumbItem>
    )
  })

  
  // table headers
  const tableHeaders = headers.map((item, i) => {
    return <TableCell className={classes.th} key={i}>{item}</TableCell>
  });

  // table data transactions
  const tableData = transactions?.slice(page * perPage, (page + 1) * perPage).map((tran,i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <Link to={`/transactions/${tran.transactionID}`}>{tran.transactionID}</Link>
        </TableCell>
        <TableCell>{tran.cardAccount}</TableCell>
        <TableCell>
          <Link to={`/transactions/${tran.transactionID}/cards/${tran.cardID}`}>{tran.cardID}</Link>
        </TableCell>
        
        <TableCell>{tran.amount}</TableCell>
        <TableCell>{tran.currency}</TableCell>
        <TableCell>{tran.transactionDate}</TableCell>
        <TableCell>
          {tran.merchantInfo?.name} 
          <br/> category: {tran.merchantInfo?.category}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <Breadcrumb>{breadcrumbs}</Breadcrumb>
      <Container>
        <Typography className={classes.typog} component="h4" variant="h4">
          Transactions
        </Typography>

        {/*  filter */}
        <TransactionFilter onSearch={onSubmit} />
        {tableData.length? <>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">

            <TableHead>
              <TableRow>
                {tableHeaders}
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData}
            </TableBody>

          </Table>
        </TableContainer>

        <div className={classes.typog}>
          <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'next'}
            pageCount={pages}
            onPageChange={handlePageClick}
            containerClassName="gv-pagination"
            activeClassName="active"
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
          />
        </div>

      </> : 'No Data'}
      </Container>
    </>
  );
}

export default Transactions