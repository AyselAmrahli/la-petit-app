import React, { FC, Fragment, useEffect, useState } from 'react';

import { ICards } from '../shared/consts/model';
import { cardsAPI } from '../services';
import { Container, Typography } from '@material-ui/core';
import Breadcrumb from '../components/breadcrumb';
import BreadcrumbItem from '../components/breadcrumb/BreadcrumbItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useParams } from 'react-router-dom';
import { useStyles } from '../shared/utils/styles';

interface IParams {
    cardId:  string;
}


const CardDetail: FC = () => {
  const classes = useStyles();
  const [detail, setDetail] = useState<Array<ICards>>([]);
  const { cardId } = useParams<IParams>();


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


  const breadcrumbs = breadcrumbsData.map(({to,active,title}, i) => {
    return (
      <BreadcrumbItem {...{to,active}} key={i}>
        {title}
      </BreadcrumbItem>
    )
  });

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

        </Container>
      </>
  );
}

export default CardDetail