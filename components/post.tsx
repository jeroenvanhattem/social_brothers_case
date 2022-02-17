import { Flex, Heading, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { PostType } from "../types/types"

const PostType = ({ post, type = '' }: { post: PostType, type?: string }) => {
  const date = new Date(post.created_at).toLocaleDateString().replaceAll('/', '-')

  const API_IMAGE_WORKING = false
  const image = API_IMAGE_WORKING ? post.img_url : 'https://picsum.photos/256/96'

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
        pos='relative'
        bg={`linear-gradient(rgba(0, 0, 0, 0.4 ), rgba(0, 0, 0, 0.4)), url(${image})`}
        bgSize='cover'
        bgPosition='center'
        bgRepeat='no-repeat'
      >
        <Text color='brand.white' pos='absolute' fontStyle='italic' fontSize={12} left={4} bottom={2} >{date}</Text>
        <Text color='brand.white' pos='absolute' fontStyle='italic' fontSize={12} right={4} bottom={2} >{post.category.name}</Text>
      </Flex>
      <Flex
        flexDir='column'
        p={4}
        overflowY='hidden'
      >
        <Heading color='brand.header' my={2} fontSize={28}>{post.title}</Heading>
        <Text color='brand.postText'>{post.content}</Text>
      </Flex>
    </Flex>
  )
}

export default PostType