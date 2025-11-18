import { TextInput } from 'react-native'

const ThemedTextInput = ({style, ...props}) => {
  return (
    <TextInput
        style={[{
            backgroundColor: '#e0e0e0',
            color: '#444444',
            padding: 20,
            borderRadius: 6,
            marginVertical: 10,
        }, style]}
        {...props}    
    />
  )
}

export default ThemedTextInput