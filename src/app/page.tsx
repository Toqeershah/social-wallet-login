
import { Inter } from "@next/font/google";

import SocialLogin from '../components/SocialLogin'
import RpcLogin from '../components/RpcLogin'

const inter = Inter({ subsets: ["latin"] });

const IndexPage = () => {
  return (
     <main className={inter.className}>
        <SocialLogin />
        <RpcLogin />
     </main>
  )
}

export default IndexPage