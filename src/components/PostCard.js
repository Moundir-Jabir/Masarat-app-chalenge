import { TouchableOpacity, StyleSheet, Text } from 'react-native'

const PostCard = ({data: {title, userId, id, body}, navigation, onDelete}) => {
  let wordCount = body.split(/\s+/);
  wordCount = wordCount.length
  const moveToDetail = () => {
    navigation.navigate('Detail', {
      postId: id
    })
  }
  return (
    <TouchableOpacity onPress={() => moveToDetail()} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>- User id : {userId}</Text>
      <Text>- Id : {id}</Text>
      <Text>- Body : {body}</Text>
      <Text>Word Count : {wordCount} words</Text>
      <Text onPress={() => onDelete(id)} style={{color: "red"}}>Delete Post</Text>
    </TouchableOpacity>
  )
}

export default PostCard

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderStyle: "solid",
    borderRadius: 20,
    width: "100%",
    minHeight: 200,
    borderBlockColor: "grey",
    borderWidth: 1
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 25,
    fontWeight: "bold"
  }
})