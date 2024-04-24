'use server'
import useServerAuth from "@/hooks/server/useServerAuth"

async function page() {

  const { isAuthenticated, user } = await useServerAuth()

  if (!isAuthenticated) { return (<>Not Logged In</>) }

  



 

  return (
    <div>
      Playlists
    </div>
  )
}

export default page
