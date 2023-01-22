import api from "../config/api";

export const getCustomerById = (id) => {
    return api.get("/customers/" + id);
}

export const getCustomer = () => api.get("/customers");

export const addCustomer = (data) => {
    return api.post("/customers", data, {
        headers: {
            "Content-type": "application/json"
        }
    });
}

export const updateCustomerById = (customer) => {
    return api.put("/customers", customer);
}

export const deleteCustomerById = (customerId) => {
    return api.delete("/customers/" + customerId);
}