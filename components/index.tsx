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
import Header from "./header"

const Index = () => {
  const [postData, setPostData] = useState<PostDataType | null>(null)
  const [categories, setCategories] = useState<any>(null)
  const [readyToGetPosts, setReadyToGetPosts] = useState(true)
  const [readyToGetCategories, setReadyToGetCategories] = useState(true)
  const [readyToCreate, setReadyToCreate] = useState(true)
  const [amountOfPosts, setAmountOfPosts] = useState(4)
  const [postPage, setPostPage] = useState(1)
  // const [newPost, setNewPost] = useState<NewPost | null>(null)
  const [imageExample, setImageExample] = useState<any>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const [chosenCategory, setChosenCategory] = useState('')
  const categoryInputRef = useRef<HTMLSelectElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const contentInputRef = useRef<HTMLTextAreaElement>(null)

  const doneCreating = () => {
    setReadyToCreate(false)
    setReadyToGetPosts(true)
  }

  useGetPosts({ readyToGet: readyToGetPosts, amount: amountOfPosts, pages: postPage, callback: setPostData })
  useGetCategories({ readyToGet: readyToGetCategories, callback: setCategories })
  // useCreatePost({ readyToCreate, post: newPost, callback: doneCreating })

  useEffect(() => {
    if (postData) {
      setReadyToGetPosts(false)
    }
  }, [postData, setReadyToGetPosts])

  useEffect(() => {
    if (categories) {
      setReadyToGetCategories(false)
    }
  }, [categories, setCategories])

  const loadMore = () => {
    setAmountOfPosts(amountOfPosts + 4)
    setReadyToGetPosts(true)
  }

  const updateSelectedCategory = (event: Event) => {
    console.log('Changed category')
    if (event) {
      console.log(event?.target?.value)
      setChosenCategory(event?.target?.value)
    }
  }

  const createPost = () => {
    const title = titleInputRef?.current?.value
    const category = chosenCategory
    const imageFile = imageInputRef?.current?.files
    const content = contentInputRef?.current?.value
    let image: File

    if (imageFile) {
      image = imageFile[0]
    }

    console.log(title)
    console.log(category)
    console.log(content)
    console.log(imageFile)

    if (title && category && imageFile && content) {
      console.log(title)
      console.log(category)
      console.log(content)

      const newPost = {
        title,
        category_id: parseInt(category),
        image: imageFile[0],
        content,
        image_name: imageFile[0].name
      }

      console.log(newPost)
      // setNewPost(newPost)
      uploadPost({ post: newPost })
      doneCreating()
    }
  }

  const previewImage = () => {
    const imageFile = imageInputRef?.current?.files
    if (imageFile) {
      setImageExample(URL.createObjectURL(imageFile[0]))
    }

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
        <Header />

        <Flex
          flexDir='row'
          w='90%'
          minH='1200px'
          maxH='1200px'
          mx='auto'
          mt={16}
        >
          <Flex
            flex='1'
            flexDir='column'
            bgColor="white"
            p={8}
            m={8}
          >
            <Heading
              color='black'
            >
              Plaats een blog bericht
            </Heading>

            <Flex
              flexDir='column'
            >

              <Flex
                flexDir='column'
              >
                <Text>Berichtnaam</Text>
                <Input ref={titleInputRef} />
              </Flex>

              <Flex
                flexDir='column'
              >
                <Text>Categorie</Text>
                <Select ref={categoryInputRef} onChange={updateSelectedCategory} placeholder='Geen categorie'>
                  {categories && categories.map((category: any) => {
                    return <option value={category.id} key={category.id}>{category.name}</option>
                  })}
                </Select>
              </Flex>

              <Flex
                flexDir='column'
              >
                <Text>Header afbeelding</Text>
                <Input ref={imageInputRef} onChange={previewImage} type='file' />
                {imageExample && <Image maxH={48} src={imageExample} alt='example' />}

              </Flex>

              <Flex
                flexDir='column'
              >
                <Text>Bericht</Text>
                <Textarea ref={contentInputRef} />
              </Flex>
            </Flex>

            <Button
              mx='auto'
              bgColor='orange.500'
              color='white'
              onClick={createPost}
              w={48}
            >
              Bericht aanmaken
            </Button>

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
                    w='40%'
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
            <Button
              bgColor='orange.500'
              color='white'
              onClick={loadMore}
            >
              Meer laden
            </Button>
          </Flex>
        </Flex>

      </Flex>
    </>
  )
}

export default Index