import React, { useState, Fragment, useEffect, useCallback } from "react";
import Typography from "../components/typography";
import Select from "../components/select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loader from "../components/loader";
import HistoryIcon from "@material-ui/icons/History";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { getHistory, getHistoryByDate } from "../redux/actions/system";

function HistoryPage(props) {
  const dispatch = useDispatch();

  const { match } = props;

  const connectedSystemName = match.params.system;
  const connectedSystemType = match.params.type;

  const getHistoryList = useSelector((state) => state.getHistoryByDate);
  const getHistoryy = useSelector((state) => state.getHistory);

  const { loading: getHistoryLoading, histories = [] } = getHistoryy;
  const [category, setCategory] = useState("");
  const {
    loading: getHistoryListLoading,
    list = [],
    withGkey = {},
  } = getHistoryList;

  useEffect(() => {
    dispatch(getHistory(connectedSystemName, connectedSystemType));
  }, [category]);

  const selectHistoryByDate = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    dispatch(
      getHistoryByDate(connectedSystemName, connectedSystemType, e.target.value)
    );
  };

  return (
    <section className="connected-system">
      <div className="heading">
        <div className="left">
          <Tooltip title="History">
            <IconButton size="medium">
              <HistoryIcon />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h5"
            label={`[ System Name: ${connectedSystemName}, System Type: ${connectedSystemType} ]`}
          />
        </div>
      </div>
      {getHistoryLoading && <Loader />}
      <div className="heading">
        <Select
          label="Select Date"
          value={category}
          onChange={selectHistoryByDate}
          menu={histories}
        />
      </div>
      {getHistoryListLoading && <Loader />}
      {list.map((el, i) => (
        <div key={i}>
          {(el.values || []).length > 0 && (
            <Fragment>
              <TableContainer component={Paper} key={i}>
                <Table
                  style={{ tableLayout: "fixed", fontSize: "15px" }}
                  size="small"
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" colSpan={3}>
                        <Typography variant="h6" label={el.category} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {(el.header || []).map((e, i) => (
                        <TableCell key={i}>{e}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(el.values || []).map((e, i) => (
                      <TableRow key={i}>
                        {(e || []).map((ee, ii) => (
                          <TableCell key={ii} component="th" scope="row">
                            {ee}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fragment>
          )}
        </div>
      ))}
    </section>
  );
}
export default HistoryPage;
