import React, { FC, Fragment, useEffect, useState } from 'react';

import { ICards, ITransactions } from '../shared/consts/model';
import { cardsAPI, transactionsAPI } from '../services';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import Breadcrumb from '../components/breadcrumb';
import BreadcrumbItem from '../components/breadcrumb/BreadcrumbItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Link, useParams } from 'react-router-dom';
import { useStyles } from '../shared/utils/styles';
import { useTransactionsParams } from '../shared/context/transaction';
import ReactPaginate from 'react-paginate';

interface IParams {
    cardId:  string;
}

const headers: Array<string> = [
  "transactionID",
  "cardAccount",
  "amount",
  "currency",
  "transactionDate",
  "merchantInfo",
];

const CardDetail: FC = () => {
  const classes = useStyles();
  const [transactions, setTransaction] = useState<Array<ITransactions>>([]);
  const [detail, setDetail] = useState<Array<ICards>>([]);
  const { cardId } = useParams<IParams>();

  const [perPage, setPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);

  const { transactionsParams, setTransactionsParams } = useTransactionsParams();


const breadcrumbsData = [
  {
    to: '/',
    active: false,
    title: 'Home'
  },
  {
    to: '/cards',
    active: false,
    title: 'Cards'
  },
  {
    active: true,
    title: cardId
    }
]

  useEffect(() => {

    // get cards detail
    (async () => {
      try {
        const response = await cardsAPI.detail(cardId);
        setDetail(response.data);
      } catch (err) {
          console.log(err)
      }
    })();

  },[]);

  useEffect(() => {
    // get transactions list
    setTransactionsParams({...transactionsParams, cardId});
    (async () => {
      try {
        const response = await transactionsAPI.get({...transactionsParams, cardId});
        setTransaction(response.data);
        setPages(Math.ceil(response.data.length / perPage));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handlePageClick = (event: any) => {
    let page = event.selected;
    setPage(page);
  };


  const breadcrumbs = breadcrumbsData.map(({to,active,title}, i) => {
    return (
      <BreadcrumbItem {...{to,active}} key={i}>
        {title}
      </BreadcrumbItem>
    )
  });

    // table headers
    const tableHeaders = headers.map((item, i) => {
      return (
        <TableCell className={classes.th} key={i}>
          {item}
        </TableCell>
      );
    });

  // card detail
  const cardDetail = detail?.map((item, index) => {
    return (
      <Fragment key={index}>
        <ListItem className={classes.listItem}>
          Card number:    
          <ListItemText className={classes.listText} primary={item.cardAccount} />
        </ListItem>

        <ListItem className={classes.listItem}>
          Card account:
          <ListItemText className={classes.listText} primary={item.maskedCardNumber} />
        </ListItem>


        <ListItem className={classes.listItem}>
          Currency:
          <ListItemText className={classes.listText} primary={item.currency} />
        </ListItem>

        <ListItem className={classes.listItem}>
          Balance:
          <ListItemText className={classes.listText} primary={item.balance} />
        </ListItem>

        <ListItem className={classes.listItem}>
          Status:
          <ListItemText className={classes.listText} primary={item.status} />
        </ListItem>
        
        <ListItem className={classes.listItem}>
          Expired Date:
          <ListItemText className={classes.listText} primary={item.expireDate} />
        </ListItem>
      </Fragment>
    )
  });

  // table data transactions
  const tableData = transactions
    ?.slice(page * perPage, (page + 1) * perPage)
    .map((tran, i) => {
      return (
        <TableRow key={i}>
          <TableCell>
            <Link to={`/transactions/${tran.transactionID}`}>
              {tran.transactionID}
            </Link>
          </TableCell>
          <TableCell>{tran.cardAccount}</TableCell>
          <TableCell>{tran.amount}</TableCell>
          <TableCell>{tran.currency}</TableCell>
          <TableCell>{tran.transactionDate}</TableCell>
          <TableCell>
            {tran.merchantInfo?.name}
            <br /> category: {tran.merchantInfo?.category}
          </TableCell>
        </TableRow>
      );
    });


  return (
      <>
        <Breadcrumb>{breadcrumbs}</Breadcrumb>
        <Container>
        <Typography className={classes.typog} component="h4" variant="h4">
            Card Detail
        </Typography>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          {cardDetail}
   
        </List>

        {tableData.length ? (
          <>
            <TableContainer className={classes.typog} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>{tableHeaders}</TableRow>
                </TableHead>

                <TableBody>{tableData}</TableBody>
              </Table>
            </TableContainer>

            <div className={classes.typog}>
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                pageCount={pages}
                onPageChange={handlePageClick}
                containerClassName="gv-pagination"
                activeClassName="active"
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
              />
            </div>
          </>
        ) : (
          "No Data"
        )}

        </Container>
      </>
  );
}

export default CardDetail