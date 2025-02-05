import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="flex items-center
             justify-center animate-bounce"
            >
              {/* logo here */}
              <img src="/syncup.svg" alt="logo" className="w-30 h-20" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to SyncUp</h2>
        <p className="text-base-content/60">
          Select a conversation to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
