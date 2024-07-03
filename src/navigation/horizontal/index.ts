// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: '管理者トップ',
    icon: 'mdi:home-account',
    children: [
      {
        icon: 'mdi:account-edit-outline',
        title: 'ユーザーリスト',
        path: '/admin/users'
      },
      {
        icon: 'mdi:file-document-outline',
        title: 'ご利用履歴',
        path: '/admin/bill'
      }
    ]
  },

  // {
  //   title: 'プロンプト編集',
  //   path: '/edit-prompt',
  //   icon: 'material-symbols:edit-document-rounded'
  // },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'マイプロジェクト',
    icon: 'material-symbols:home-repair-service-rounded'
  },
  {
    path: '/acl/edit',
    action: 'read',
    subject: 'acl-page',
    title: 'プロジェクトの作成',
    icon: 'material-symbols:chair'
  },
  {
    path: '/acl/help',
    action: 'read',
    subject: 'acl-page',
    title: 'このサービスについて',
    icon: 'mdi:help-circle'
  }
]

export default navigation
