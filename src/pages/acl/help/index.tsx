// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

const helpPage = () => {
  // const ability = useContext(AbilityContext)

  return (
    <Grid container spacing={6} justifyContent={'center'}>
      <Grid item xs={12} md={8} lg={6} sx={{ textIndent: '40px' }}>
        <Typography sx={{ textAlign: 'center', py: 12 }} variant='h4'>
          このサービスについて
        </Typography>
        <Typography pb={3} sx={{ textIndent: '40px' }}>
          当サービス “Findshowcase”は、ここ最近のAI技術の目覚ましい進歩を活用して
          インテリア分野における”ホームステージング”,”リフォーム”の提案として 生まれたサービスです。
        </Typography>
        <Typography pb={3}>
          元来、時間のかかったコーディネートを”画像生成AI”により 画像をアップロードして、部屋のタイプやスタイルを選び、
          指定のプロンプト(呪文と言う名の指示)により、 わずかな時間でコーディネート画像の提案を体験出来るサービスです。
        </Typography>
        <Typography pb={3}>
          もちろん生成AIは、まだ開発途上のテクノロジーゆえ 表示される結果が思わしくなかったり、
          イメージに合わないこともあろうかと思います。
        </Typography>
        <Typography pb={3}>
          そんな時は、再度生成あるいは、”Restyle”の特徴の一つ “マスク機能”を使って、生成したい場所やオブジェクト(モノ)を
          塗りつぶして生成して、 新たなアイデアやインスピレーションを 感じてもらえたらと思います。
        </Typography>
        <Typography pb={3}>
          引き続き このAIをツールとして、楽しく、便利で、役立つ サービスをみなさまにお届け出来るよう更新してまいります。
        </Typography>
        <Typography pb={3}>ご期待ください。</Typography>
      </Grid>
    </Grid>
  )
}

helpPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default helpPage
