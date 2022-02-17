import { Flex, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <Flex
      w='100vw'
      minH={8}
      bgColor='brand.footer'
      justify='center'
      align='center'
    >
      <Text fontSize={12} lineHeight='15px' color='brand.white'>&copy; Copyright Social Brothers - 2020</Text>
    </Flex>
  )
}

export default Footer