import axios from "axios";

// config
const request = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASEURL,
  timeout: 30000,
});

// set headers
const headers = (header) => {
  return {
    headers: {
      project_id: process.env.REACT_APP_PROJECT_ID,
      ...(header && header),
    },
  };
};

// api
export const createUser = ({ data }) => {
  return request.post("/users",
    data,
    headers(),
  );
};

export const listUser = ({ query }) => {
  return request.get("/users", {
    params: query,
    ...headers(),
  });
};

export const listUserForExcel = ({ query }) => {
  return request.get("/excel/users", {
    params: query,
    ...headers(),
  });
};

export const selectUser = ({ path }) => {
  return request.get(`/users/${path.user_id}`, {
    ...headers(),
  });
};

export const selectUserCount = () => {
  return request.get("/users/count", {
    ...headers(),
  });
};

export const updatedAttendance = ({ path, data }) => {
  return request.put(`/attendance/${path.attendance_id}`,
    data,
    headers(),
  );
};

export const createComment = ({ data }) => {
  return request.post("/comments",
    data,
    headers(),
  );
};

export const listComment = ({ query }) => {
  return request.get("/comments", {
    params: query,
    ...headers(),
  });
};

export const listMission = ({ query }) => {
  return request.get("/mission", {
    params: query,
    ...headers(),
  });
};

export const createMissionHistory = ({ data }) => {
  return request.post("/mission_history",
    data,
    headers(),
  );
};

export const selectMissionHistoryWeek = ({ path, query }) => {
  return request.get(`/users/${path.user_id}/mission_history/week`, {
    params: query,
    ...headers(),
  });
};

export const selectMissionHistory = ({ path, query }) => {
  return request.get(`/users/${path.user_id}/mission_history`, {
    params: query,
    ...headers(),
  });
};

export const selectMissionHistoryCount = ({ query }) => {
  return request.get("/mission_history/count", {
    params: query,
    ...headers(),
  });
};

export const listRank = () => {
  return request.get("/rank", {
    ...headers(),
  });
};

export const createRank = ({ data }) => {
  return request.post("/rank",
    data,
    headers(),
  );
};