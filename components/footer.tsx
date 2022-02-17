import { Flex, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <Flex
      w='100vw'
      minH={8}
      bgColor='brand.footer'
      justify='center'
      p={4}
    >
      <Text fontSize={12}color='brand.white'>Copyright Social Brothers - 2020</Text>
    </Flex>
  )
}

export default Footer