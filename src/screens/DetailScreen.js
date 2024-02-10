import { View, StyleSheet, Text, FlatList } from 'react-native'
import Screen from "../components/Screen"
import { useEffect, useState } from 'react';
import api from '../utils/api';

const DetailScreen = ({ route }) => {
    const { postId } = route.params;
    const [post, setPost] = useState()
    const [comments, setComments] = useState ([])
    useEffect(() => {
        api.get(`/posts/${postId}`)
            .then(res => setPost(res.data))
        api.get(`/comments?postId=${postId}`)
            .then(res => setComments(res.data))
    }, [])
  return (
    <Screen>
        <View style={styles.container}>
            <Text style={styles.title}>{post?.title}</Text>
            <Text>{post?.body}</Text>
            <Text style={{fontSize: 30, textAlign: "center", margin: 20}}>Comments</Text>
            <FlatList
            data={comments}
            renderItem={({item: {id, name, email, body}}) => <View>
                <Text>- name : {name}</Text>
                <Text>- email : {email}</Text>
                <Text>- body : {body}</Text>
            </View>}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={(<View style={styles.separator}></View>)}
            />
        </View>
    </Screen>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderStyle: "solid",
    flex: 1,
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 25,
    fontWeight: "bold"
  },
  separator: {
      height: 1,
      backgroundColor: "black"
  },
})