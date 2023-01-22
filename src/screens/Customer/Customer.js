import {Alert, FlatList, RefreshControl, ScrollView, Text, View} from "react-native";
import Button from "../../components/Button/Button";
import useFetchQuery from "../../hook/useFetchQuery";
import {deleteMenuById, getMenu} from "../../services/menuApi";
import React, {useEffect} from "react";
import useFetchMutation from "../../hook/useFetchMutation";
import {constantColor} from "../../shared/theme/constantColor";
import {deleteCustomerById, getCustomer} from "../../services/customerApi";


const RenderCustomer = (props) => {
    const {customer, onDelete, onNavigate} = props;

    return (
        <View
            style={{
                backgroundColor: constantColor.whiteColor,
                padding: 20,
                margin: 10,
                borderRadius: 20
            }}
        >
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 24
                }}>
                {customer.item.nama}
            </Text>
            <Text>{customer.item.alamat}</Text>
            <Button
                onPress={onNavigate(customer)}
                text="Edit"
            />
            <Button
                onPress={onDelete(customer.item.id)}
                text="Delete"
                isDelete
            />
        </View>
    )
}

const Customer = (props) => {
    const {data, loading, refetch} = useFetchQuery(getMenu);
    const [customer, setCustomer] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [loadingRefresh, setLoadingRefresh] = React.useState(false);

    const onNavigateAddCustomer = () => {
        props.navigation.navigate("AddCustomer");
    }

    const {fetchMutation: deleteCustomerMutation, error: errorMutation} = useFetchMutation(
        deleteCustomerById,
        refetch
    )

    const onDeleteCustomer = (id) => () => {
        Alert.alert(
            "Delete Customer",
            "Are you sure delete this customer?",
            [
                {
                    text: "Cancel",
                    onPress: () => {}
                },
                {
                    text: "Oke",
                    onPress: async () => {
                        await deleteCustomerMutation(id);
                        if (errorMutation) {
                            alert("Delete customer is failed");
                        } else {
                            alert("Success delete customer")
                        }
                    }
                }
            ]
        );
    }

    const onNavigateEditCustomer = (customer) => () => {
        props.navigation.navigate("EditCustomer", {
            customer: customer
        })
    }

    const refresh = async () => {
        try {
            setLoadingRefresh(true);
            const response = await getCustomer();
            setCustomer(response?.data);
            setError(false)
        } catch (e) {
            alert("Something went wrong")
            setError(true);
            setCustomer([]);
        } finally {
            setLoadingRefresh(false);
        }
    }

    useEffect(() => {
        refresh();
    }, [data, error])

    return (
        <View style={{
            flex: 1,
            justifyContent: "center"
        }}>
            <Button text={"Add Customer"} onPress={onNavigateAddCustomer}/>

            {
                !(customer?.data < 1) ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={5}
                        data={customer?.data}
                        renderItem={(data) => (
                            <RenderCustomer
                                customer={data}
                                onDelete={onDeleteCustomer}
                                onNavigate={onNavigateEditCustomer}
                            />
                        )}
                        keyExtractor={(item, index) => index}
                        refreshControl={<RefreshControl refreshing={loading || loadingRefresh} onRefresh={refresh}/>}
                    />
                    :
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={loading || loadingRefresh} onRefresh={refresh}/>}
                    >
                        <Text>Data is Empty</Text>
                    </ScrollView>
            }
        </View>
    )
}

export default Customer;