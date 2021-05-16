import React from "react";
import {TextInput, TextInputProps} from "react-native";

export interface XeoTextInputProps extends TextInputProps {
    colors: {
        text: string,
        border: string
    },
    fontSize?: number
}

const defaultXeoTextInputProps = {
    fontSize: 16
}

export const XeoTextInput = (props: XeoTextInputProps) => {
    return (
        <TextInput
            {...props}
            style={[{
                color: props.colors.text,
                borderColor: props.colors.border,
                borderWidth: 2,
                padding: 6,
                borderRadius: 6,
                fontSize: props.fontSize || defaultXeoTextInputProps.fontSize
            }, props.style]}
        />
    )
}