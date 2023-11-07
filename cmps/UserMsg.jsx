
import {eventBusService} from "../services/event-bus.service.js"

const {useState , useEffect} = React

export function UserMsg (){

    const [msg, setMsg] = useState(null)

    useEffect(()=>{
       const unsubscribe = eventBusService.on('user-msg', (msg)=>{
            // console.log('msg:', msg)
            setMsg(msg)
            setTimeout(setMsg, 1500 , null);
        })

        return ()=>{
            unsubscribe()
        }
    },[])


    if(!msg) return null
    return (
        <section className={"user-msg " + msg.type}>
            <h2>{msg.txt}</h2>
        </section>
    )
}