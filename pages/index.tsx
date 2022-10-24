import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

import { urlFor, sanityClient } from '../sanity';
import { Post } from '../typing';

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  console.log(posts);

  return (
    <div className='max-w-7xl m-auto'>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Hero */}
      <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl font-serif'><span className='underline decoration-black decoration-4'>Medium</span> is a place for write, read and connect.</h1>
          <h2>
            It is easy and free to post your thinking on any topic and connect with millions of readers.
          </h2>
        </div>
        <img className='hidden md:inline-flex h-32 lg:h-full' src="https://www.purechat.com/blog/wp-content/uploads/2015/08/medium.png" alt="MLogo" />
      </div>

      {/* Posts */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 md:p-6 gap-3 md:gap-6'>
        {posts.map((post) => {
          return <Link href={`post/${post.slug.current}`} key={post._id}>
            <div className='group cursor-pointer rounded-lg border border-gray-600 overflow-hidden'>
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in' src={urlFor(post.mainImage).url()} alt="post main image" />
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-base'>{post.description}</p>
                  <p className='text-xs'>by {post.author.name}</p>
                </div>
                <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image).url()!} alt="author image" />
              </div>
            </div>
          </Link>
        })}
      </div>

    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,

    }
  }
}
