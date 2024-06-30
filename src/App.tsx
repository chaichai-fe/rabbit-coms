import { Sku, SkuGoods, Counter, ImgPreview } from './core'
// import axios from 'axios'

// const App = () => {
//   const [goods, setGoods] = useState<SkuGoods | null>(null)
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get(
//         'http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074'
//       )
//       setGoods(res.data.result)
//     }
//     fetchData()
//   }, [])
//   return (
//     <div>
//       {goods ? (
//         <Sku
//           goods={goods}
//           onSkuChange={(sku) => {
//             console.log(sku)
//           }}
//         />
//       ) : null}

//       RCounter
//     </div>
//   )
// }

const App = () => {
  return <ImgPreview />
}

export default App
