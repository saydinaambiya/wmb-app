import api from "../config/api";

export const getMenuById = (id) => {
    return api.get("/menus/" + id);
}

export const getMenu = () => api.get("/menus");

export const addMenu = (data) => {
    return api.post("/menus", data, {
        headers: {
            "Content-type": "application/json"
        }
    });
}

export const updateMenuById = (menu) => {
    return api.put("/menus", menu);
}

export const deleteMenuById = (menuId) => {
    return api.delete("/menus/" + menuId);
}