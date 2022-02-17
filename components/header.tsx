import {
  Flex,
  Image,
  Heading,
  Text
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { relative } from "path"
import { useEffect, useState } from "react"

const Header = (props: any) => {
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState<string | null>(null)
  const { title } = props

  useEffect(() => {
    if (router) {
      setCurrentPath(router.pathname.split('/')[1])
    }
  }, [router])

  return (
    <Flex
      minH='250px'
      maxW='100vw'
      w='100%'
      bgColor='brand.black'
      bg="linear-gradient(rgba(0, 0, 0, 0.4 ), rgba(0, 0, 0, 0.4)), url('/static/images/background.png')"
      bgSize='cover'
      bgPosition='center'
      bgRepeat='no-repeat'
      justify='center'
      align='center'
      pos='relative'
      flexDir='column'
    >
      <Flex
        pos={{base: 'unset', lg: 'absolute'}}
        top={6}
        left={32}
        w='300px'
        h='70px'
        align='center'
      >
        <Image src='/static/images/logo.svg' alt='Social Brother logo' />
      </Flex>
      {title &&
        <Heading
          color='brand.white'
          fontSize={48}
        >
          {title}
        </Heading>
      }
      <Flex
        pos={{base: 'unset', lg: 'absolute'}}
        top={6}
        right={32}
        h='70px'
        align='center'
        fontSize={18}
        color='brand.white'
      >
        <Heading
          fontSize={18}
          cursor='pointer'
          onClick={() => router.push('/')}
          textDecoration={currentPath === '' ? 'underline' : 'unset'}
          textDecorationColor='brand.underline'
          textDecorationThickness='4px'
          textUnderlineOffset='8px'
        >
          Home
        </Heading>
        <Heading
          fontSize={18}
          cursor='pointer'
          onClick={() => router.push('/blog')}
          textDecoration={currentPath === 'blog' ? 'underline' : 'unset'}
          textDecorationColor='brand.underline'
          textDecorationThickness='4px'
          textUnderlineOffset='8px'
          ml={8}
        >
          Blog
        </Heading>
      </Flex>

    </Flex>
  )
}

export default Header