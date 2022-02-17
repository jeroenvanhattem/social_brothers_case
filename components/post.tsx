import { Flex, Heading, Text } from "@chakra-ui/react"
import { PostType } from "../types/types"

const PostType = (props: any) => {
  const { post, type } = props
  return (
    <Flex
      w={{ base: '100%', lg: type === 'blog' ? 256 : '40%' }}
      h={384}
      shadow='lg'
      key={post.id}
      flexDir='column'
    >
      <Flex
        h='96px'
        w='100%'
        bg={`linear-gradient(rgba(0, 0, 0, 0.4 ), rgba(0, 0, 0, 0.4)), url(${post.img_url})`}
      >

      </Flex>
      <Flex
        flexDir='column'
        p={4}
      >
        <Heading color='brand.header' my={2} fontSize={28}>{post.title}</Heading>
        <Text color='brand.postText'>{post.content}</Text>
      </Flex>
    </Flex>
  )
}

export default PostType