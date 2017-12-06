import { Map, fromJS } from "immutable";

export const TEAM_MEMBERS_SET = "TEAM_MEMBERS_SET";
export const TEAM_MEMBER_UPDATE = "TEAM_MEMBER_UPDATE";
export const IS_LOADING = "UPDATE_TEAM_MEMBER";
export const CHANGE_APP_VIEW = "CHANGE_APP_VIEW";
export const TEAM_MEMBER_ADD_EDIT = "TEAM_MEMBER_ADD_EDIT";
export const REDUCER = "app";

export const isLoading = isLoading => {
  return (dispatch, getState) => {
    dispatch({
      type: IS_LOADING,
      reducer: REDUCER,
      isLoading: isLoading,
    });
  };
};

const getTeamMembers = () => {
  return (dispatch, getState) => {
    dispatch(isLoading(true));
    setTimeout(() => {
      //simulatig aync actions
      let people = {
        "1": fromJS({
          id: 1,
          firstName: "Alan",
          lastName: "Pearson",
          email: "alan.perason@mail.com",
          phone: "+1-451-250-206",
          userRole: "member",
          img: null,
        }),
        "2": fromJS({
          id: 2,
          firstName: "Jack",
          lastName: "Hillman",
          email: "jack.hillman@mail.com",
          phone: "+1-125-245-895",
          userRole: "admin",
          img: null,
        }),
        "3": fromJS({
          id: 3,
          firstName: "Amy",
          lastName: "Jenn",
          email: "amy.jenn@mail.com",
          phone: "+1-125-256-345",
          userRole: "member",
          img: null,
        }),
      };
      return dispatch({
        people: Map(people),
        type: TEAM_MEMBERS_SET,
        isLoading: false,
      });
    }, 1000);
  };
};

export const changeView = view => {
  return (dispatch, getState) => {
    return dispatch({ type: CHANGE_APP_VIEW, view: view });
  };
};
export const AddOrEdit = (person, view) => {
  return (dispatch, getState) => {
    return dispatch({ type: TEAM_MEMBER_ADD_EDIT, view: view, person: person });
  };
};

export const update = (person, mode) => {
  return (dispatch, getState) => {
    return dispatch({ type: TEAM_MEMBER_UPDATE, mode: mode, person: person });
  };
};
export const actions = {
  getTeamMembers,
  changeView,
  AddOrEdit,
  update,
};
