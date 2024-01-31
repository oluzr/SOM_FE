import { useParams } from 'react-router-dom'
import TextEditor from '../components/textEditor'
import { useQuery } from '@tanstack/react-query'
import { PostDetail } from '../types/api'
import { getPost } from '../lib/useQuery/getPost'

const Edit = () => {
  const params = useParams()
  const { data } = useQuery<PostDetail>({
    queryKey: ['posts', params.id, params.post],
    queryFn: getPost,
    enabled: params.post !== undefined,
  })
  return (
    <>
      <TextEditor
        postItem={{
          content: data?.content,
          title: data?.title,
          introduction: data?.introduction,
          thumbnail: data?.thumbnail,
          tags: data?.tags,
        }}
      />
    </>
  )
}

export default Edit