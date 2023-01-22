import {Alert, FlatList, RefreshControl, ScrollView, Text, View} from "react-native";
import Button from "../../components/Button/Button";
import useFetchQuery from "../../hook/useFetchQuery";
import {deleteMenuById, getMenu} from "../../services/menuApi";
import React, {useEffect} from "react";
import useFetchMutation from "../../hook/useFetchMutation";
import {constantColor} from "../../shared/theme/constantColor";


const RenderMenu = (props) => {
    const {menu, onDelete, onNavigate} = props;

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
                {menu.item.name}
            </Text>
            <Text>Rp. {menu.item.price}</Text>
            <Button
                onPress={onNavigate(menu)}
                text="Edit"
            />
            <Button
                onPress={onDelete(menu.item.id)}
                text="Delete"
                isDelete
            />
        </View>
    )
}

const Menu = (props) => {
    const {data, loading, refetch} = useFetchQuery(getMenu);
    const [menu, setMenu] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [loadingRefresh, setLoadingRefresh] = React.useState(false);

    const onNavigateAddMenu = () => {
        props.navigation.navigate("AddMenu");
    }

    const {fetchMutation: deleteMenuMutation, error: errorMutation} = useFetchMutation(
        deleteMenuById,
        refetch
    )

    const onDeleteMenu = (id) => () => {
        Alert.alert(
            "Delete Menu",
            "Are you sure delete this menu?",
            [
                {
                    text: "Cancel",
                    onPress: () => props.navigation.goBack()
                },
                {
                    text: "Oke",
                    onPress: async () => {
                        await deleteMenuMutation(id);
                        if (errorMutation) {
                            alert("Delete menu is failed");
                        } else {
                            alert("Success delete menu")
                        }
                    }
                }
            ]
        );
    }

    const onNavigateEditMenu = (menu) => () => {
        props.navigation.navigate("EditMenu", {
            menu: menu
        })
    }

    const refresh = async () => {
        try {
            setLoadingRefresh(true);
            const response = await getMenu();
            setMenu(response?.data);
            setError(false)
        } catch (e) {
            alert("Something went wrong")
            setError(true);
            setMenu([]);
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
            <Button text={"Add Menu"} onPress={onNavigateAddMenu}/>

            {
                !(menu?.data < 1) ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={5}
                        data={menu?.data}
                        renderItem={(data) => (
                            <RenderMenu
                                menu={data}
                                onDelete={onDeleteMenu}
                                onNavigate={onNavigateEditMenu}
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

export default Menu;