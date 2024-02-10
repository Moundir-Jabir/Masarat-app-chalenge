import Screen from "../components/Screen"
import { useEffect, useState } from "react"
import api from "../utils/api"
import PostCard from "../components/PostCard"
import { FlatList, View, StyleSheet } from "react-native"

const ListScreen = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        api.get("")
            .then(res => setPosts(res.data))
            .catch(err => alert("An error was occured"))
    }, [])
  return (
    <Screen>
        <View style={styles.list}>
        <FlatList
        data={posts}
        renderItem={({item}) => <PostCard data={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={(<View style={styles.separator}></View>)}
      />
        </View>
    </Screen>
  )
}

export default ListScreen

const styles = StyleSheet.create({
    list: {
        marginHorizontal: 20
    },
    separator: {
        height: 20
    }
})