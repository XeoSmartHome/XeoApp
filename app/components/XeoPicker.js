import React from "react";
import {Picker, View, PickerProps} from "react-native";

interface XeoPickerProps extends PickerProps {
    options?: [],
    colors: {
        text: string,
        border: string
    },
    style: Object
}


export const XeoPicker = (props : XeoPickerProps) => {
    return (
        <View
            style={[{
                borderWidth: 2,
                borderRadius: 8,
                borderColor: props.colors.border
            }, props.style]}
        >
            <Picker
                {...props}
                style={{
                    color: props.colors.text,
                }}
            >
                {
                    props.children
                }
            </Picker>
        </View>
    )
}
