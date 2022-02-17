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
import { useGetPosts } from "../hooks/postsHooks"
import { PostType, PostDataType } from "../types/types"
import { ArrowLeft, ArrowRight } from "react-feather"
import Post from './post'
import Footer from "./footer"

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
  }, [postPage, setReadyToGetPosts])

  const changePage = (page: any) => {
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
        bgColor='brand.background'
        overflowX='hidden'
      >
        <Header title='Blog' />

        <Flex
          flexDir='column'
          mt={8}
        >
          <Flex
            flex='1'
            flexDir='column'
            bgColor="white"
            p={8}
            my={8}
            mx='auto'
            align='center'
            w='90%'
          >
            <Wrap
              m={8}
              w='100%'
              spacing={8}
            >
              {postData && postData.data && postData.data.map((post: PostType) => {
                return <Post post={post} key={post.id} type='blog' />
              })}
            </Wrap>
            <Flex
              align='center'
              flexDir={{ base: 'column', lg: 'row' }}
            >
              {postData && postData.current_page > 1 &&
                <Flex

                >
                  <ArrowLeft color='#F27623' />
                  <Text
                    color='brand.navigation.orange'
                    mx={2}
                    cursor='pointer'
                    onClick={() => changePage(postData.current_page - 1)}
                  >
                    Vorige pagina
                  </Text>
                </Flex>
              }
              <Flex flexDir='row'>
                {
                  [...Array(postData && postData.last_page && postData.last_page - 1)].map((e, i) =>
                    <Text
                      lineHeight='2em'
                      color='brand.navigation.text'
                      align='center'
                      mx={1}
                      cursor='pointer'
                      borderRadius={postData?.current_page === i + 1 ? '100%' : 'unset'}
                      bgColor={postData?.current_page === i + 1 ? 'brand.navigation.background' : 'unset'}
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
              </Flex>
              {postData && postData.current_page < postData.last_page &&
                <Flex

                >
                  <Text
                    color='brand.navigation.orange'
                    mx={2}
                    cursor='pointer'
                    onClick={() => changePage(postData.current_page + 1)}
                  >
                    Volgende pagina
                  </Text>
                  <ArrowRight color='#F27623' />
                </Flex>
              }
            </Flex>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}

export default Blogs