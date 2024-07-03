import AWS from 'aws-sdk'
import { downloadProject } from 'src/pages/api/myProjectService'

// AWS.config.update({
//   accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESSKEYID,
//   secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRETACCESSKEY,
//   region: process.env.NEXT_PUBLIC_AWS_REGION
// })

const s3 = new AWS.S3()

const S3_BUCKET_NAME = 'findshowcase'

export const downloadImage = async (url: string, name: string) => {
  const res = downloadProject(url, name)

  res
    .then(async ({ data }: any) => {
      console.log(data)
      try {
        const params = {
          Bucket: S3_BUCKET_NAME,
          Key: data.name
        }
        const response: any = await s3.getObject(params).promise()
        const imageBlob = new Blob([response.Body], { type: response.ContentType })
        const url = URL.createObjectURL(imageBlob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'getrestyle_ai_org.png' // You can set the download filename
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Error downloading image:', error)
      }
    })
    .catch(error => {
      console.log(error)
    })
}
