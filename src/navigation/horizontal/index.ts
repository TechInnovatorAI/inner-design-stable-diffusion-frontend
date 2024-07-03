// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Administrator Top',
    icon: 'mdi:home-account',
    children: [
      {
        icon: 'mdi:account-edit-outline',
        title: 'ユーザーリスト',
        path: '/admin/users'
      },
      {
        icon: 'mdi:file-document-outline',
        title: 'Usage history',
        path: '/admin/bill'
      }
    ]
  },

  // {
  //   title: 'Prompt Editing',
  //   path: '/edit-prompt',
  //   icon: 'material-symbols:edit-document-rounded'
  // },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'My Project',
    icon: 'material-symbols:home-repair-service-rounded'
  },
  {
    path: '/acl/edit',
    action: 'read',
    subject: 'acl-page',
    title: 'Create a project',
    icon: 'material-symbols:chair'
  },
  {
    path: '/acl/help',
    action: 'read',
    subject: 'acl-page',
    title: 'About this service',
    icon: 'mdi:help-circle'
  }
]

export default navigation
