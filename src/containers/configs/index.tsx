import { PrivateContainer } from 'components/privateContainer'

import { Header } from '@quantun/core'

import { useConfig } from './useConfigs'
import { ConfigForm } from './configForm/configForm'
import { Flex, Loader, Text } from '@mantine/core'

export default function Configs() {
  const { configs, isLoading, handleSubmit } = useConfig()

  return (
    <PrivateContainer>
      <Header>
        <Header.Title>Configurations</Header.Title>
        <Header.Subtitle>Redefine your experience preferences</Header.Subtitle>
      </Header>
      {configs ? (
        <ConfigForm configs={configs} isLoading={isLoading} onSubmit={handleSubmit} />
      ) : (
        <Flex justify="center" align="center" direction="column" gap="sm" h="100%">
          <Text>Loading configurations, please wait...</Text>
          <Loader />
        </Flex>
      )}
    </PrivateContainer>
  )
}
