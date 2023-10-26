import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
    <Link to={'/about'}>About</Link>
    <Link to={'/about'}>Add</Link>
    <Link to={'/about'}>About</Link>
    <Link to={'/about'}>About</Link>
    <div>Home</div>
    </>
    )
}

export default Home