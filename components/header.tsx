import {
  Flex,
  Image,
  Heading,
  Text
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Header = (props: any) => {
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState<string | null>(null)
  const { title } = props

  useEffect(() => {
    if (router) {
      setCurrentPath(router.pathname.split('/')[1])
      console.log(router.pathname.split('/')[1])
    }
  }, [router])

  return (
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
      {title &&
        <Heading
          color='white'
          fontSize={64}
        >
          {title}
        </Heading>
      }
      <Flex
        pos='absolute'
        top={16}
        right={16}
        fontSize={24}
        color='white'
      >
        <Text
          cursor='pointer'
          onClick={() => router.push('/')}
          textDecoration={currentPath === '' ? 'underline' : 'unset'}
          textDecorationColor='orange.500'
          textDecorationThickness='4px'
          textUnderlineOffset='8px'
        >
          Home
        </Text>
        <Text
          cursor='pointer'
          onClick={() => router.push('/blog')}
          textDecoration={currentPath === 'blog' ? 'underline' : 'unset'}
          textDecorationColor='orange.500'
          textDecorationThickness='4px'
          textUnderlineOffset='8px'
          ml={8}
        >
          Blog
        </Text>
      </Flex>

    </Flex>
  )
}

export default Header