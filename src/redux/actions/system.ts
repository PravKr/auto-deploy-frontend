import { actions } from "../actionTypes";
import { _basePath } from "../../config/basePath";
import axios from "../../config/axios";

export const getSystemListAction = () => async (dispatch) => {
  try {
    dispatch({ type: actions.systemListLoading });
    const res = await axios.post("argo");
    const { data } = res;
    dispatch({ type: actions.systemList, payload: data });
  } catch (er) {
    dispatch({
      type: actions.systemListError,
      payload: "Something went wrong",
    });
  }
};

// Add System ( export or import)
export const addSystemAction = (values) => async (dispatch) => {
  try {
    dispatch({ type: actions.addSystemLoading });
    const res = await axios.post(`add/argo`, values);
    console.log(res);
    const { data } = res;
    if (Object.keys(data).length > 0) {
      dispatch({
        type: actions.addSystem,
        payload: "System Added Successfully",
      });
        
      await dispatch(getSystemListAction());
    }
  } catch (er) {
    dispatch({ type: actions.addSystemError, payload: "Something went wrong" });
  }
};

export const pingToSystemAction =
  (systemId) => async (dispatch) => {
    try {
      dispatch({ type: actions.pingSystemLoading });
      const res = await axios.post(`ping/argo/${systemId}`);
      console.log(res);
      const { data } = res;
      if (Object.keys(data).length > 0) {
        dispatch({ type: actions.pingSystem, payload: data });
      }
    } catch (er) {
      dispatch({
        type: actions.pingSystemError,
        payload: "Something went wrong",
      });
    }
  };

export const removeSystem =
  (connectedSystemId) => async (dispatch) => {
    try {
      dispatch({ type: actions.removeSystemLoading });
      const res = await axios.post(
        `remove/argo/${connectedSystemId}`
      );
      console.log(res);
      const { data } = res;
      if (Object.keys(data).length > 0) {
        dispatch({
          type: actions.removeSystem,
          payload: "System removed Successfully",
        });
        await dispatch(getSystemListAction());
      }
    } catch (er) {
      dispatch({
        type: actions.removeSystemError,
        payload: "Something went wrong",
      });
    }
  };

export const updateSystem = (values) => async (dispatch) => {
  try {
    dispatch({ type: actions.updateSystemLoading });
    const res = await axios.post(`add/argo`, values);
    const { data } = res;
    if (Object.keys(data).length > 0) {
      dispatch({
        type: actions.updateSystem,
        payload: "Export System updated Successfully",
      });
      await dispatch(getSystemListAction());
    }
  } catch (er) {
    dispatch({
      type: actions.updateSystemError,
      payload: "Something went wrong",
    });
  }
};

export const connectExportSystemAction = (e) => async (dispatch) => {
  try {
    dispatch({ type: actions.connectExportSystemLoading });
    //  const res = await axios.get('/v1/ad/argo/import')
    // const {data} = res
    dispatch({ type: actions.connectExportSystem, payload: "" });
  } catch (er) {
    dispatch({
      type: actions.connectExportSystemError,
      payload: "Something went wrong",
    });
  }
};

export const entitiesByIDAction =
  (id, connectedSystemType) => async (dispatch) => {
    try {
      dispatch({ type: actions.entitiesByIdLoading });
      const res = await axios.post(`/entities/${connectedSystemType}/${id}`);
      const { data } = res;
      dispatch({ type: actions.entitiesById, payload: data });
    } catch (er) {
      dispatch({
        type: actions.entitiesByIdError,
        payload: "Something went wrong",
      });
    }
  };

export const getHistory = (operation, id) => async (dispatch) => {
  try {
    dispatch({ type: actions.getHistoryLoading });
    const res = await axios.post(`/history/${operation}/${id}`);
    const { data } = res;
    dispatch({ type: actions.getHistory, payload: data });
  } catch (er) {
    dispatch({
      type: actions.getHistoryError,
      payload: "Something went wrong",
    });
  }
};

export const selectedEntitiesValuesByCategoryAction =
  (val) => async (dispatch) => {
    try {
      dispatch({
        type: actions.selectedEntitiesValuesByCategory,
        payload: val,
      });
    } catch (er) {
      dispatch({
        type: actions.selectedEntitiesValuesByCategoryError,
        payload: "Something went wrong",
      });
    }
  };

