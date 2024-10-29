import { UserAgent } from "@/views/userAgent";
import { headers } from 'next/headers';
const userAgent = headers().get('user-agent') || 'User agent not available';

const UserAgentRoot = () => {
  return <UserAgent userAgent={userAgent}/>;
};

export default UserAgentRoot;
