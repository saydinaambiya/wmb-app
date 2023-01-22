import {ScrollView, Text, View} from "react-native";
import React from "react";
import {addMenu} from "../../../services/menuApi";
import {constantColor} from "../../../shared/theme/constantColor";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import useFetchMutation from "../../../hook/useFetchMutation";

const AddMenu = (props) => {
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [errorValidation, setErrorValidation] = React.useState({id: false, name: false, price: false});

    const {loading, error, fetchMutation} = useFetchMutation(
        addMenu,
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

    const onAddMenu = async () => {
        await fetchMutation({id, name, price});
        if (error) {
            alert("Failed to add menu")
        } else {
            alert("Success add menu")
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
                <Button onPress={onAddMenu} text={"Add"}
                        disabled={!(id && name && price) || loading}/>
                <Button onPress={onCancel} text={"Cancel"}
                        isDelete
                        disabled={loading}/>
            </View>
        </View>
    )
}

export default AddMenu;