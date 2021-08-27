import React, { Fragment, useState, useEffect, useLayoutEffect } from "react";
import Select from "../components/select";
import Snackbar from "@material-ui/core/Snackbar";
import { useInputString, useToggle } from "../components/input";
import { useSelector, useDispatch } from "react-redux";
import {
  getSystemListAction,
  updateSystem,
  connectExportSystemAction,
  addSystemAction,
  removeSystem,
  pingToSystemAction,
} from "../redux/actions/system";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Card from "../components/card";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import Divider from "../components/divider";
import Typography from "../components/typography";
import DialogBox from "../components/dialogBox";
import Button from "../components/button";
import Textfield from "../components/textfield";
import Loader from "../components/loader";

function Homepage() {
  const dispatch = useDispatch();

  const expSystem = useSelector((state) => state.exportSystemList);
  const updateExp = useSelector((state) => state.updateSystem);
  const connectExp = useSelector((state) => state.connectExportSystem);
  const addSystem = useSelector((state) => state.addSystem);
  const pingSystem = useSelector((state) => state.pingSystem);

  useEffect(() => {
    dispatch(getSystemListAction());
  }, []);

  const [value, setValue] = useState("all");
  const [t, st] = useState(false);
  const [addSystemDialogBox, setAddSystem] = useState(false);
  const [pingSystemMsgOpenSnack, setPingSystemMsgOpenSnack] = useState(true);
  const [expUpdateOpenSnack, setExpUpdateOpenSnack] = useState(true);
  const [addSystemMsgOpenSnack, setAddSystemMsgOpenSnack] = useState(true);
  const { exportList, loading: expLoading } = expSystem;
  const { msg: addSystemMsg, loading: addSystemLoading } = addSystem;
  const { msg: expUpdate, loading: expUpdateLoading } = updateExp;
  const { msg: pingSystemMsg, loading: pingSystemLoading } = pingSystem;

  const {
    value: updateId,
    setValue: setId,
    reset: resetId,
  } = useInputString("");
  const {
    value: updateType,
    setValue: setType,
    reset: resetType,
  } = useInputString("");

  const {
    value: updateComplex,
    setValue: setComplex,
    bind: bindUpdateComplex,
    reset: resetComplex,
  } = useInputString("");
  const {
    value: updateFacility,
    setValue: setFacility,
    bind: bindUpdateFacility,
    reset: resetFacility,
  } = useInputString("");
  const {
    value: updateOperator,
    setValue: setOperator,
    bind: bindUpdateOperator,
    reset: resetOperator,
  } = useInputString("");
  const {
    value: updateYard,
    setValue: setYard,
    bind: bindUpdateYard,
    reset: resetYard,
  } = useInputString("");
  const {
    value: updateEndPoint,
    setValue: setEndPoint,
    bind: bindUpdateEndPoint,
    reset: resetEndPoint,
  } = useInputString("");
  const {
    value: updateUsername,
    setValue: setUsername,
    bind: bindUpdateUsername,
    reset: resetUsername,
  } = useInputString("");
  const {
    value: updatePassword,
    setValue: setPassword,
    bind: bindUpdatePassword,
    reset: resetPassword,
  } = useInputString("");

  const {
    value: addId,
    bind: bindAddId,
    reset: resetAddId,
  } = useInputString("");
  const {
    value: addComplex,
    bind: bindAddComplex,
    reset: resetAddComplex,
  } = useInputString("");
  const {
    value: addFacility,
    bind: bindAddFacility,
    reset: resetAddFacility,
  } = useInputString("");
  const {
    value: addOperator,
    bind: bindAddOperator,
    reset: resetAddOperator,
  } = useInputString("");
  const {
    value: addYard,
    bind: bindAddYard,
    reset: resetAddYard,
  } = useInputString("");
  const {
    value: addEndPoint,
    bind: bindAddEndPoint,
    reset: resetAddEndPoint,
  } = useInputString("");
  const {
    value: addUsername,
    bind: bindAddUsername,
    reset: resetAddUsername,
  } = useInputString("");
  const {
    value: addPassword,
    bind: bindAddPassword,
    reset: resetAddPassword,
  } = useInputString("");

  const handleSnackClose = () => {
    setPingSystemMsgOpenSnack(false);
    setExpUpdateOpenSnack(false);
    setAddSystemMsgOpenSnack(false);
  };

  const handleCloseDialogBox = () => {
    st(false);
    resetComplex();
    resetFacility();
    resetOperator();
    resetYard();
    resetId();
    resetType();
    resetEndPoint();
    resetUsername();
    resetPassword();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "export") dispatch(getSystemListAction());
    if (newValue === "all") {
      dispatch(getSystemListAction());
    }
  };

  const handlePingActionClick = (systemId) => {
    dispatch(pingToSystemAction(systemId));
    setPingSystemMsgOpenSnack(true);
  };

  const handleShow = (e, type) => {
    st(true);
    setType(type);
    setId(updateId || e.id);
    setComplex(updateComplex || e.complex);
    setFacility(updateFacility || e.facility);
    setOperator(updateOperator || e.operator);
    setYard(updateYard || e.yard);
    setEndPoint(updateEndPoint || e.endPoint);
    setUsername(updateUsername || e.username);
    setPassword(updatePassword || e.password);
  };

  const handleSystemAdd = (e) => {
    e.preventDefault();
    setAddSystemMsgOpenSnack(true);
    dispatch(
      addSystemAction({
        id: addId,
        complex: addComplex,
        endPoint: addEndPoint,
        facility: addFacility,
        operator: addOperator,
        password: addPassword,
        username: addUsername,
        yard: addYard,
      })
    );
  };

  const handleResetAddSystem = (e) => {
    e.preventDefault();
    resetAddId();
    resetAddComplex();
    resetAddFacility();
    resetAddOperator();
    resetAddYard();
    resetAddEndPoint();
    resetAddUsername();
    resetAddPassword();
  };

  const handleCloseSystemAddDialogBox = (e) => {
    setAddSystem(false);
    resetAddId();
    resetAddComplex();
    resetAddFacility();
    resetAddOperator();
    resetAddYard();
    resetAddEndPoint();
    resetAddUsername();
    resetAddPassword();
  };

  const handleOpenSystemUpdateDialogBox = (e) => {
    setAddSystem(true);
  };

  const handleRemoveSystem = (connectedSystemId) => {
    dispatch(removeSystem(connectedSystemId));
    //dispatch(getSystemListAction());
  };

  const handleMyCartClick = (connectedSystemType, connectedSystemId) => {
    console.log("my cart");
    //dispatch(removeSystem(connectedSystemType, connectedSystemId))
  };

  const handleSystemUpdate = (e) => {
    e.preventDefault();
    setExpUpdateOpenSnack(true);
      dispatch(
        updateSystem({
          id: updateId,
          complex: updateComplex,
          endPoint: updateEndPoint,
          facility: updateFacility,
          operator: updateOperator,
          password: updatePassword,
          username: updateUsername,
          yard: updateYard,
        })
      );
  };

  return (
    <Fragment>
      <section className="homepage">
        <div className="system-panel">
            <div className="right-navigation">
              <Button
                onClick={handleOpenSystemUpdateDialogBox}
                variant="contained"
                type="submit"
                color="primary"
                label="Add System"
              />
            </div>
            <Typography variant="h6" label="N4 Enviroments" />
          <div className="flex-list">
            {(exportList || []).map((e, i) => (
              <Card
                avatar={e.id.charAt(0).toUpperCase()}
                linkLabel="Visit"
                linkLabelLink={`/export/${e.id}`}
                key={i}
                onShowIconClick={() => handleShow(e, "exp")}
                title={e.id}
                subHeader={`${e.operator}/${e.complex}/${e.facility}/${e.yard}`}
                action
                pingActionsLabel="Ping"
                pingActionClick={() =>
                  handlePingActionClick(e.id)
                }
                deleteIcon
                onRemoveClick={() => handleRemoveSystem(e.id)}
                myCartIcon
                onMyCartIconLebel={`/export/${e.id}/homepage/cart`}
                historyIcon
                historyIconLebelLink={`history/export/${e.id}`}
              />
            ))}
          </div>
          <DialogBox
            handleClose={handleCloseDialogBox}
            open={t}
            title="Update System"
            maxWidth="sm"
            content={
              <Fragment>
                <form onSubmit={handleSystemUpdate}>
                  <Textfield
                    type="text"
                    required
                    label="Operator"
                    {...bindUpdateOperator}
                  />
                  <Textfield
                    type="text"
                    required
                    label="Complex"
                    {...bindUpdateComplex}
                  />
                  <Textfield
                    type="text"
                    required
                    label="Facility"
                    {...bindUpdateFacility}
                  />
                  <Textfield
                    type="text"
                    required
                    label="Yard"
                    {...bindUpdateYard}
                  />
                  <Textfield
                    type="text"
                    required
                    label="End Point"
                    {...bindUpdateEndPoint}
                  />
                  <Textfield
                    type="text"
                    required
                    label="Username"
                    {...bindUpdateUsername}
                  />
                  <Textfield
                    type="password"
                    required
                    label="Password"
                    {...bindUpdatePassword}
                  />
                  {(expUpdateLoading) && <Loader />}
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    label="Update"
                  />
                </form>
              </Fragment>
            }
          />
          <DialogBox
            handleClose={handleCloseSystemAddDialogBox}
            open={addSystemDialogBox}
            title="Add System"
            maxWidth="sm"
            content={
              <Fragment>
                <form onSubmit={handleSystemAdd}>
                  <Textfield type="text" required label="ID" {...bindAddId} />
                  <Textfield
                    type="text"
                    required
                    label="Operator"
                    {...bindAddOperator}
                  />
                  <Textfield
                    type="text"
                    required
                    label="Complex"
                    {...bindAddComplex}
                  />
                  <Textfield
                    type="text"
                    required
                    label="Facility"
                    {...bindAddFacility}
                  />
                  <Textfield
                    type="text"
                    required
                    label="Yard"
                    {...bindAddYard}
                  />
                  <Textfield
                    type="text"
                    required
                    label="End Point"
                    {...bindAddEndPoint}
                  />
                  <Textfield
                    type="text"
                    required
                    label="Username"
                    {...bindAddUsername}
                  />
                  <Textfield
                    type="password"
                    required
                    label="Password"
                    {...bindAddPassword}
                  />
                  {addSystemLoading && <Loader />}
                  <Button
                    variant="contained"
                    disabled={
                      addSystemLoading ||
                      !bindAddId ||
                      !addComplex ||
                      !addFacility ||
                      !addOperator ||
                      !addYard ||
                      !addEndPoint ||
                      !addUsername ||
                      !addPassword
                    }
                    type="submit"
                    color="primary"
                    label="Add"
                  />
                  <Button
                    variant="outlined"
                    disabled={addSystemLoading}
                    onClick={handleResetAddSystem}
                    color="primary"
                    label="Reset"
                  />
                </form>
              </Fragment>
            }
          />
        </div>
        {pingSystemLoading && <Loader/>}
        {pingSystemMsgOpenSnack && (
          <Snackbar
            open={pingSystemMsg}
            onClose={handleSnackClose}
            message={pingSystemMsg}
          />)
        }
        {expUpdateOpenSnack && (
          <Snackbar
            open={expUpdate}
            autoHideDuration={6000}
            onClose={handleSnackClose}
            message={expUpdate}
          />
        )}
        {addSystemMsgOpenSnack && (
          <Snackbar
            open={addSystemMsg}
            onClose={handleSnackClose}
            message={addSystemMsg}
          />
        )}
      </section>
    </Fragment>
  );
}
export default Homepage;
