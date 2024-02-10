import { TextInput, View, StyleSheet } from 'react-native'

const Search = ({onSubmit}) => {
  return (
    <View style={styles.container}>
        <TextInput onSubmitEditing={({nativeEvent: {text}}) => onSubmit(text)} placeholder='search' keyboardType='web-search' />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
        padding: 15,
        marginVertical: 10
    }
})