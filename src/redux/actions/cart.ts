import { cartActionTypes } from "../cartActionTypes";
import { _basePath } from "../../config/basePath";
import axios from "../../config/axios";

export const systemCartListAction =
  (sys, historyDate) => async (dispatch) => {
    try {
      dispatch({ type: cartActionTypes.systemCartListLoading });
      const res = await axios.post(
        `/entities/${sys}/${historyDate}/cart`
      );
      const { data } = res;
      dispatch({ type: cartActionTypes.systemCartList, payload: data });
    } catch (er) {
      dispatch({
        type: cartActionTypes.systemCartListError,
        payload: "Something went wrong",
      });
    }
  };

export const removeFromCartEntitiesAction =
  (sys, historyDate, cat, ls) => async (dispatch) => {
    try {
      dispatch({ type: cartActionTypes.removeFromCartEntitiesLoading });
      const res = await axios.post(
        `/entities/${sys}/${historyDate}/removeFromCart/${cat}`,
        ls
      );
      const { data } = res;
      dispatch({ type: cartActionTypes.removeFromCartEntities, payload: data });
      await dispatch(
        systemCartListAction(sys, historyDate)
      );
    } catch (er) {
      dispatch({
        type: cartActionTypes.removeFromCartEntitiesError,
        payload: "Something went wrong",
      });
    }
  };

export const removeByEntityFromCartEntitiesAction =
  (sys, historyDate, cat) => async (dispatch) => {
    try {
      dispatch({ type: cartActionTypes.removeByEntityFromCartEntitiesLoading });
      const res = await axios.post(
        `/entities/${sys}/${historyDate}/removeByEntityFromCart/${cat}`
      );
      const { data } = res;
      dispatch({
        type: cartActionTypes.removeByEntityFromCartEntities,
        payload: data,
      });
      await dispatch(
        systemCartListAction(sys, historyDate)
      );
    } catch (er) {
      dispatch({
        type: cartActionTypes.removeByEntityFromCartEntitiesError,
        payload: "Something went wrong",
      });
    }
  };

export const emptyCartAction =
  (sys, historyDate) => async (dispatch) => {
    try {
      dispatch({ type: cartActionTypes.emptyCartLoading });
      const res = await axios.post(
        `/entities/${sys}/${historyDate}/emptyCart`
      );
      const { data } = res;
      dispatch({ type: cartActionTypes.emptyCart, payload: data });
      await dispatch(
        systemCartListAction(sys, historyDate)
      );
    } catch (er) {
      dispatch({
        type: cartActionTypes.emptyCartError,
        payload: "Something went wrong",
      });
    }
  };
