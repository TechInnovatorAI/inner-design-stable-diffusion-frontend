// ** React Imports
// import { useContext } from 'react'

// ** Context Imports
// import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports

// Component
import Generateboard from 'src/views/pages/generateboard'

const ACLPage = () => {
  // ** Hooks
  // const ability = useContext(AbilityContext)

  return <Generateboard />
}

ACLPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ACLPage
