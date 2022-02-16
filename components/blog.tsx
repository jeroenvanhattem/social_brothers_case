import {
  Flex,
  Wrap,
  Heading,
  Image,
  Text,
  Input,
  Select,
  Textarea,
  useEditable,
  Button
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Header from './header'
import { uploadPost, useGetCategories, useGetPosts } from "../hooks/postsHooks"
import { NewPost, Post, PostDataType } from "../types/types"

const Blogs = () => {
  const [postData, setPostData] = useState<PostDataType | null>(null)
  const [readyToGetPosts, setReadyToGetPosts] = useState(true)
  const [amountOfPosts, setAmountOfPosts] = useState(10)
  const [postPage, setPostPage] = useState(1)

  useGetPosts({ readyToGet: readyToGetPosts, amount: amountOfPosts, page: postPage, callback: setPostData })

  useEffect(() => {
    if (postData) {
      setReadyToGetPosts(false)
    }
  }, [postData, setReadyToGetPosts])

  useEffect(() => {
    setReadyToGetPosts(true)
    console.log('Get posts')
    console.log(postPage)
  }, [postPage, setReadyToGetPosts])

  const changePage = (page: any) => {
    console.log(page)
    setPostPage(page)
    setReadyToGetPosts(true)
  }

  return (
    <>
      <Flex
        minH="100vh"
        w="100vw"
        maxW='100vw'
        flexDir='column'
        justify='flex-start'
        bgColor='#F4F4F4'
      >
        <Header title='Blog' />

        <Flex
          flex='1'
          flexDir='column'
          bgColor="white"
          p={8}
          m={8}
          maxH='1200px'
          align='center'
          w='100%'
        >
          <Wrap
            m={8}
            w='100%'
            overflowY='scroll'
            overflowX='hidden'
            justify='center'
            spacing={8}
          >
            {postData && postData.data && postData.data.map((post: Post) => {
              return (
                <Flex
                  w={256}
                  h={256}
                  shadow='xl'
                  key={post.id}
                  flexDir='column'
                >
                  <Flex
                    h='96px'
                    w='100%'
                    bg={`linear-gradient(rgba(0, 0, 0, 0.4 ), rgba(0, 0, 0, 0.4)), url(${post.img_url})`}
                  >

                  </Flex>
                  <Heading fontSize={28}>{post.title}</Heading>
                  <Text>{post.content}</Text>
                </Flex>
              )
            })}
          </Wrap>
          <Flex
            align='center'
            flexDir='row'
          >
            {postData && postData.current_page > 1 &&
              <Text
                color='orange.400'
                mx={2}
                cursor='pointer'
                onClick={() => changePage(postData.current_page - 1)}
              >
                Vorige pagina
              </Text>
            }
            {
              [...Array(postData && postData.last_page && postData.last_page - 1)].map((e, i) =>
                <Text
                  lineHeight='2em'
                  align='center'
                  mx={1}
                  cursor='pointer'
                  borderRadius={postData?.current_page === i + 1 ? '100%' : 'unset'}
                  bgColor={postData?.current_page === i + 1 ? 'gray.200' : 'unset'}
                  h={postData?.current_page === i + 1 ? '2em' : 'unset'}
                  w={postData?.current_page === i + 1 ? '2em' : 'unset'}
                  fontWeight={postData?.current_page === i + 1 ? '800' : 'unset'}
                  onClick={() => changePage(i + 1)}
                  key={i}
                >
                  {i + 1}
                </Text>
              )
            }
            {postData && postData.current_page < postData.last_page &&
              <Text
                color='orange.400'
                mx={2}
                cursor='pointer'
                onClick={() => changePage(postData.current_page + 1)}
              >
                Volgende pagina
              </Text>
            }
          </Flex>
        </Flex>

      </Flex>
    </>
  )
}

export default Blogs