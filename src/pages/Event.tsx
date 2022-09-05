import { EyeSlash } from "phosphor-react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { Video } from "../components/Video";

export function Event() {
  const { slug } = useParams<{ slug: string}>()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug
        ? <Video lessonSlug={slug}/>
        : <div className="flex-1 flex flex-col justify-center items-center text-gray-400 gap-5">
            <EyeSlash size={64} />
            <span>
              No class selected. Please select one in the sidebar.
            </span>
          </div>
        }
        <SideBar />
      </main>
    </div>
  )
}