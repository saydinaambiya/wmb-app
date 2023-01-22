import api from "../config/api";

export const getTableById = (id) => {
    return api.get("/tables/" + id);
}

export const getTable = () => api.get("/tables");

export const addTable = (data) => {
    return api.post("/tables", data, {
        headers: {
            "Content-type": "application/json"
        }
    });
}

export const updateTableById = (table) => {
    return api.put("/tables", table);
}

export const deleteTableById = (tablesId) => {
    return api.delete("/tables/" + tablesId);
}