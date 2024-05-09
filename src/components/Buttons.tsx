import { Button, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';

interface IProps{
  data: string
}
function Buttons({data}: IProps){
return (
  <Button color='red.6' me="md" >{data}</Button>
)  

}
export default Buttons;