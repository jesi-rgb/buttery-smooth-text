import Flower from '@/components/canvas/Flower'
import dynamic from 'next/dynamic'

export default function Error() {
  return (
    <div className='mt-20 font-serif text-center text-red-200'>
      <h1 className='text-5xl font-bold'>error 404</h1>

      <p className='mt-10 text-2xl font-semibold'>Whoopsies, you seem lost. Why dont you click on the nucleus again?</p>
    </div>
  )
}

Error.canvas = (props) => <Flower />