export const getHistoryByDate =
  (sys, operation, date) => async (dispatch) => {
    try {
      dispatch({ type: actions.getHistoryByDateLoading });
      const res = await axios.post(
        `/history/${operation}/${sys}/${date}`
      );
      const { data } = res;
      dispatch({ type: actions.getHistoryByDate, payload: data });
    } catch (er) {
      dispatch({
        type: actions.getHistoryByDateError,
        payload: "Something went wrong",
      });
    }
  };

  export const getImportSystemListByDate =
  (sys,operation, date) => async (dispatch) => {
    try {
      dispatch({ type: actions.getImportSystemListByDateLoading });
      var res;
      if(operation == 'import'){
        res = await axios.post(
          `/history/${operation}/${sys}/exportedSystem/${date}`
        );
      } else if(operation == 'export'){
        res = await axios.post(
          `/history/${operation}/${sys}/importedSystem/${date}`
        );
      }
      
      const { data } = res;
      dispatch({ type: actions.getImportSystemListByDate, payload: data });
    } catch (er) {
      dispatch({
        type: actions.getImportSystemListByDateError,
        payload: "Something went wrong",
      });
    }
  };

export const entityExportAction =
  (sys, historyDate) => async (dispatch) => {
    try {
      dispatch({ type: actions.entityExportLoading });
      const res = await axios.post(
        `/entities/${sys}/${historyDate}/export`
      );
      const { data } = res;
      const url = await window.URL.createObjectURL(new Blob([data]));
      const link = await document.createElement("a");
      link.href = url;
      await link.setAttribute("download", `${sys + '_' + historyDate}.xml`);
      await document.body.appendChild(link);
      await link.click();
    } catch (er) {
      dispatch({
        type: actions.entityExportError,
        payload: "Something went wrong",
      });
    }
  };

export const entityExportByHistoryDateAction =
  (sys, operation, historyDate) => async (dispatch) => {
    try {
      dispatch({ type: actions.entityExportByHistoryDateLoading });
      const res = await axios.post(
        `/history/${operation}/${sys}/${historyDate}/export`
      );
      const { data } = res;
      const url = await window.URL.createObjectURL(new Blob([data]));
      const link = await document.createElement("a");
      link.href = url;
      await link.setAttribute("download", `${sys + new Date()}.xml`);
      await document.body.appendChild(link);
      await link.click();
    } catch (er) {
      dispatch({
        type: actions.entityExportByHistoryDateError,
        payload: "Something went wrong",
      });
    }
  };

  export const downoladN4Plugins =
  () => async (dispatch) => {
    try {
      dispatch({ type: actions.entityExportByHistoryDateLoading });
      const res = await axios.post(
        `/download/n4Plugins`
      );
      const { data } = res;
      const url = await window.URL.createObjectURL(new Blob([data]));
      const link = await document.createElement("a");
      link.href = url;
      await link.setAttribute("download", `n4Plugins.xml`);
      await document.body.appendChild(link);
      await link.click();
    } catch (er) {
      dispatch({
        type: actions.entityExportByHistoryDateError,
        payload: "Something went wrong",
      });
    }
  };

  export const downloadHelp =
  () => async (dispatch) => {
    try {
      dispatch({ type: actions.entityExportByHistoryDateLoading });
      axios({
        url: '/download/help',
        method: 'POST',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'help.docx'); //or any other extension
        document.body.appendChild(link);
        link.click();
     });
    } catch (er) {
      dispatch({
        type: actions.entityExportByHistoryDateError,
        payload: "Something went wrong",
      });
    }
  };

export const importListCheckedAction = (val) => async (dispatch) => {
  try {
    dispatch({ type: actions.importListCheck, payload: val });
  } catch (er) {
    dispatch({
      type: actions.importListCheckError,
      payload: "Something went wrong",
    });
  }
};

export const importSystemAction =
  (sys, historyDate, ls, type) => async (dispatch) => {
    try {
      dispatch({ type: actions.importSystemLoading });
      if (type === "import") {
        const res = await axios.post(
          `/entities/${sys}/${historyDate}/import`,
          ls
        );
        const { data } = res;
        dispatch({ type: actions.importSystem, payload: data });
      }
    } catch (er) {
      dispatch({
        type: actions.importSystemError,
        payload: "Something went wrong",
      });
    }
  };

export const entityImportByHistoryDateAction =
  (sys, connectedSystemType, historyDate, ls, type) =>
  async (dispatch) => {
    try {
      dispatch({ type: actions.importByHistoryDateLoading });
      if (type === "import") {
        const res = await axios.post(
          `/history/${connectedSystemType}/${sys}/${historyDate}/import`,
          ls
        );
        const { data } = res;
        dispatch({ type: actions.importByHistoryDate, payload: data });
      }
    } catch (er) {
      dispatch({
        type: actions.importByHistoryDateError,
        payload: "Something went wrong",
      });
    }
  };

  export const rollbackFromHistoryAction =
  (sys, connectedSystemType, historyDate, ls) =>
  async (dispatch) => {
    try {
      dispatch({ type: actions.importByHistoryDateLoading });
        const res = await axios.post(
          `/history/${connectedSystemType}/${sys}/${historyDate}/rollback`,
          ls
        );
        const { data } = res;
        dispatch({ type: actions.importByHistoryDate, payload: data });
    } catch (er) {
      dispatch({
        type: actions.importByHistoryDateError,
        payload: "Something went wrong",
      });
    }
  };
