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
  Button,
  MenuItemOption
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { Camera } from "react-feather"
import { uploadPost, useGetCategories, useGetPosts } from "../hooks/postsHooks"
import { NewPost, PostType, PostDataType } from "../types/types"
import Post from './post'
import Header from "./header"
import Footer from "./footer"

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
  const [titleError, setTitleError] = useState('')
  const [categoryError, setCategoryError] = useState('')
  const [imageError, setImageError] = useState('')
  const [contentError, setContentError] = useState('')

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

  const updateSelectedCategory = (event: any) => {
    console.log('Changed category')
    if (event && event.target && event.target.value) {
      console.log(event?.target?.value)
      setChosenCategory(event?.target?.value)
    }
  }

  const createPost = () => {
    const title = titleInputRef?.current?.value
    const category = chosenCategory
    const imageFile = imageInputRef?.current?.files
    const content = contentInputRef?.current?.value
    let image: File | null = null

    if (imageFile) {
      image = imageFile[0]
    }

    console.log(title)
    console.log(category)
    console.log(content)
    console.log(imageFile)

    title === '' ? setTitleError('Naam is verplicht') : setTitleError('')
    category === '' ? setCategoryError('Categorie is verplicht') : setCategoryError('')
    !image ? setImageError('Een afbeelding is verplicht') : setImageError('')
    content === '' ? setContentError('Bericht is verplicht') : setContentError('')

    if (title && category && image && content) {
      console.log(title)
      console.log(category)
      console.log(content)

      const newPost = {
        title,
        category_id: parseInt(category),
        image: image,
        content,
        image_name: image.name
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
        bgColor='brand.background'
        overflowX='hidden'
      >
        <Header />

        <Flex
          flexDir='column'
          mt={8}
        >
          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            w={{ base: '100%', lg: '90%' }}
            minH='1050px'
            mx='auto'
          >
            <Flex
              flex='1'
              flexDir='column'
              bgColor="white"
              p={8}
              m={8}
              color='brand.text'
            >
              <Heading
                color='brand.title'
              >
                Plaats een blog bericht
              </Heading>

              <Flex
                flexDir='column'
              >

                <Flex
                  flexDir='column'
                  my={4}
                >
                  <Flex >
                    <Text>Berichtnaam</Text>
                    <Text ml={4} color='red' display={titleError !== '' ? 'unset' : 'none'}>{titleError}</Text>
                  </Flex>
                  <Input border='none' ref={titleInputRef} bgColor='brand.inputBackground' placeholder='Geen titel' fontStyle='italic' />
                </Flex>

                <Flex
                  flexDir='column'
                  my={4}
                >
                  <Flex >
                    <Text>Categorie</Text>
                    <Text ml={4} color='red' display={categoryError !== '' ? 'unset' : 'none'}>{categoryError}</Text>
                  </Flex>
                  <Select border='none' ref={categoryInputRef} bgColor='brand.inputBackground' onChange={updateSelectedCategory} placeholder='Geen categorie' fontStyle='italic' >
                    {categories && categories.map((category: any) => {
                      return <option value={category.id} style={{ fontFamily: 'Proxima Nova Rg' }} key={category.id}>{category.name}</option>
                    })}
                  </Select>
                </Flex>

                <Flex
                  flexDir='column'
                  my={4}
                >
                  <Flex >
                    <Text>Header afbeelding</Text>
                    <Text ml={4} color='red' display={imageError !== '' ? 'unset' : 'none'}>{imageError}</Text>
                  </Flex>
                  <Flex
                    align='center'
                    p={2}
                    bgColor='brand.inputBackground'
                    borderRadius={5}
                    border='none'
                  >
                    <Camera color='#868686' size={18} />
                    <Button w={20} h={6} borderRadius={96} ml={4} px={12} fontSize={12} fontWeight={300} color='brand.white' bgColor='brand.buttonDark' onClick={() => imageInputRef?.current?.click()}>Kies bestand</Button>
                    <Input ref={imageInputRef} d={'none'} accept="image/png, image/jpeg, image/jpg, image/gif" onChange={previewImage} type='file' />
                    {imageExample && <Image ml={8} maxH={24} src={imageExample} alt='example' />}
                  </Flex>

                </Flex>

                <Flex
                  flexDir='column'
                  my={4}
                >
                  <Flex >
                    <Text>Bericht</Text>
                    <Text ml={4} color='red' display={contentError !== '' ? 'unset' : 'none'}>{contentError}</Text>
                  </Flex>
                  <Textarea border='none' ref={contentInputRef} bgColor='brand.inputBackground' minH='470px' />
                </Flex>
              </Flex>

              <Button
                mx='auto'
                bgColor='brand.button'
                color='brand.white'
                onClick={createPost}
                w={48}
                fontSize={14}
                h='31px'
                p={4}
                my={4}
                borderRadius='18px'
              >
                Bericht aanmaken
              </Button>

            </Flex>

            <Flex
              flex='1'
              flexDir='column'
              bgColor="white"
              p={8}
              maxH='1050px'
              m={8}
              color='brand.text'
            >
              <Wrap
                m={{ base: 'unset', lg: 8 }}
                w='100%'
                overflowY='scroll'
                overflowX='hidden'
                spacing={8}
              >
                {postData && postData.data && postData.data.map((post: PostType) => {
                  return <Post post={post} key={post.id} />
                })}
              </Wrap>
              <Button
                mx='auto'
                bgColor='brand.button'
                color='brand.white'
                onClick={loadMore}
                w={48}
                fontSize={14}
                h='31px'
                p={4}
                my={4}
                borderRadius='18px'
              >
                Meer laden
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}

export default Index