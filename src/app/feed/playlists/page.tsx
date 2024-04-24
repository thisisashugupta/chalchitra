'use server'
import useServerAuth from "@/hooks/server/useServerAuth"

async function Page() {

  const { isAuthenticated, user } = await useServerAuth()

  if (!isAuthenticated) { return (<>Not Logged In</>) }

  



 

  return (
    <div>
      Playlists
    </div>
  )
}

export default Page