import React from 'react'
import { useLocation } from "react-router-dom";

function Rerender(props) {
    const search = useLocation().search;
    const draftedRfqId = new URLSearchParams(search).get('draftedRfqId');
    let redirectToText = '/createRFQ'
    if (draftedRfqId) {
        redirectToText += `?draftedRfqId=${draftedRfqId}`
    }
    props.history.push(redirectToText)
    return (
        <div></div>
    )
}

export default Rerender