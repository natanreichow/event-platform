import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubsciber ($name: String!, $email: String!){
  createSubscriber(data: {name: $name, email: $email}) {
    id
  }
}
`

export function Subscribe() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault()

    await createSubscriber({
      variables: {
        name,
        email
      }
    })

    navigate('/event')
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Build a <strong className="text-blue-500">complete application</strong> from scretch with <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-400 leading-relaxed">
            In just one week you will master in practice one of the most used and in high demand technologies to access the best opportunities in the market.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Guarantee your place for free</strong>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input 
              className="bg-gray-900 h-14 rounded px-5"
              type="text" 
              placeholder="Your complete name" 
              onChange={event => setName(event.target.value)}
            />
            <input
              className="bg-gray-900 h-14 rounded px-5"
              type="email" 
              placeholder="Type your email address" 
              onChange={event => setEmail(event.target.value)}
            />

            <button 
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-color disabled:opacity-50"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/cold-mockup.png" className="mt-10" />
    </div>
  )
}