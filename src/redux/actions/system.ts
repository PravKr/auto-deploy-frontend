import { actions } from "../actionTypes";
import { _basePath } from "../../config/basePath";
import axios from "../../config/axios";

export const exportSystemListAction = () => async (dispatch) => {
  try {
    dispatch({ type: actions.exportSystemListLoading });
    const res = await axios.post("argo/export");
    const { data } = res;
    dispatch({ type: actions.exportSystemList, payload: data });
  } catch (er) {
    dispatch({
      type: actions.exportSystemListError,
      payload: "Something went wrong",
    });
  }
};

export const importSystemListAction = () => async (dispatch) => {
  try {
    dispatch({ type: actions.importSystemListLoading });
    const res = await axios.post("argo/import");
    const { data } = res;
    dispatch({ type: actions.importSystemList, payload: data });
  } catch (er) {
    dispatch({
      type: actions.importSystemListError,
      payload: "Something went wrong",
    });
  }
};

// Add System ( export or import)
export const addSystemAction = (type, values) => async (dispatch) => {
  try {
    dispatch({ type: actions.addSystemLoading });
    const res = await axios.post(`add/argo/${type}`, values);
    console.log(res);
    const { data } = res;
    if (Object.keys(data).length > 0) {
      dispatch({
        type: actions.addSystem,
        payload: "System Added Successfully",
      });
      if (type === "export") {
        await dispatch(exportSystemListAction());
      }
      if (type === "import") {
        await dispatch(importSystemListAction());
      }
    }
  } catch (er) {
    dispatch({ type: actions.addSystemError, payload: "Something went wrong" });
  }
};

export const pingToSystemAction =
  (systemType, systemId) => async (dispatch) => {
    try {
      dispatch({ type: actions.pingSystemLoading });
      const res = await axios.post(`ping/argo/${systemType}/${systemId}`);
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
  (connectedSystemType, connectedSystemId) => async (dispatch) => {
    try {
      dispatch({ type: actions.removeSystemLoading });
      const res = await axios.post(
        `remove/argo/${connectedSystemType}/${connectedSystemId}`
      );
      console.log(res);
      const { data } = res;
      if (Object.keys(data).length > 0) {
        dispatch({
          type: actions.removeSystem,
          payload: "System removed Successfully",
        });
        if (connectedSystemType === "export") {
          await dispatch(exportSystemListAction());
        }
        if (connectedSystemType === "import") {
          await dispatch(importSystemListAction());
        }
      }
    } catch (er) {
      dispatch({
        type: actions.removeSystemError,
        payload: "Something went wrong",
      });
    }
  };

export const updateExportSystemAction = (values) => async (dispatch) => {
  try {
    dispatch({ type: actions.updateExportSystemLoading });
    const res = await axios.post(`add/argo/export`, values);
    const { data } = res;
    if (Object.keys(data).length > 0) {
      dispatch({
        type: actions.updateExportSystem,
        payload: "Export System updated Successfully",
      });
      await dispatch(exportSystemListAction());
    }
  } catch (er) {
    dispatch({
      type: actions.updateExportSystemError,
      payload: "Something went wrong",
    });
  }
};

export const updateImportSystemAction = (values) => async (dispatch) => {
  try {
    dispatch({ type: actions.updateImportSystemLoading });
    const res = await axios.post(`add/argo/import`, values);
    const { data } = res;
    if (Object.keys(data).length > 0) {
      dispatch({
        type: actions.updateImportSystem,
        payload: "Import System updated Successfully",
      });
      await dispatch(importSystemListAction());
    }
  } catch (er) {
    dispatch({
      type: actions.updateImportSystemError,
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

export const getHistory = (id, connectedSystemType) => async (dispatch) => {
  try {
    dispatch({ type: actions.getHistoryLoading });
    const res = await axios.post(`/history/${connectedSystemType}/${id}`);
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
  (sys, connectedSystemType, date) => async (dispatch) => {
    try {
      dispatch({ type: actions.getHistoryByDateLoading });
      const res = await axios.post(
        `/history/${connectedSystemType}/${sys}/${date}`
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

export const entityExportAction =
  (sys, connectedSystemType, historyDate) => async (dispatch) => {
    try {
      dispatch({ type: actions.entityExportLoading });
      const res = await axios.post(
        `/entities/${connectedSystemType}/${sys}/${historyDate}/export`
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
        type: actions.entityExportError,
        payload: "Something went wrong",
      });
    }
  };

export const entityExportByHistoryDateAction =
  (sys, connectedSystemType, historyDate) => async (dispatch) => {
    try {
      dispatch({ type: actions.entityExportByHistoryDateLoading });
      const res = await axios.post(
        `/history/${connectedSystemType}/${sys}/${historyDate}/export`
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
  (sys, connectedSystemType, historyDate, ls, type) => async (dispatch) => {
    try {
      dispatch({ type: actions.importSystemLoading });
      if (type === "import") {
        const res = await axios.post(
          `/entities/${connectedSystemType}/${sys}/${historyDate}/import`,
          ls
        );
        const { data } = res;
        dispatch({ type: actions.importSystem, payload: data });
      }
      if (type === "export_import") {
        const res = await axios.post(
          `/entities/${connectedSystemType}/${sys}/import`,
          ls
        );
        const { data } = res;
        dispatch({ type: actions.importSystem, payload: data });
        dispatch(entityExportAction(sys, connectedSystemType, historyDate));
      }
    } catch (er) {
      dispatch({
        type: actions.importSystemError,
        payload: "Something went wrong",
      });
    }
  };

export const entityImportByHistoryDateAction =
  (sys, connectedSystemType, historyDate, ls, type, catogery) =>
  async (dispatch) => {
    try {
      dispatch({ type: actions.importByHistoryDateLoading });
      if (type === "import") {
        const res = await axios.post(
          `/history/${connectedSystemType}/${sys}/${catogery}/import`,
          ls
        );
        const { data } = res;
        dispatch({ type: actions.importByHistoryDate, payload: data });
      }
      if (type === "export_import") {
        const res = await axios.post(
          `/history/${connectedSystemType}/${sys}/${catogery}/import`,
          ls
        );
        const { data } = res;
        dispatch({ type: actions.importByHistoryDate, payload: data });
        dispatch(entityExportAction(sys, connectedSystemType, historyDate));
      }
    } catch (er) {
      dispatch({
        type: actions.importByHistoryDateError,
        payload: "Something went wrong",
      });
    }
  };
