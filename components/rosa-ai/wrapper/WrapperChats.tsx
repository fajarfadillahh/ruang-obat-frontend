import { Avatar } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

export default function WrapperChats() {
  const divRef = useRef<HTMLDivElement>(null);

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    setTimeout(() => {
      divRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }, []);

  if (!isClient) return null;

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden overflow-y-scroll bg-gray-50 px-8 scrollbar-hide lg:px-0 lg:scrollbar-default">
      <div className="mx-auto max-w-3xl">
        {/* ==== chat container ==== */}
        <div className="my-4 mb-40 grid min-h-max gap-6">
          {Array.from({ length: 16 }).map((_, index) =>
            index % 2 === 0 ? (
              // ==== bubble chat: user ====
              <article
                aria-label="bubble_chat_user"
                key={index}
                className="w-auto max-w-[400px] justify-self-end bg-gray-200/60 p-4 [border-radius:1.5rem_1.5rem_2px_1.5rem] hover:bg-gray-200/80 lg:max-w-[600px]"
              >
                <h5 className="sr-only">User Said:</h5>

                <div className="font-medium leading-[170%] text-black">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  totam fuga accusantium, voluptate consequuntur dolorum!
                </div>
              </article>
            ) : (
              // ==== bubble chat: rosa ====
              <article
                aria-label="bubble_chat_rosa"
                key={index}
                className="mb-10 flex items-start gap-4"
              >
                <h5 className="sr-only">Rosa Said:</h5>

                <Avatar
                  showFallback
                  name="ROSA"
                  src="=https://cdn.ruangobat.id/statics/images/avatar-img/avatar-male.svg"
                  className="mt-2 hidden md:flex"
                />

                <div className="flex-1 font-medium leading-[170%] text-black">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, eius labore voluptatum quos odio veniam vel, sit
                  quisquam nam, fuga nobis error nulla accusamus perspiciatis
                  quia rerum itaque? Sit similique dolor quibusdam a voluptates
                  tempore repudiandae iste, nam, rerum odit tempora commodi
                  voluptatem at soluta obcaecati deleniti impedit ratione
                  nostrum!
                </div>
              </article>
            ),
          )}

          <div ref={divRef}></div>
        </div>
      </div>
    </div>
  );
}
