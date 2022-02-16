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
        <Flex
          minH='500px'
          w='100%'
          bgColor='black'
          bg="linear-gradient(rgba(0, 0, 0, 0.4 ), rgba(0, 0, 0, 0.4)), url('/static/images/background.png')"
          bgSize='cover'
          bgPosition='center'
          bgRepeat='no-repeat'
          justify='center'
          align='center'
          pos='relative'
        >
          <Flex
            pos='absolute'
            top={16}
            left={16}
          >
            <Image src='/static/images/logo.svg' width={96} alt='Social Brother logo' />
          </Flex>
          <Heading
            color='white'
            fontSize={64}
          >
            Blog
          </Heading>
        </Flex>

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

          >
            {
              [...Array(postData?.last_page && postData?.last_page - 1)].map((e, i) =>
                <Text cursor='pointer' onClick={() => changePage(i + 1)} key={i}>{i + 1}</Text>
              )
            }
          </Flex>
        </Flex>

      </Flex>
    </>
  )
}

export default Blogs