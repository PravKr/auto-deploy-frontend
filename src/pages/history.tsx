import React, { useState, Fragment, useEffect, useCallback } from "react";
import Snackbar from "@material-ui/core/Snackbar";
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
import DialogBox from "../components/dialogBox";
import Button from "../components/button";
import Card from "../components/card";

import { importDialogBoxAction } from "../redux/actions/component";
import {
  importListCheckedAction,
  entityImportByHistoryDateAction,
  entityExportByHistoryDateAction,
  getImportSystemListByDate,
  rollbackFromHistoryAction,
} from "../redux/actions/system";

import { useSelector, useDispatch } from "react-redux";
import { getHistory, getHistoryByDate } from "../redux/actions/system";

function HistoryPage(props) {
  const dispatch = useDispatch();

  const { match } = props;

  const connectedSystemName = match.params.system;
  const connectedSystemType = match.params.type;

  const getImportSystemList = useSelector((state) => state.getImportSystemList);
  const getHistoryList = useSelector((state) => state.getHistoryByDate);
  const getHistoryy = useSelector((state) => state.getHistory);
  const importDialogBox = useSelector((state) => state.importDialogBox);
  const impSystem = useSelector((state) => state.importSystemList);
  const importListCheck = useSelector((state) => state.importListCheck);
  const entityImportByHistoryDate = useSelector(
    (state) => state.entityImportByHistoryDate
  );

  const { loading: importSystemLoading, importList = [] } = impSystem;
  const { trigger, type } = importDialogBox;
  const { active = [] } = importListCheck;
  const { loading: getHistoryLoading, histories = [] } = getHistoryy;
  const [isChecked, setChecked] = useState({});
  const [history, setHistory] = useState("");
  const [importSystem, setimportSystem] = useState("");
  const [importSystemMsgOpenSnack, setImportSystemMsgOpenSnack] =
    useState(true);
  const {
    loading: getHistoryListLoading,
    list = [],
    withGkey = {},
  } = getHistoryList;

  const { loading: getImportSystemListByDateLoading, importedSystems = [] } =
    getImportSystemList;

  const {
    msg: importSystemMsg,
    setMsg,
    loading: importSSystemLoading,
  } = entityImportByHistoryDate;

  const handleClose = () => {
    setImportSystemMsgOpenSnack(false);
  };

  useEffect(() => {
    dispatch(getHistory(connectedSystemName, connectedSystemType));
  }, [history]);

  const selectHistoryByDate = (e) => {
    e.preventDefault();
    setHistory(e.target.value);
    dispatch(
      getHistoryByDate(connectedSystemName, connectedSystemType, e.target.value)
    );
    dispatch(
      getImportSystemListByDate(
        connectedSystemName,
        connectedSystemType,
        e.target.value
      )
    );
  };

  const selectImportSystem = (e) => {
    setimportSystem(e.target.value);
  };

  const handleCloseImportDialogBox = () => {
    dispatch(importDialogBoxAction(false, ""));
    setChecked({});
    dispatch(importListCheckedAction({}));
  };

  const handleConfirmImport = (type) => {
    setImportSystemMsgOpenSnack(true);
    dispatch(
      entityImportByHistoryDateAction(
        connectedSystemName,
        connectedSystemType,
        history,
        active,
        type
      )
    );
  };

  const handleImportCheckbox = (e) => {
    setChecked({ ...isChecked, [e.target.id]: e.target.checked });
    dispatch(
      importListCheckedAction({ ...isChecked, [e.target.id]: e.target.checked })
    );
  };

  const handleImportExport = (type) => {
    if (type === "export") {
      dispatch(
        entityExportByHistoryDateAction(
          connectedSystemName,
          connectedSystemType,
          history
        )
      );
    }
    if (type === "import") {
      dispatch(importDialogBoxAction(true, "import"));
    }
  };

  const handleRollBack = () => {
    console.log(history, { id: importSystem });
    dispatch(
      rollbackFromHistoryAction(
        connectedSystemName,
        connectedSystemType,
        history,
        { id: importSystem }
      )
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
            label={`[ System Name: ${connectedSystemName}, System Type: ${connectedSystemType} ]`}
          />
        </div>
        <div className="action">
          {importSystem !== "" && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleRollBack()}
              label="Rollback"
            />
          )}
          {history !== "" && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleImportExport("import")}
              label="Import"
            />
          )}
          {history !== "" && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleImportExport("export")}
              label="Export"
            />
          )}
        </div>
      </div>
      {getHistoryLoading && <Loader />}
      <div className="heading">
        <Select
          label="Select Date"
          value={history}
          onChange={selectHistoryByDate}
          menu={histories}
        />
        {getImportSystemListByDateLoading && <Loader />}
        <Select
          label="Imported to System's"
          value={importSystem}
          onChange={selectImportSystem}
          menu={importedSystems}
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
      <DialogBox
        maxWidth="xl"
        title={`Total Import Systems ( ${importList.length} )`}
        open={trigger}
        handleClose={handleCloseImportDialogBox}
        content={
          <Fragment>
            {active.length > 0 && (
              <Typography
                variant="overline"
                label={`Products Selected : ${active.length}`}
              />
            )}
            <div className="import-list">
              {importList.map((e, i) => (
                <Card
                  avatar={e.id.charAt(0).toUpperCase()}
                  key={i}
                  title={e.id}
                  checkbox
                  checkBoxId={e.id}
                  checked={isChecked[e.id]}
                  onCheckBoxClick={handleImportCheckbox}
                  subHeader={`${e.operator}/${e.complex}/${e.facility}/${e.yard}`}
                />
              ))}
            </div>
          </Fragment>
        }
        action={
          <Fragment>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCloseImportDialogBox}
              label="Cancel"
            />
            {type === "import" ? (
              <Button
                variant="contained"
                disabled={!active.length}
                color="primary"
                onClick={() => handleConfirmImport("import")}
                label="Confirm Import"
              />
            ) : (
              <Button
                variant="contained"
                disabled={!active.length}
                color="primary"
                onClick={() => handleConfirmImport("export_import")}
                label="Confirm Export & Import"
              />
            )}
          </Fragment>
        }
      />
      {importSSystemLoading && <Loader />}
      {importSystemMsgOpenSnack && (
        <Snackbar
          open={importSystemMsg}
          onClose={handleClose}
          message={importSystemMsg}
        />
      )}
    </section>
  );
}
export default HistoryPage;
