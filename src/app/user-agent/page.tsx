import { headers } from 'next/headers';
import { UserAgent } from "@/views/userAgent";

const UserAgentRoot = () => {
  const userAgent = headers().get('user-agent') || 'User agent not available';
  
  return <UserAgent userAgent={userAgent} />;
};

export default UserAgentRoot;
