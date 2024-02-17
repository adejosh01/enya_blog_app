import React, {useState} from 'react'
import MainLayout from '../../components/MainLayout'
import BreadCrumbs from '../../components/BreadCrumbs'
import { images, stables } from '../../constants'
import { Link, useParams } from 'react-router-dom'
import SuggestedPost from './container/SuggestedPost'
import CommentsContainer from '../../components/comments/CommentsContainer'
import SocialsSharedButton from '../../components/SocialsSharedButton'
import { useQuery } from '@tanstack/react-query'
import { getSinglePost, getAllPosts } from '../../services/index/posts'
//import parseJsonToHtml from "../../utils/parseJsonToHtml";
import ArticleCardSkeleton from '../articleDetail/component/ArticleDetailSkeleton'
import ErrorMessage from '../../components/ErrorMessage'
import { useSelector } from "react-redux";
//import Editor from '../../components/editor/Editor'
import { generateHTML } from '@tiptap/react'
import Bold from "@tiptap/extension-bold"
import Document from "@tiptap/extension-document"
import Text from "@tiptap/extension-text"
import Paragraph from "@tiptap/extension-paragraph"
import Italic from "@tiptap/extension-italic"
import parse from 'html-react-parser'





const ArticleDetailPage = () => {
    const { slug } = useParams();
    const userState = useSelector((state) => state.user);
    const [breadCrumbsData, setbreadCrumbsData] = useState([]);
    const [body, setBody] = useState(null);

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePost({ slug }),
        queryKey: ["blog", slug],
        onSuccess: (data) => {
          setbreadCrumbsData([
            { name: "Home", link: "/" },
            { name: "Blog", link: "/blog" },
            { name: "Article title", link: `/blog/${data.slug}` },
          ]) 
          setBody(
            parse(
                generateHTML(data?.body, [Bold, Document, Italic, Paragraph, Text ]) 
            )   
          )         
        },
      });

      const { data: postsData } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
      });
      

    
  return (
    <MainLayout>
            
      {isLoading ? (
        <ArticleCardSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <img
              className="rounded-xl w-full"
              src={
                data?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                  : images.samplePostImage
              }
              alt={data?.title}
            />
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
              {data?.title}
            </h1>
            <div className='mt-4 text-dark-soft'>{body}</div>
            {/*<div className="w-full">
              {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
              )}
              </div>*/}
            <CommentsContainer
              comments={data?.comments}
              className="mt-10"
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>
          <div>
            <SuggestedPost 
              header="Latest Article"
              posts={postsData?.data}
              tags={data?.tags}
              className="mt-8 lg:mt-0 lg:max-w-xs"
            />
            <div className="mt-7">
              <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                Share on:
              </h2>
              <SocialsSharedButton
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(data?.title)}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>

  
  )
}

export default ArticleDetailPage