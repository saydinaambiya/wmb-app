import {Alert, FlatList, RefreshControl, ScrollView, Text, View} from "react-native";
import Button from "../../components/Button/Button";
import useFetchQuery from "../../hook/useFetchQuery";
import React, {useEffect} from "react";
import useFetchMutation from "../../hook/useFetchMutation";
import {constantColor} from "../../shared/theme/constantColor";
import {deleteTableById, getTable} from "../../services/tableApi";


const RenderTable = (props) => {
    const {table, onDelete, onNavigate} = props;
    const isUnavailable = table.item.status==="Unavailable";

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
                {table.item.nomor}
            </Text>
            <Text
                style={{
                    color: isUnavailable?constantColor.redColor:constantColor.greenColor
                }}
            >{table.item.status}</Text>
            <Button
                onPress={onNavigate(table)}
                text="Edit"
                disabled={isUnavailable}
            />
            <Button
                onPress={onDelete(table.item.id)}
                text="Delete"
                isDelete
                disabled={isUnavailable}
            />
        </View>
    )
}

const Table = (props) => {
    const {data, loading, refetch} = useFetchQuery(getTable);
    const [table, setTable] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [loadingRefresh, setLoadingRefresh] = React.useState(false);

    const onNavigateAddTable = () => {
        props.navigation.navigate("AddTable");
    }

    const {fetchMutation: deleteTableMutation, error: errorMutation} = useFetchMutation(
        deleteTableById,
        refetch
    )

    const onDeleteTable = (id) => () => {
        Alert.alert(
            "Delete Table",
            "Are you sure delete this table?",
            [
                {
                    text: "Cancel",
                    onPress: () => {}
                },
                {
                    text: "Oke",
                    onPress: async () => {
                        await deleteTableMutation(id);
                        if (errorMutation) {
                            alert("Delete table is failed");
                        } else {
                            alert("Success delete Table")
                        }
                    }
                }
            ]
        );
    }

    const onNavigateEditTable = (table) => () => {
        props.navigation.navigate("EditTable", {
            table: table
        })
    }

    const refresh = async () => {
        try {
            setLoadingRefresh(true);
            const response = await getTable();
            setTable(response?.data);
            setError(false)
        } catch (e) {
            alert("Something went wrong")
            setError(true);
            setTable([]);
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
            <Button text={"Add Table"} onPress={onNavigateAddTable}/>

            {
                !(table?.data < 1) ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={5}
                        data={table?.data}
                        renderItem={(data) => (
                            <RenderTable
                                table={data}
                                onDelete={onDeleteTable}
                                onNavigate={onNavigateEditTable}
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

export default Table;