import React from 'react'
import ArticlesCard from '../../../components/ArticlesCard'
import { FaArrowRight } from "react-icons/fa"
import ArticlesCardSkeleton from '../../../components/ArticlesCardSkeleton'
import ErrorMessage from '../../../components/ErrorMessage'
import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from '../../../services/index/posts'
import toast from 'react-hot-toast'

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error)
    }
  })
  
  return (
    <section className="flex flex-col container mx-auto px-5 py-10">
    <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
      {isLoading ? (
        [...Array(3)].map((item, index) => (
          <ArticlesCardSkeleton
            key={index}
            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
          />
        ))
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the posts data" />
      ) : (
        data?.data.map((post) => (
          <ArticlesCard
            key={post._id}
            post={post}
            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
          />
        ))
      )}
    </div>
    <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
      <span>More articles</span>
      <FaArrowRight className="w-3 h-3" />
    </button>
  </section>
  )
}

export default Articles