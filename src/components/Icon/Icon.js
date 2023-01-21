import Ionicons from "@expo/vector-icons/Ionicons";

const Icon = ({ name, size, color }) => {
    return (
        <Ionicons name={name} size={size || 24} color={color || "#212121"} />
    )
}

export default Icon;