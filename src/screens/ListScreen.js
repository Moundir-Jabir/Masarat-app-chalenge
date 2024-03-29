import Screen from "../components/Screen"
import { useEffect, useState } from "react"
import api from "../utils/api"
import PostCard from "../components/PostCard"
import { FlatList, View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { nbrOfPostPerPage } from "../utils/config"
import Search from "../components/Search"

const ListScreen = ({navigation}) => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const pages = Math.ceil(posts.length / nbrOfPostPerPage)
    const allPages = []
    for (let i = 1 ; i<=pages ; i++){
        allPages.push(i)
    }
    const [paginatedPost, setPaginatedPost] = useState([])
    const paginate = () => {
        let startIndex = (page - 1) * nbrOfPostPerPage;
        let endIndex = page * nbrOfPostPerPage;
        let paginatedPosts = posts.slice(startIndex, endIndex);
        setPaginatedPost(paginatedPosts)
    }
    useEffect(() => {
        api.get("/posts")
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => alert("An error was occured"))
    }, [])
    useEffect(() => {
        paginate()
    }, [page, posts])

    const changePage = (p) => {
        setPage(p)
    }

    const search = (text) => {
    }

    const deletePost = (idPost) => {
        api.delete(`/posts/${idPost}`)
            .then(res => {
                alert("post deleted")
                const newPosts = posts.filter(item => item.id !== idPost)
                setPosts(newPosts)
            })
    }
    
  return (
    <Screen>
        <View style={styles.list}>
            <Search/>
            <FlatList
            data={paginatedPost}
            renderItem={({item}) => <PostCard onDelete={deletePost} navigation={navigation} data={item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={(<View style={styles.separator}></View>)}
            />
        </View>
        <View style={styles.pagination}>
            {allPages.map(item => (
                <Text onPress={() => changePage(item)} style={[styles.paginationNbr, {color: item == page ? "blue" : "black"}]} key={item}>{item}</Text>
            ))}
        </View>
    </Screen>
  )
}

export default ListScreen

const styles = StyleSheet.create({
    list: {
        marginHorizontal: 20,
        flex: 20
    },
    separator: {
        height: 20
    },
    pagination: {
        flex: 1,
        margin: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    paginationNbr: {
        padding: 5,
        fontSize: 20,
        margin: 5
    }
})