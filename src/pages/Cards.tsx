import React, { FC, useEffect, useMemo, useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ICards } from "../shared/consts/model";
import { cardsAPI } from "../services";
import { Badge, Button, Container, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { EStatus } from "../shared/consts/enum";
import Breadcrumb from "../components/breadcrumb";
import BreadcrumbItem from "../components/breadcrumb/BreadcrumbItem";
import { useStyles } from "../shared/utils/styles";
import CardFilter from "../components/filter/card";
import ReactPaginate from "react-paginate";
import { useCardsParams } from "../shared/context/card";
import { useTransactionsParams } from "../shared/context/transaction";

const headers: Array<string> = [
  "cardId",
  "cardAccount",
  "maskedCardNumber",
  "expireDate",
  "currency",
  "status",
  "balance",
  "transactions",
];

const breadcrumbsData = [
  {
    to: "/",
    active: false,
    title: "Home",
  },
  {
    to: "/cards",
    active: true,
    title: "Cards",
  },
];

const Cards: FC = () => {
  const classes = useStyles();
  const [cards, setCards] = useState<Array<ICards>>([]);

  const [perPage, setPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  let history = useHistory();

  const { transactionsParams, setTransactionsParams } = useTransactionsParams();
  const { cardsParams, setCardsParams } = useCardsParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await cardsAPI.get(cardsParams);
        setCards(response.data);
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

  const goToTransactions = (id: number) => {
    setTransactionsParams({
      transactionID: "",
      cardId: id,
      currency: "",
    });
    history.push(`/cards/${id}/transactions`);
  };

  const onSubmit = async (data: any) => {
    setCardsParams(data);

    try {
      const response = await cardsAPI.get(data);
      setCards(response.data);
      setPages(Math.ceil(response.data.length / perPage));
    } catch (err) {
      console.log(err);
    }
  };

  const tableHeaders = headers.map((item, i) => {
    return (
      <TableCell className={classes.th} key={i}>
        {item}
      </TableCell>
    );
  });

  const tableData = cards
    ?.slice(page * perPage, (page + 1) * perPage)
    .map((card, i) => {
      return (
        <TableRow key={i}>
          <TableCell>
            <Link to={`/cards/${card.cardId}`}>{card.cardId}</Link>
          </TableCell>
          <TableCell>{card.cardAccount}</TableCell>
          <TableCell>{card.maskedCardNumber}</TableCell>
          <TableCell>{card.expireDate}</TableCell>
          <TableCell>{card.currency}</TableCell>
          <TableCell>
            {
              <Badge
                badgeContent={card.status}
                color={`${
                  card.status === EStatus.ACTIVE ? "primary" : "error"
                }`}
              />
            }
          </TableCell>
          <TableCell>{card.balance}</TableCell>
          <TableCell>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              size="small"
              onClick={() => goToTransactions(card.cardId)}
            >
              Transactions
            </Button>
          </TableCell>
        </TableRow>
      );
    });

  const breadcrumbs = useMemo(
    () =>
      breadcrumbsData.map(({ to, active, title }, i) => {
        return (
          <BreadcrumbItem {...{ to, active }} key={i}>
            {title}
          </BreadcrumbItem>
        );
      }),
    [breadcrumbsData]
  );

  return (
    <>
      <Breadcrumb>{breadcrumbs}</Breadcrumb>
      <Container>
        <Typography className={classes.typog} component="h4" variant="h4">
          Cards
        </Typography>

        {/*  filter */}
        <CardFilter onSearch={onSubmit} searchParams={cardsParams} />

        {tableData.length ? (
          <>
            <TableContainer component={Paper}>
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
};

export default Cards;
