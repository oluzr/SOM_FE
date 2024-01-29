import DOMPurify from 'dompurify'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import { BlogMember, PostDetail } from '../types/api'
import { useQuery } from '@tanstack/react-query'
import { getPost } from '../lib/useQuery/getPost'
import Avatar from '../components/common/avatar'
import { getBlogMember } from '../lib/useQuery/getBlog'
import { useRecoilState } from 'recoil'
import { UserInfoState } from '../store/user'
import PostEdit from '../components/postEdit'
import { HeadLinkState } from '../store/app'

const Post = () => {
  const [user, _] = useRecoilState(UserInfoState)
  const [_link, setLink] = useRecoilState(HeadLinkState)
  const params = useParams()
  const { data } = useQuery<PostDetail>({
    queryKey: ['posts', params.id, params.post],
    queryFn: getPost,
    enabled: params.post !== undefined,
  })
  const { data: member } = useQuery<BlogMember>({
    queryKey: ['blog', params.id],
    queryFn: getBlogMember,
    // enabled: memberId !== undefined,
  })
  useEffect(() => {
    setLink({
      path: `/blog/${params.id}`,
      content: member?.blogName || 'S ☻ M',
    })
  }, [member])
  useEffect(() => {}, [])
  if (!data) return null
  return (
    <div id='post'>
      <div id='post_nav'>
        <ul>ㅊ포ㅡ스턴</ul>
      </div>
      <div id='post_cont'>
        <div className='top_sec'>
          <p className='title text-4xl'>{data.title}</p>
          <p className='info'>
            <span>by {data.accountName}</span>
            <span className='date'>
              {dayjs(data.registeredAt).format('YYYY-MM-DD')}
            </span>
            {user.accountName === params.id && (
              <PostEdit accountName={user.accountName} postId={params.post!} />
            )}
          </p>
          <div className='tags'>
            <ul>
              {data.tags.map((tag) => (
                <li className='bg-secondary text-secondary-content'>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='mid_sec'>
          {/*         {data.thumbnail && (
          <div className='thumb'>
            <img
              src={data.thumbnail}
              onError={(e) => (e.currentTarget.src = ErrorImage)}
              alt='thumbnail'
            />
          </div>
        )} */}
          <div id='view' className='ql-snow'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.content),
              }}
              className='ql-editor'
            />
          </div>
        </div>
        <div className='btm_sec userInfoSec'>
          <Avatar src={member?.profileImage} accountName={params.id} />
          <div className='info'>
            <p className='username text-lg'>{member?.nickname}</p>
            <p className='content text-base'>{member?.introduction}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
