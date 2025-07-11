import React from 'react'
import Hero from '../components/Home/Hero'
import ReacentlyAddedBooks from '../components/Home/ReacentlyAddedBooks'

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
      <Hero/>
      <ReacentlyAddedBooks/>
    </div>
  )
}

export default Home