import './Events.css'
import { useSelector } from 'react-redux'

function Event({ eventProps }){
    return (
        <div>

        </div>
    )
}

export default function Events({ props }){
    const clubData = useSelector(state => state.clubData);
    return (
        <div className='event-bubble'>
            <pre>
            {JSON.stringify(clubData.posts, null, 2)}
            </pre>
        </div>
    )
}