"use client";
import { BackToHome } from "@/components/backToHome/backToHome";
interface UserAgentProps {
  userAgent: string;
}

export const UserAgent: React.FC<UserAgentProps> = ({ userAgent }) => {
  return (
    <div>
      <BackToHome />

      <div className="flex font-mono font-semibold text-sm">
        <div className="border p-2">UserAgent</div>
        <div className="border p-2">{userAgent}</div>
      </div>
    </div>
  );
};
