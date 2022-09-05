import { CheckCircle, Lock } from "phosphor-react"
import { isPast, format } from 'date-fns'
import { Link, useParams } from "react-router-dom"

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'recorded'
}

export function Lesson(props: LessonProps) {
  const {slug} =useParams<{ slug: string }>()

  const isLessonAvailable = isPast(props.availableAt)
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' of 'MMMM' • 'k'h'mm")

  const isActiveLesson = slug === props.slug

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson && 'bg-green-500'}`}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={`flex items-center gap-2 text-sm text-blue-500 font-medium ${isActiveLesson && 'text-white'}`}>
              <CheckCircle size={20}/>
              Content available
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20}/>
              Coming soon
            </span>
          )}
          <span className={`text-xs font-bold rounded px-2 py-[0.125rem] text-white border border-green-500 ${isActiveLesson && 'border-white'}`}>
            {props.type === 'live' ? 'LIVE' : 'RECORDED'} 
          </span>
        </header>
          
        <strong className={`text-gray-300 mt-5 block ${isActiveLesson && 'text-white'}`}>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}