import { Map, fromJS } from "immutable";
import {
  IS_LOADING,
  REDUCER,
  TEAM_MEMBERS_SET,
  TEAM_MEMBER_UPDATE,
  CHANGE_APP_VIEW,
  TEAM_MEMBER_ADD_EDIT,
} from "./AppAction";
const initialState = {
  people: Map(),
  isLoading: false,
  view: 0,
};

export function appReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    case TEAM_MEMBERS_SET: {
      let { people, isLoading } = action;
      return state.merge({ people, isLoading });
    }
    case IS_LOADING: {
      if (action.reducer === REDUCER) {
        let { isLoading } = action;
        return state.merge({ isLoading });
      }
      return state;
    }
    case TEAM_MEMBER_UPDATE: {
      let { mode, person } = action;
      console.log(mode, person);
      let people = state.get("people");
      let id = String(person.get("id"));
      if (mode === "DELETE") {
        people = people.delete(id);
      } else {
        people = people.set(id, person);
      }
      //reset view
      let view = 0;
      return state.merge({ view, people });
    }
    case TEAM_MEMBER_ADD_EDIT: {
      let { view, person } = action;
      return state.merge({ view, person });
    }
    case CHANGE_APP_VIEW: {
      let { view } = action;
      return state.merge({ view });
    }
    default:
      return state;
  }
}
