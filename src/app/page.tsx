import React, { Suspense } from 'react'
import Users from '../components/Users'

export default function page() {
  return (
    <>
    <Suspense fallback={"Loading..."}>
      <Users/>
    </Suspense>
    </>
  )
}
