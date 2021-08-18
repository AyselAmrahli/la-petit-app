import React, { FC, Fragment, useEffect, useState } from "react";

import { transactionsAPI } from "../services";
import { Container, Typography } from "@material-ui/core";
import Breadcrumb from "../components/breadcrumb";
import BreadcrumbItem from "../components/breadcrumb/BreadcrumbItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Link, useParams } from "react-router-dom";
import { useStyles } from "../shared/utils/styles";
import { ITransactions } from "../shared/consts/model";

interface IParams {
  transactionId: string;
}

const TransactionDetail: FC = () => {
  const classes = useStyles();
  const [detail, setDetail] = useState<Array<ITransactions>>([]);
  const { transactionId } = useParams<IParams>();

  const breadcrumbsData = [
    {
      to: "/",
      active: false,
      title: "Home",
    },
    {
      to: "/transactions",
      active: false,
      title: "Transactions",
    },
    {
      active: true,
      title: transactionId,
    },
  ];

  useEffect(() => {
    // get transaction detail
    (async () => {
      try {
        const response = await transactionsAPI.detail(transactionId);
        setDetail(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const breadcrumbs = breadcrumbsData.map(({ to, active, title }, i) => {
    return (
      <BreadcrumbItem {...{ to, active }} key={i}>
        {title}
      </BreadcrumbItem>
    );
  });

  const transactionDetail = detail?.map((item, index) => {
    return (
      <Fragment key={index}>
        <ListItem>
          {" "}
          <Link
            className="detail-link"
            to={`/transactions/${item.transactionID}/cards/${item.cardId}`}
          >
            Go Card Detail
          </Link>
        </ListItem>
        <ListItem>
          {" "}
          <Link
            className="detail-link "
            to={`/transactions/?cardId=${item.cardId}`}
          >
            Show other transactions
          </Link>
        </ListItem>

        <ListItem className={classes.listItem}>
          Amount:
          <ListItemText className={classes.listText} primary={item.amount} />
        </ListItem>

        <ListItem className={classes.listItem}>
          Card account:
          <ListItemText
            className={classes.listText}
            primary={item.cardAccount}
          />
        </ListItem>

        <ListItem className={classes.listItem}>
          Currency:
          <ListItemText className={classes.listText} primary={item.currency} />
        </ListItem>

        <ListItem className={classes.listItem}>
          Merchant:
          <ListItemText
            className={classes.listText}
            primary={`${item.merchantInfo.name} / ${item.merchantInfo.category}`}
          />
        </ListItem>

        <ListItem className={classes.listItem}>
          Transaction Date:
          <ListItemText
            className={classes.listText}
            primary={item.transactionDate}
          />
        </ListItem>
      </Fragment>
    );
  });

  return (
    <>
      <Breadcrumb>{breadcrumbs}</Breadcrumb>
      <Container>
        <Typography className={classes.typog} component="h4" variant="h4">
          Transaction Detail
        </Typography>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          {transactionDetail}
        </List>
      </Container>
    </>
  );
};

export default TransactionDetail;
