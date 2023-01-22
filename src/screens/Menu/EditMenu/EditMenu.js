import {ScrollView, Text, View} from "react-native";
import React from "react";
import {addMenu, updateMenuById} from "../../../services/menuApi";
import {constantColor} from "../../../shared/theme/constantColor";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import useFetchMutation from "../../../hook/useFetchMutation";

const EditMenu = (props) => {
    const {route: {params: {menu}}} = props;
    const [id, setId] = React.useState(menu.item.id);
    const [name, setName] = React.useState(menu.item.name);
    const [price, setPrice] = React.useState(menu.item.price.toString());
    const [errorValidation, setErrorValidation] = React.useState({id: false, name: false, price: false});

    const {loading, error, fetchMutation} = useFetchMutation(
        updateMenuById,
        () => props.navigation.goBack()
    );

    const idHandler = (value) => {
        const isValid = value.length >= 1;
        setId(value);
        setErrorValidation((prevState) => ({
            ...prevState, id: !isValid
        }))
    }

    const nameHandler = (value) => {
        const isValid = value.length >= 3;
        setName(value);
        setErrorValidation((prevState) => ({
            ...prevState, name: !isValid
        }))
    }

    const priceHandler = (value) => {
        const isValid = value.length >= 4;
        setPrice(value);
        setErrorValidation((prevState) => ({
            ...prevState, price: !isValid
        }))
    }

    const onEditMenu = async () => {
        await fetchMutation({id, name, price});
        if (error) {
            alert("Failed to add menu")
        } else {
            alert("Success Edit menu")
        }
    }

    const onCancel = () => {
        props.navigation.goBack();
    }

    return (
        <View>
            <ScrollView>
                <FormInput
                    label="ID"
                    placeholder="Enter Menu ID"
                    value={id}
                    onChange={idHandler}
                />
                {errorValidation.id && <Text style={{color: constantColor.redColor}}>ID min. 1 character</Text>}
                <FormInput
                    label="Menu Name"
                    placeholder="Enter Menu Name"
                    value={name}
                    onChange={nameHandler}
                />
                {errorValidation.name &&
                    <Text style={{color: constantColor.redColor}}>Menu name min. 3 characters</Text>}
                <FormInput
                    label="Menu Price"
                    placeholder="Enter Menu Price"
                    value={price}
                    onChange={priceHandler}
                    type="number-pad"
                />
                {errorValidation.price && <Text style={{color: "red"}}>Price min. 4 characters</Text>}
            </ScrollView>
            <View>
                <Button onPress={onEditMenu} text={"Edit"}
                        disabled={!(id && name && price) || loading}/>
                <Button onPress={onCancel} text={"Cancel"}
                        isDelete
                        disabled={loading}/>
            </View>
        </View>
    )
}

export default EditMenu;