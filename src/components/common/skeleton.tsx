
interface Prop {
  width: string | number
  height: string | number
}
const Skeleton = ({ width, height }: Prop) => {
  return <div className='skeleton' style={{ width, height }}></div>
}

export default Skeleton